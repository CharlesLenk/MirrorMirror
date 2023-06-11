git -C ~/MirrorMirror/ pull
pkill -f "chromium-browser"
DISPLAY=:0 chromium-browser ~/MirrorMirror/index.html --incognito --noerrdialogs --kiosk &
