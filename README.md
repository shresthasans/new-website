# Setup

## Installation

- Choose and download the latest template release from [List of Releases](https://github.com/WeAreAthlon/frontend-webpack-boilerplate/releases).
- Extract the release archive to a new directory, rename it to your project name and browse the directory.
- Install all dependencies using pnpm clean install command.

```
$ pnpm install
```

> More on the clean install pnpm install command can be read here [pnpm install](https://pnpm.io/)

## Define Package Metadata

- Amend `package.json` file and optionally specify:
  - `name` - Name of your project. A name can be optionally prefixed by a scope, e.g. `@myorg/mypackage`.
  - `version` - Specify and maintain a version number indicator for your project code.
  - `author` - Your organisation or just yourself. You can also specify [contributors](https://docs.npmjs.com/files/package.json#people-fields-author-contributors).
  - `description` - Short description of your project.
  - `keywords` - Put keywords in it. It’s an array of strings.
  - `repository` - Specify the place where your code lives.
  - `license` - Announce your code license, figure out the license from [Choose an Open Source License](https://choosealicense.com/).
  - `browserslist` - Specify the supported browsers versions - you can refer to [full list](https://github.com/browserslist/browserslist#full-list) of available options

# Configuration

## Environment Configuration

- Edit the [`configuration/environment.js`](https://chatgpt.com/c/configuration/environment.js) if you want to specify:
  - `server`: configure development server, specify `host`, `port`. Refer to the full development server configuration options for [`webpack-dev-server`](https://webpack.js.org/configuration/dev-server/).
  - `limits`: configure file size thresholds for assets optimizations.
    - Image/Font files size in bytes. Below this value the image file will be served as Data URL (inline base64).
  - `paths`: `src` or `dist` directories names and file system location

## Additional webpack configuration

You can additionally configure webpack for specific environment:

- `development` - [`configuration/webpack.dev.config.js`](https://chatgpt.com/c/configuration/webpack.dev.config.js)
- `production` - [`configuration/webpack.prod.config.js`](https://chatgpt.com/c/configuration/webpack.prod.config.js) - Note that if you prefer to build and deploy [`sourcemap`](https://webpack.js.org/configuration/devtool/#production) files:
  > You should configure your server to disallow access to the Source Map files for normal users!

# Development

## Assets Source

- SASS/PostCSS files are located under `src/scss/`
- JavaScript files with support of latest ECMAScript ES6 / ECMAScript 2016(ES7)/ etc files are located under `src/js/`
- Image files are located under `src/images/`
- Font files are located under `src/fonts/`
- HTML files are located under `src/`
  - It will automatically build all HTML files placed under `src/` directory, no need to manually configure each template anymore!

## If you haven’t already installed Tailwind:

1. Install Tailwind via npm (if it’s not installed yet):
   ```
   pnpm add tailwindcss postcss autoprefixer
   ```
2. Generate the Tailwind config file:
   ```
   npx tailwindcss init
   ```
3. In your src/css/index.css, include the Tailwind directives:
   ```
   /* src/css/index.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4. Now, Tailwind should be integrated, and you can run the build process to generate the CSS with Tailwind classes applied.

## Build Assets

### One time build assets for development

```
$ pnpm run build
```

### Build assets and enable source files watcher

```
$ pnpm run watch
```

This command is suitable if you develop with external web server.

> Note: File watching does not work with NFS (Windows) and virtual machines under VirtualBox. Extend the configuration in such cases by:

```
module.exports = {
  //...
  watchOptions: {
    poll: 1000, // Check for changes every second
  },
};
```

### Start a development server - reloading automatically after each file change.

```
$ pnpm run dev

```

# Production

## Build Assets

Optimize assets for production by:

```
$ pnpm run production
```

## Get Built Assets

- **CSS** files are located under `/dist/css/`
- **JavaScript** files with support of _ES6 / ECMAScript 2016(ES7)_ files are located under `/dist/js/`
- **Images** are located under `/dist/images/`
  - Images part of the design _(usually referenced in the CSS)_ are located under `/dist/images/design/`
  - Images part of the content _(usually referenced via `<img>` tags)_ are located under `/dist/images/content/`
- **Fonts** are located under `/dist/fonts/`
- **HTML** files are located under `/dist/`
