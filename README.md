# KSA Oosterzele Website

## Algemeen
Deze repository bevat de broncode van de webapplicatie van KSA Oosterzele. De website bestaat uit
- ReactJS typescript frontend
- PHP Laravel backend
- mySQL mariadb Database

## Installatie (lokaal)
### Frontend
De frontend bevind zich in de root van de repository. Om de frontend te lokaal te starten, moet je eerst alle dependencies installeren:
```
npm install
```
Daarna kan je de app starten in ofwel
- DEV omgeving: `npm run dev`
- PROD omgeving: `npm run prod`

Het enige verschil tussen de twee is dat de dev omgeving de lokale API-link zal gebruiken, terwijl de prod omgeving de live API-link zal gebruiken.

### Backend & Database
Er is een docker-compose.yml file en een Dockerfile om de backend & lokale database op te starten. Deze zijn gemaakt om een lokale backend te hebben en zijn opgesteld net zoals de productie environment van one.com. De backend & database kan je opstarten en altijd updaten met
```
docker-compose up --build
```
De backend draait dan op [localhost:80](http://localhost:8080)  
De database draait op [localhost:3306](http://localhost:3306)  
PhpmyAdmin draait op [localhost:80](http://localhost:80)

Als je nu code aanpast in de backend, wordt dit automatisch geupdate in de docker container dus moet je niet telkens de container opnieuw opstarten. Phpmyadmin is handig om de database te bekijken en data aan te passen.

## Deployment
Onze hostingservice/provider is [one.com](https://www.one.com/nl/). Alle code is daar te vinden in de file manager. <b>Zowel de frontend als de backend zitten samen in deze file manager als 1 service.</b> Is dat clean code? Waarschijnlijk niet, maar het werkt en dat zorgt ervoor dat we niet hoeven bijbetalen voor extra services.

Ook belangrijk is dat de structuur van deze repository niet gelijk is aan de structuur van de file manager. In de file manager zit enkel gedeployde files, terwijl hier in deze repository de broncode zit.

### Hoe deployen?
Om frontend code te deployen, moet je eerst de code builden. Dit kan met
```
npm run build
```
Dit maakt een build folder aan in de root van de repository. De bestanden van die folder moet je dan uploaden naar de root van de file manager van one.com. Dit kan via de file manager zelf of via FTP.

Om backend code te deployen, moet je gewoon de bestanden uploaden naar de /api folder in de file manager van one.com. De structuur van /api hier in de repo is wel hetzelfde als die van in de file manager. Dit kan ook via de file manager zelf of via FTP.

Qua deployment voor de database is er niet veel te veranderen. We hebben maar 1 database en die draait altijd live op one.com. Als veel lokaal aangepast is, kun je eventueel een export maken van de database via phpmyadmin en die importeren op one.com. Maar dit kan data verwijderen dus als de aanpassingen klein zijn, doe ze gewoon ook opnieuw manueel op one.com.

## Structuur van code
### Frontend
De frontend is gemaakt in ReactJS met typescript. De code is opgedeeld in verschillende componenten. De root component is App.js. Hierin worden alle andere componenten ingeladen. De componenten zijn opgedeeld in verschillende folders:
- <b>assets</b>: bevat alle assets zoals standaard afbeeldingen en fonts
- <b>components</b>: bevat alle componenten die gebruikt worden
- <b>contexts</b>: bevat alle contexts die gebruikt worden
- <b>layouts</b>: bevat alle layouts die gebruikt worden
- <b>models</b>: bevat alle modellen die gebruikt worden
- <b>pages</b>: bevat alle pagina's die gebruikt worden
- <b>services</b>: bevat alle services die gebruikt worden
- <b>utils</b>: bevat verschillende functies die gebruikt worden over de hele app

### Backend
De backend is gemaakt in PHP Laravel. De root van de API is /api. De code is opgedeeld in verschillende folders:
- <b>controller</b>: bevat alle controllers die gebruikt worden
- <b>database</b>: bevat alle database gerelateerde code
- <b>model</b>: bevat alle database-modellen die gebruikt worden
- <b>routes</b>: bevat alle routes die gebruikt worden
- <b>index.php</b>: de startup van de API