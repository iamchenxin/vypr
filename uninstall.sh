for v in `nvram show | grep vyprvpn | cut -f 1 -d=`; do nvram unset $v; done; nvram commit
