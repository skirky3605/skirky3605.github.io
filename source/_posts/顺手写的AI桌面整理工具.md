---
title: 顺手写的AI桌面整理工具
date: 2025-08-09 16:44:12
tags: [Windows,AI,Win32,开发]
---
看过很多人的电脑桌面后，深感反胃的我顺手写下了这个"DesktopOrganizer"程序，程序本身不算大，但是功能还是可以的，因为是顺手写的，UI也没有美化，就是WPF默认，凑合看吧。

使用方法：

1.首先你要有一个兼容OpenAI接口的某个大模型（国内推荐使用DeepSeek，真的便宜）的API Key，这里我以DeepSeek为例，首先进入[DeepSeek开放平台](https://platform.deepseek.com/)，注册或者登录账号，在左侧导航栏找到充值，充点钱（对于桌面整理来说，充1块钱基本就能用很久了），然后再来到API Keys，创建一个API Key，名字随便起，然后将创建的API Key复制备用

2.从[这里](https://lz.qaiu.top/d/lz/iQwzo333n0qj@8wt9)下载DesktopOrganizer，双击运行，将刚才得到的API Key输入

3.点击开始监听，软件就会将放到桌面上的文件自动归入桌面现有的某个文件夹，如果现有的文件夹都不适合，AI就会自动创建新的文件夹来存放这个文件

4.打开自启动，如果你想的话

5.点击关闭，软件会最小化到任务栏托盘
