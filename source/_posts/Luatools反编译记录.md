---
title: Luatools反编译记录
date: 2025-05-28 16:03:23
tags: [逆向工程,Python]
categories: 逆向工程
---

喜欢用合宙芯片的朋友对Luatools一定不陌生，烧录固件绕不开这个工具，但是我在入手合宙芯片后觉得这种烧录方式很麻烦，每次烧录都要在IDE和Luatools来回切换，于是就想通过逆向的手段看看能不能把Luatools的烧录集成到IDE中
按照逆向的流程，先丢进DIE看看

![DIE扫描结果](die.png)<!--more-->

看到C/C++本来已经打起了退堂鼓，但是看到zlib心生疑惑，这玩意还是第一次见，于是上网查了资料，在Windows下手动解压貌似有些困难，于是直接丢给manus，解压倒是解压出来了，但是解压结果还是有些奇怪的

![manus解压结果](manus_extracted.png)

可以看到解压出了许多lua文件，用lua写单片机我能理解，但是lua这玩意写桌面程序未免也太小众了把，然而打开一看，我发现了端倪

![其中一个lua文件内容](lua_content.png)

文件中有许多字符常量，粗看没啥问题，但是细看，"ui_main.py"？
这下可不得了，敢情这玩意是用Python写的啊，一下子柳暗花明，直接上网查询py反编译
接下来就很顺利了，首先使用`pyinstxtractor`把exe转换为pyc，再用`uncompyle6`转换为py(这里记录一个信息，Luatools v3使用python3.7，解包时要使用相同的python版本运行解包工具)
不过这些pyc大多不太重要，其中的`PYZ-00.pyz`才是重点，用uncompyle6解包，Luatools的大部分py源代码都在其中，到这里对Luatools的逆向基本完成，文末附manus解压结果及我反编译出的源代码
最后提一句题外话，我个人很想把Luatools做成VScode拓展，奈何鄙人前端经验粗浅，对VScode拓展开发一窍不通，希望能有哪位有大神利用鄙人反编译的源码尝试一下，如果成功了请务必告诉我，谢谢啦！

[manus解压结果](https://lz.qaiu.top/d/lz/iRdgu2xe6rha)
[笔者逆向Luatools源码](https://lz.qaiu.top/d/lz/itf4L2xe1fub)

