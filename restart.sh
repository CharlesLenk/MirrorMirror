pkill -f "chromium-browser"
DISPLAY=:0 chromium-browser ~/mirror/index.html --incognito --noerrdialogs --kiosk &
