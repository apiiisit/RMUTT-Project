[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/) ![RFiD Logo](https://cdn-icons-png.flaticon.com/64/5376/5376486.png)

# Desktop applications
PrimeNG and package your project with Angular and Electron and have RFiD Reader connection.

## Requirement
- Angular CLI >= 15.1.2
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

## API Service
*Proxying to a backend server ( use only dev )*
- Create file ``proxy.conf.json``
```
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```
## Commands
| Command               | Description                              |
|-----------------------|------------------------------------------|
| `npm run start`       | Start your website and application.      |
| `npm run start:web`   | Start your website.                      |
| `npm run start:app`   | Start your application.                  |
| `npm run build`       | Build your website and application.      |
| `npm run build:web`   | Build your website.                      |
| `npm run build:app`   | Build your application.                  |