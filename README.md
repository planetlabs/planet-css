# planet-css@das
Stylesheet reset and Planet style overrides: **DAS Edition**

## Planet Styles for DAS Explorer (Disconnected Explorer)
---
Due to restrictions on using CDNs and other connections to 3rd party resources, [Google Fonts](https://fonts.google.com) files requested by the normal `planet-css` package (using @import) are included as part of the build in this version.

We use [gulp-google-webfonts](https://github.com/battlesnake/gulp-google-webfonts) to download font files from Google and generate a font stylesheet with @font-face declarations.

### Usage
1. Google Fonts are specified in `fonts.list` using the same format as they appear in Google Fonts request strings.
    - Ex) `Source+Sans+Pro:300,400,600,700|Inconsolata:400,700`
2. Fonts are downloaded and generated via the Gulp task `fonts-google`
3. To add and use in your project, install the package with npm: `npm install --save planet-css@das`

