---
title: UWP检测原理
date: 2023-07-31 21:30:03
tags: [开发, UWP, Win32]
categories: 开发
---
想要判断一个正在运行的程序是否是UWP程序并不难。

UWP程序有一个最基本的特征,也是UWP程序与Win32程序底层上的差别,UWP程序的类名是"Windows.UI.Core.CoreWindow",而Win32程序就不一样了,千奇百怪,依靠这个特征,我们就可以辨别出一个程序是UWP还是Win32,Spy++(Visual Studio自带的工具)可以查看进程信息,可以用Spy++查看进程的类名判断这个程序是UWP还是Win32。
  
![spyxx_img](Spyxx_screenhost.png)

但是Spy++工具并不是很好用,它的UI在现在看来有些落后了,而且当你想要判断一个程序是否是UWP程序,Spy++会列出所有进程,包括一些后台进程,所以我写了个WPF程序(在ChatGPT的帮助下,我承认它确实帮了我亿点点😂),这个程序以及源码我会在文章最后给出。

下面我来详细的讲讲这个程序的工作原理:

首先,需要获取全部活动程序的列表,我们需要检索所有的窗口,然后再判断窗口是否显示,只需要使用"user32.dll"中提供的"EnumWindows"和"IsWindowVisible"即可,具体的代码是:

```cs
private delegate bool EnumWindowsProc(IntPtr hwnd, IntPtr lParam);

[DllImport("user32.dll")]
private static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);

[DllImport("user32.dll")]
private static extern bool IsWindowVisible(IntPtr hwnd);
```

然后只需要调用即可<!--more-->

```cs
private List<IntPtr> GetOpenWindowHandles()
{
    List<IntPtr> windowHandles = new List<IntPtr>();
    EnumWindowsProc callback = (hwnd, lParam) =>
    {
        if (IsWindowVisible(hwnd))
        {
            windowHandles.Add(hwnd);
        }
        return true;
    };

    EnumWindows(callback, IntPtr.Zero);
    return windowHandles;
}
```

这个方法会返回一个句柄列表,并且已经筛选掉了没有窗口的进程,然后获取标题和类名以及图标的代码就很简单了

```cs
[DllImport("user32.dll")]
private static extern IntPtr SendMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);

[DllImport("user32.dll", CharSet = CharSet.Unicode)]
private static extern int GetWindowText(IntPtr hwnd, StringBuilder text, int count);

[DllImport("user32.dll", CharSet = CharSet.Unicode)]
private static extern int GetClassName(IntPtr hwnd, StringBuilder text, int count);

private string GetWindowTitle(IntPtr hwnd)
{
    const int nChars = 256;
    StringBuilder sb = new StringBuilder(nChars);
    if (GetWindowText(hwnd, sb, nChars) > 0)
    {
        return sb.ToString();
    }
    return string.Empty;
}

private string GetWindowClassName(IntPtr hwnd)
{
    const int nChars = 256;
    StringBuilder sb = new StringBuilder(nChars);
    if (GetClassName(hwnd, sb, nChars) > 0)
    {
        return sb.ToString();
    }
    return "未知类";
}

private BitmapSource GetWindowIcon(IntPtr hwnd)
{
    IntPtr hIcon = SendMessage(hwnd, 0x007F, IntPtr.Zero, IntPtr.Zero);
    if (hIcon != IntPtr.Zero)
    {
        // 获取32x32像素的图标
        IntPtr hIconSmall = SendMessage(hwnd, 0x007F, new IntPtr(1), IntPtr.Zero);
        return Imaging.CreateBitmapSourceFromHIcon(hIconSmall != IntPtr.Zero ? hIconSmall : hIcon,
            Int32Rect.Empty, BitmapSizeOptions.FromEmptyOptions());
    }

    return null;
}
```

核心的代码就是这些了。

到了这里,你可能会有一个疑惑,开头的那张图片中名为"设置"的进程在一个同样名为"设置"的进程下,并且这个"设置"的类名是"ApplicationFrameWindow",没错,这就是接下来要讲的重要内容了。

在最初写这个检测器时,我只是单纯的检测进程(Process.GetProcesses)类名是否为"Windows.UI.Core.CoreWindow",但是我很快发现了这个方法不好用,以设置为例,在启动阶段,设置的进程是一个名为SystemSettings.exe的进程,这时候这个进程很单纯,能够轻松的被检测到,是一个类名为"Windows.UI.Core.CoreWindow"的进程,但是,只不多时,这个进程在我的屏幕上消失,取而代之的是"ApplicationFrameHost"这个进程的标题居然变成了"设置",经过我的测试,"ApplicationFrameHost"的标题就是当前活动的UWP程序的标题,而原本的那个SystemSettings.exe则从进程检测的列表中消失了。

根据我的推测,UWP程序在启动阶段是程序所在目录的入口前程序创建的一个类名为"Windows.UI.Core.CoreWindow"的进程,在启动阶段结束后,程序将会被"ApplicationFrameHost"接管,于是就导致了前面"SystemSettings.exe"运行几秒后消失的情况。

这大概就是Windows内部处理UWP的机制(个人推测),不论真实情况是怎样的,这个特性确实对我的代码造成了极大的困扰,我无法得知真正的正在运行的UWP程序的列表,于是我开始尝试更改获取程序列表的方式,最终,我找到了最终解决方案————正如前文给出的代码,使用"user32.dll"中的"EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam)",我成功获取了包括正在运行的UWP程序的列表,这时,我又有了新的发现,使用这个API获取到前文提到的"ApplicationFrameHost接管的UWP"不再是一个名为ApplicationFrameHost的进程,而是标题为此UWP程序标题的类型为"ApplicationFrameWindow"的进程,那么检测方法就不再是检测"Windows.UI.Core.CoreWindow",前文的方法也是<font color="red">不完全正确</font>的,只适用于处在启动阶段的UWP程序,所以正确的检测方法应该是检测类名是"ApplicationFrameWindow"或"Windows.UI.Core.CoreWindow"二者其一即可

<p style="text-align: center;">
  ———— The End ————
</p>

<p style="text-align: center;">
  <a class="random-link" href="https://wwra.lanzouj.com/b032oceef" target="_blank"
    rel="noopener noreferrer">相关文件下载,密码skirky</a>
</p>

<p style="text-align: center;">
  版权所有 © skirky<br>
  转载需注明来源
</p>