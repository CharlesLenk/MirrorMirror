# MirrorMirror

Install dependencies
```
sudo apt install unclutter
sudo apt install chromium-browser
```

Update PI autostart
```
mkdir -p ~/.config/lxsession/LXDE-pi
nano ~/.config/lxsession/LXDE-pi/autostart
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
@sh /home/[username]/MirrorMirror/startup.sh
```
 