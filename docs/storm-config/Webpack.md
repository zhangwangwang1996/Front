Webpack
=======

WebStorm integrates with the [webpack](https://webpack.js.org/) module bundler. This support improves coding assistance in JavaScript files by taking into account [webpack module resolution](https://webpack.js.org/concepts/module-resolution/) and [resolve aliases](https://webpack.js.org/configuration/resolve/). For webpack version 2 and higher, WebStorm provides code completion and quick documentation look-up for options in webpack configuration files.

*Configuring webpack in WebStorm
-------------------------------

1.  Make sure webpack is listed in the `dependencies` or `devDependencies` object of your package.json. If webpack is missing, install it:
    1.  Open the built-in WebStorm Terminal (⌥F12).
    2.  At the command prompt, type `npm install --save-dev webpack`.
2.  Create a configuration file in the project root or elsewhere (New | JavaScript file). Learn more from the [webpack Official website](https://webpack.js.org/guides/getting-started/#using-a-configuration).
3.  Specify the webpack configuration file to use. By default, WebStorm analyses the webpack configuration file in the root of the project. To use another webpack configuration file:
    1.  In the Settings/Preferences dialog (⌘,), click JavaScript under Languages and Frameworks, and then click Webpack.
    2.  On the Webpack page that opens, specify the location of the configuration file to use.

Editing a webpack configuration file
------------------------------------

For webpack version 2 and higher, WebStorm provides code completion and documentation look-up in the configuration object of `webpack.config.js`. Code completion is provided on the fly. To view documentation for a symbol, press F1.

![ws_webpack-conf.png](https://www.jetbrains.com/help/img/idea/2018.2/ws_webpack-conf.png "ws_webpack-conf.png")

Resolving modules
-----------------

When you open a project or edit your `webpack.config.js` specified on Settings/Preferences | Languages and Frameworks | JavaScript | Webpack, WebStorm analyses the configuration in the background and, based on the received information, properly understands the project [resolve roots](https://webpack.js.org/concepts/module-resolution) and [resolve aliases](https://webpack.js.org/configuration/resolve/). Thanks to this understanding of the project configuration, WebStorm provides more precise code completion for imports and exported symbols in JavaScript files. As a result, everything works fine without any steps from your side.

The image below illustrates module resolution in a project where `react-color` is an alias for the path `'./src/index.js'`. WebStorm properly resolves the import from `react-color`, provides navigation to it and completion for the exported symbols:

![ws_webpack-alias.png](https://www.jetbrains.com/help/img/idea/2018.2/ws_webpack-alias.png "ws_webpack-alias.png")

Debugging applications that use webpack
---------------------------------------

You can debug applications that use webpack same way as you debug any JavaScript client-side application, see [Debugging React apps created with Create React App](https://blog.jetbrains.com/webstorm/2017/01/debugging-react-apps/) and [Debugging Angular apps created with Angular CLI](https://blog.jetbrains.com/webstorm/2017/01/debugging-angular-apps/).

Last modified: 20 July 2018
