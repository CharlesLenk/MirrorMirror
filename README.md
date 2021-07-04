# MirrorMirror

Install Unclutter
```
apt-get install unclutter
```

Update PI autostart
```
~/.config/lxsession/LXDE-pi/autostart
```
```
# Disable screensaver
#@xscreensaver -no-splash

# Disable power saving
@xset s noblank
@xset s off
@xset -dpms

# Hide mouse pointer
@unclutter -idle 0

# Run startup script on boot
@sh /home/pi/mirror/startup.sh > /home/pi/startup-log.txt

# Rotate the display to portrait
xrandr --output HDMI-1 --rotate left
```
