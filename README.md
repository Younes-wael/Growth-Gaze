# HCI Semesterprojekt Growthgaze KPI-Dashboard

## Einführung

Growthgaze ist ein interaktives Finanz-/KPI-Dashboard, welches visuelle Startup Informationen für seine Nutzenden bereitstellt und so einen zentralen Datenbestand der wichtigsten Investment Informationen bietet. Das Dashboard ist für jede Person mit einem interesse an Investment und/oder experten gedacht. 


## Team

@Chai   1119827
@Nikan  1125742
@Wael   1128163
@Luan   1117954

## Architektur

Die wichtigsten Ordner und Dateien sind:

- **src/**: Enthält den gesamten Quellcode der Anwendung.
  - **components/**: Alle React-Komponenten, die in der App verwendet werden.
    - **Charts/**: Alle Chart-Komponenten, die im Dashbaord verwendet werden.
    - **Navigation/**: Enthält die Sidebar und Topbar Komponenten.
  - **assets/**: Bilder, Icons und andere statische Dateien.
    - **data/**: Enthält alle Testdaten zu den erstellten Unternehmen.
        - **index.json**: Enthält ein Mapping zu den Dateinamen, für eine Benutzerfreundlichere Suche bzw. Suchvorschläge
  - **Landingpage/**: Führt alle React-Komponenten der Landingpage zusammen.
  - **Dashboard/**: Führt alle React-Komponenten des Dashboards zusammen und implementiert die Logik zum öffnen und schließen von Charts und für das Intro handeling.
  - **App.jsx**: Die Haupt-React-Komponente, die als Einstiegspunkt für die App dient.
  - **index.js**: Der Einstiegspunkt für die App, wo React in das DOM gerendert wird.
- **public/**: Enthält statische Dateien, die nicht von Vite verarbeitet werden, aber direkt über den Browser zugänglich sind.
  - **Logo/**: Enthält alle Unternehmens Logos.
  - **Team/**: Enthält die Teamfotos von der Landingpage
- **vite.config.js**: Konfigurationsdatei für Vite.
- **package.json**: Die Projektabhängigkeiten und Skripte.

## Genutzte Pakete & Bibliotheken

- **React**: Für das Erstellen der Benutzeroberfläche.
- **Vite**: Als Build-Tool und Entwicklungsserver.
- **React Router**: Für das Routing innerhalb der Anwendung.
- **Tailwind CSS**: Für das Styling der Anwendung.
- **PostCss**: Für Live Rendering des Tailwind CSS, während der Entwicklung.
- **Prettier** und **ESLint**: Für das Formatieren und Linting des Codes.
- **IntroJs**: Für das erstellen eines Tutorials beim ersten besuchen der Seite. 
- **ReCharts**: Zum erstellen der Charts.
- **React-Preloader**: Zum erstellen einer Preloader Animation beim laden des Dashboards
- **React-Typed**: Für eine Type Animation in der Hero Section der Landingpage. 
- **React-DND**: Zum erstellen von Drag and Drop Komponenten. 
- **React-DND-htmle5-backend**: Für die Logik implementierung der Drag&Drop Funktionalität
- **Fontawesome**: Für Font-Sytling.


## So führst du die App aus

1. **Klonen des Repositories**

   Zuerst musst du das Repository auf deinem lokalen Rechner klonen:

   ```bash
   git clone https://code.fbi.h-da.de/stlusousa/growthgaze.git
 2. **Node Pakete installieren**
	 ```bash 
	cd growthgaze-dashboard
	npm i
2. **Dashboard starten**
	```bash
	npm run dev
3. **Production Build erzeugen (optional)**
	```bash
	npm run build

## Release Notes
### Version 1.0.0 02.01.2025
- Landingpage wurde implementiert und Designed. @Luan 
- Chart Komponenten wurde implementiert. @Chai
- Side- und Topbar wurden implementiert. @Nikan @Wael
- Unterseiten wurden erstellt. @Wael

### Version 1.0.1 05.01.2025
- Erstellung einer JSON Testdatei. @Wael
- Routing in Main App hinzugefüt. @Luan

### Version 1.0.2 
- Fragen zur FAQ Section in der Landingpage hingefügt. @Wael
- FAQ aufklapp Animation implementiert. @Luan
- Team Section wurde überarbeitet mit Fotos und verlinkungen. @Wael

### Version 1.1.0 14.01.2025
- Dashboard Seite wurde gemergt. Sidebar und Dashboard wurden verknüpft, in eine Dashboard Componente. @Chai @Nikan
- Sidebar und Charts wurden verknüpft. @Nikan
- JSON Datensätze wurden basierend auf den Anforderungen der Charts erstellt. @Wael
- Preloader wurden hinzugefügt beim Laden des Dashboards. @Luan

### Version 1.1.1 14.01.2025
- Bug fixes in der Suchleiste der Sidebar wurden gefixt. Suchvorschläge wurde nicht korrekt angezeigt. @Nikan
- JSON Dateien wurden statisch importiert und dann eingelesen. @Nikan
- Bug fixes in den Charts. Die Charts haben bei manchen Werten NaN angezeigt. Die JSON Dateien mussten bearbeitet werden. @Chai

### Version 1.2.0 15.01.2025
- Drag&Drop funktion wurde implementiert. Hierzu wurde eine neue Componente (DraggableChart) implementiert. @Luan
- Plus button zum hinzufügen von Charts wurden implementiert. @Chai @Luan
- Menü zum hinzufügen von Charts wurde implementiert. @Luan
- Es wurde eine Dynamische Suche in der Suchleiste implementiert, sodass Daten erst während der Laufzeit importiert werden. Um Statische imports in der Sidebar zu verhindern. @Nikan @Luan
- Index Mapping der JSON Daten. Es wurde eine Index Json erstellt die den Unternehmensnamen zu der jeweiligen JSON Datei mappt, um eine einheitliche Dateibenennung zu ermöglichen ohne die Suchvorschlag so wie die Dateinamen zu präsentieren. @Luan
- Intro für den ersten Seiten besuch wurde hinzugefügt. @Luan
- CompanyViewMore Page wurde hinzugefügt und mit der Sidebar verlinkt. @Wael
- Sidebar Description Section wurde hingefügt mit einem Drop Down. @Nikan

### Versin 1.2.1 
- Bug fixes bei der CompanyViewMore Page. Die Unternehmens Daten wurden im Routing nicht korrekt übergeben, was dazu führte das die Seite nichts angezeigt hat. @Nikan
- Bug fixes in der Topbar. Die Topbar wurde nicht automatisch beim Seiten wechsel angepasst. @Wael
- TopBar Buttons und Logo wurden mit dem Router verlinkt. @Wael
- Landingpage Texte wurden angepasst. @Wael

### Version 2.0.0 07.02.2025
Hier wurde das Feedback von Prof. Dr. Nazemi soweit wie möglich implementiert.
- Die Charts wurden verkleinert. @Luan @Chai
- Die Statischen Charts wurden angepasst und die Whitespaces entfernt. @Luan
- Die Sidebar hat ein Feature erhalten mit einer Auflistung der meist gesuchten Unternehmen. @Luan
- Bug fixes im Intro. Cookies wurden nicht richtig geprüft, weshalb das Intro bei jedem Seiten besuch ausgeführt wurde. @Luan
- Bug fixes im Intro. Der Queryselector konnte HTML elemente nicht finden, weshalb das Intro am anfang direkt abgebrochen wurde. @Luan

### Version 2.0.1 08.02.2025
- Code Clean up. @Chai @Nikan @Luan @Wael
- Kommentare wurden hinzugefügt. @Chai @Nikan @Luan @Wael
- Dokumentation wurde geschrieben. @Chai
- Readme wurde angepasst.
