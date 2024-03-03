# MirrorMirror

Update PI autostart
```
nano .config/wayfire.ini
```
```
[output:DSI-1]
mode = 800x480M@60
transform = 90

[autostart]
panel = wf-panel-pi
background = pcmanfm --desktop --profile LXDE-pi
xdg-autostart = lxsession-xdg-autostart
update-repo = git -C ~/MirrorMirror/ pull
kiosk = chromium-browser ~/MirrorMirror/index.html --incognito --noerrdialogs --kiosk --start-maximized
```
 