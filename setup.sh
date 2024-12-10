pkg install wget proot
wget -O rootfs.tar.gz https://cdimage.ubuntu.com/ubuntu-base/releases/oracular/release/ubuntu-base-24.10-base-arm64.tar.gz
mkdir rootfs
tar xzvf rootfs.tar.gz -C rootfs
echo "nameserver 114.114.114.114" >> rootfs/etc/resolve.conf
echo "sed -i 's/cn.archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list" >> rootfs/setup.sh
echo "apt install wget -y" >> rootfs/setup.sh
echo "wget -O openvpn.sh https://get.vpnsetup.net/ovpn" >> rootfs/setup.sh
echo "sudo bash openvpn.sh --auto"  >> rootfs/setup.sh
unset LD_PRELOAD
proot -r ./rootfs -0 -w / -b /dev -b /proc -b /sys "/bin/sh /setup.sh"