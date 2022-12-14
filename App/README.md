[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)

# Desktop applications
PrimeNG and package your project with Angular and Electron and have RFiD Reader connection.

## Requirement
- Angular CLI >= 15.0.0
- NodeJS LTS >= 18.12.1
- node-hid >= 2.1.2


## Project structure
| Folder | Description                                      |
|--------|--------------------------------------------------|
| app    | Electron main process folder (NodeJS)            |
| src    | Electron renderer process folder (Web / Angular) |

## Setup
``` bash
npm install
```
*Install NodeJS dependencies with npm (used by Electron main process):*
``` bash
cd app
npm install
```

## Included Commands
| Command                  | Description                          |
|--------------------------|--------------------------------------|
| `npm run start`          | Run desktop applications (DEV mode)  |
| `npm run start:web`      | Run web application                  |
| `npm run build`          | Builds your desktop applications     |
| `npm run build:web`      | Builds your web application          |