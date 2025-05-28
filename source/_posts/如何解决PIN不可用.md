---
title: 如何解决PIN不可用
date: 2025-05-28 11:03:58
tags: [Windows,系统BUG]
categories: 教程
---

今日闲来无事，偶然得知自己的笔记本支持Intel傲腾内存，欲打开之，不料Intel提出了条件
![intel](Intel.png)
回想起上次随意修改SATA模式导致蓝瓶钙，最终重装系统的惨痛经历，特意上网查询了一下，得知提前打开安全启动可无痛渡此劫，遂采取
![msconfig](msconfig.png)
重启进BIOS，切换SATA模式，一气呵成，不料Windows在此留了一手
![PIN不可用](error.png)
本来这个看起来也没啥意外的，安全模式少点东西没法加载PIN也合理，但是仔细一想，不对，这个在线账户的重设PIN，它点不动啊！！！
![没有网络连接](no_internet.png)
这就陷入了一个死循环，现在我无法登录，就无法关闭安全模式，无法关闭安全模式，就无法登录...
上网搜索了一下，发现很多人直接选择重装系统了，这...这不至于吧，Windows的密码机制不是很弱鸡嘛，直接删密码不就好了，进入疑惑解答里的cmd，准备删密码，却发现Windows11把弱鸡密码机制加强了，在线账户不让改密码！
![改密码报错](failed_to_change_passwd.png)
又是一番网上冲浪，总算找到了一个比较曲线救国的办法，简而言之就是把辅助功能的某个东西(如屏幕键盘osk.exe)替换为cmd，然后登录到Administrator，进而关闭安全模式
上手实操一下，第一步是进入疑惑解答的cmd，把osk.exe偷天换日为cmd.exe

替换之前先用diskpart查询盘符

```cmd
X:\Windows\System32>diskpart

Microsoft DiskPart 版本 10.0.26100.1150

DISKPART> list volume

  卷 ###      LTR  标签         FS     类型        大小     状态       信息
  ----------  ---  -----------  -----  ----------  -------  ---------  --------
  卷     0     F                FAT32  磁盘分区         500 MB  正常
  卷     1     D   数据盘          NTFS   磁盘分区         178 GB  正常         页面文件
  卷     2     E   数据盘          NTFS   磁盘分区         406 GB  正常
  卷     3     C                NTFS   磁盘分区         236 GB  正常         启动
  卷     4                      FAT32  磁盘分区         416 MB  正常         系统
  卷     5                      NTFS   磁盘分区        1073 MB  正常         已隐藏
  卷     6                      NTFS   磁盘分区         829 MB  正常         已隐藏
```

这里以C盘为例，可以根据上面给出的格式，大小信息判断哪个是你原来的C盘，输exit退出diskpart

然后cd过去，进行替换

```cmd
X:\Windows\System32>cd /d C:\Windows\System32

C:\Windows\System32>move osk.exe ..\..\

C:\Windows\System32>xcopy cmd.exe osk.exe
目标 osk.exe 是文件名
还是目录名
(F = 文件，D = 目录)? F
C:cmd.exe
复制了 1 个文件
```

此时屏幕键盘就已经被替换为了cmd，此时重启，在登陆界面点击辅助功能中的屏幕键盘即可在登陆界面打开cmd
![辅助功能](accessibility.png)
然后在这里启用Administrator用户

```cmd
C:\Windows\System32>net user Administrator /active:yes
命令成功完成。
```

这时我们可以看到登陆屏幕上的内容没有任何变化，我们无法自行选择Administrator用户进行登录，解决方法也很简单，在cmd里敲taskmgr打开任务管理器，把Windows Login User Interface进程结束掉，然后登陆界面会自动重启，这时我们就可以选择Administrator用户进行登录![选择用户](select_user.png)
登录Administrator之后游戏就结束了，Win+R打开msconfig，把"有选择的启动"改到"正常启动"，确定重启，然后即可登录到原来的在线账户咯~
当然，成功登录回去之后我们还要把刚才搞乱的东西改回去，右键开始菜单，打开"终端管理员"

```cmd
PS C:\Users\qofna> net user Administrator /active:no
命令成功完成。

PS C:\Users\qofna> del C:\Windows\System32\osk.exe
PS C:\Users\qofna> move C:\osk.exe C:\Windows\System32
```

此时敲osk可以看到屏幕键盘恢复正常，Administrator账户也变回了禁用状态，至此，问题解决~
![恢复](recovery.png)

