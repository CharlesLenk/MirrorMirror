git -C ~/magicmirror/ pull
mvn -f ~/magicmirror/pom.xml spring-boot:run &
until $(curl --output /dev/null --silent --head --fail http://localhost:8080); do
        printf '.'
        sleep 1
done
chromium-browser --noerrdialogs --kiosk http://localhost:8080/ --incognito
