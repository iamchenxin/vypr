# vypr (origin 0.8.0)
  - remove google font
  - private install url

## install and uninstall
in tomato->TOOLS->System Commands,input

install:
```
eval `wget -q -O - http://sitename.com/s/rt/install.sh`
```
the store url for vy.tar.gz should be modified by hand before using.
```
wget -O vyprvpn.tar.gz http://modifythis.com/s/rt/vy.tar.gz;
```
to your own.

uninstall(clean nvram):
```
for v in `nvram show | grep vyprvpn | cut -f 1 -d=`; do nvram unset $v; done; nvram commit
```
