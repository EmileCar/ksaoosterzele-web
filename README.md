# KSA Oosterzele Website

## Algemeen
Deze repository bevat de broncode van de website van KSA Oosterzele. De website bestaat uit
- ReactJS frontend
- PHP Laravel backend
- mySQL Database

## Installatie (lokaal)
### Frontend
De frontend bevind zich in de root van de repository. Om de frontend te lokaal te starten, moet je eerst alle dependencies installeren:
```
npm install
```
Daarna kan je de app starten met

```
npm start
```

### Backend & Database
Er is een docker-compose.yml file en een Dockerfile om de backend & lokale database op te starten. Deze zijn gemaakt om de backend lokaal te testen en zijn zodanig opgesteld om de environment van de live server op one.com te simuleren. De backend & database kan je opstarten met
```
docker-compose up
```
De backend draait dan op [localhost:80](http://localhost:8080)  
De database draait op [localhost:3306](http://localhost:3306)  
PhpmyAdmin draait op [localhost:80](http://localhost:80)

**Belangrijk!!**
Als je lokale backend wilt gebruiken, met je wel [environment.json](src/environment.json) aanpassen in de frontend. Dat is de baseUrl van de API. Deze moet dan naar localhost:80 wijzen.

## Deployment
Onze hostingservice/provider is [one.com](https://www.one.com/nl/). Alle code is daar te vinden in de file manager. <b>Zowel de frontend als de backend zitten samen in deze file manager als 1 service.</b> Is dat clean code? Waarschijnlijk niet, maar het werkt en dat zorgt ervoor dat we niet hoeven bijbetalen voor extra services.

Ook belangrijk is dat de structuur van de repository niet gelijk is aan de structuur van de file manager. In de file manager zit enkel gedeployde files, terwijl in deze repository de broncode zit.

### Hoe deployen?
Om frontend code te deployen, moet je eerst de code builden. Dit kan met
```
npm run build
```
Dit maakt een build folder aan in de root van de repository. De bestanden van die folder moet je dan uploaden naar de root van de file manager van one.com. Dit kan via de file manager zelf of via FTP.

Om backend code te deployen, moet je gewoon de bestanden uploaden naar de /api folder in de file manager van one.com. De structuur van /api hier in de repo is wel hetzelfde als die van in de file manager. Dit kan ook via de file manager zelf of via FTP.

Qua deployment voor de database is er niet veel te veranderen. We hebben maar 1 database en die draait altijd live op one.com.

## Structuur van code
### Frontend
De frontend is gemaakt in ReactJS. De code is opgedeeld in verschillende componenten. De root component is App.js. Hierin worden alle andere componenten ingeladen. De componenten zijn opgedeeld in verschillende folders:
- <b>assets</b>: bevat alle assets zoals afbeeldingen en fonts
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