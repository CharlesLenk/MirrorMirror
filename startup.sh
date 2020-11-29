pkill -f "chromium-browser"
git -C ~/mirror/ pull
chromium-browser ~/mirror/index.html --incognito --noerrdialogs --kiosk
