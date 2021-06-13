<p align="center">
	<img src="./docs/screenshots/logo.png">
</p>

# Buggzi [ALPHA VERSION]

A cross platform bug tracking application for small teams and individual developers. Stay on track with Buggzi on any system.

---

<p align="center">
	<!--<img src="./docs/screenshots/">-->
</p>

---

## Getting Started

Clone:

```git
git clone https://github.com/KleoHasani/Buggzi.git
```

Create Files:

- Create ".env" file in project root with the following configuration.

```dotenv
BROWSER=none
INLINE_RUNTIME_CHUNK=false
IMAGE_INLINE_SIZE_LIMIT=0
```

Install dependencies:

```npm
npm install
```

Start:

```npm
npm start
```

### Required

- Electron v12.0.7

- Electron Builder v22.10.5

- Node v15.14.0

- NPM v7.7.6

### Build With

- Electron Builder v22.10.5

Build:

```npm
npm run build
```

Windows:

- dist/_installer_.exe

Debian:

- dist/_installer_.deb

- dist/_installer_.AppImage

### Testing

#### E2E

1.  Build

    ```npm
    npm run build
    ```

2.  Test

    ```npm
    npm run test:e2e
    ```

#### UI

```npm
npm run test:ui
```

#### Unit

```npm
npm run test:unit
```

## Version

v0.0.2

## Authors

Kleo Hasani

## Notes

Support for:

- [] Windows 10

- [] Debian 10

- [] AppImage
