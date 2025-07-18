## Axion

> [!NOTE]
> The web build is **only for visual UI preview** (like component rendering). **All logic, plugins, and core features only run on Android builds.**

### Run

```bash
# first time
npm install

# starts web preview
npm run dev

# build + run on Android
npm run run:android

# dev build + run on Android
npm run run:dev:android
```

Or with script:

```bash
./run.sh
./run.sh --android
./run.sh --dev --android
```

### Build

```bash
# first time
npm install

# web build only (UI preview)
npm run build

# full android build
npm run build:android

# dev build (web only)
npm run build:dev

# dev build (Android)
npm run build:dev:android
```

Or using the shell script:

```bash
./build.sh
./build.sh --android
./build.sh --dev
./build.sh --dev --android
```

### Flags

* `--android` or `-a` -> include Android
* `--dev` or `-d` -> dev mode (faster build)
* `--help` or `-h` -> show CLI help
