Working with Vue.js in WebStorm
===============================

Posted on [January 2, 2018](https://blog.jetbrains.com/webstorm/2018/01/working-with-vue-js-in-webstorm/ "10:40 am") by [Ekaterina Prigara](https://blog.jetbrains.com/webstorm/author/ekaterina-prigara/ "View all posts by Ekaterina Prigara"). Updated on January 9, 2018

**[Vue.js](https://vuejs.org/)** is a popular framework for creating user interfaces. Its core functionality is focused on building UI components, which is quite similar to React and Angular. In 2017 Vue.js gained real momentum: according to the recent results of the [State of JavaScript](https://stateofjs.com/2017/front-end/results)survey it’s one of the most used frameworks at the moment, and many developers are interested in learning it. WebStorm introduced support for Vue.js at the beginning of 2017, and since then we’ve added lots of improvements. Let’s take a look at how WebStorm (or PhpStorm, IntelliJ IDEA, PyCharm, GoLand, or RubyMine with the [Vue.js plugin](https://plugins.jetbrains.com/plugin/9442-vue-js)) can help you to work with a Vue.js app written in JavaScript.

Create a new Vue.js project
---------------------------

One of the best ways to create a new Vue app is using the [Vue CLI](https://github.com/vuejs/vue-cli). It has a bunch of base project templates that can also be additionally configured to your needs – when generating the project; the CLI will ask you additional questions about the code style, linters, test runners, etc. In this post, we are going to use a project created using the [webpack template](https://github.com/vuejs-templates/webpack) with configured vue-router. Just install the dependencies and open the project in WebStorm and then we’re ready to go!

Run the app
-----------

To run our app, we need to run an npm start task that will start the dev server. To do that, simply double-click on the task name in the npm tool window on the left side of the IDE. When the app is compiled, open http://localhost:8080 in the browser to see the app. ![vue-npm-start](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2017/12/vue-npm-start.png) By default, all the apps generated with the Vue CLI use the webpack dev server with the hot module replacement mode enabled. It means that when you change something in the components and the changes are saved, the app in the browser is automatically updated. Please note that WebStorm auto-saves your changes when you switch the focus to another application or start a run configuration.

Working with the code
---------------------

Let’s create a new component in an _src/components_ folder where the components are stored. We can use a file template for the Vue components that WebStorm provides, there are template, script, and style tags: right-click on the folder, select _New… – Vue Component_ and then name it. ![create-new-vue-component](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2017/12/create-new-vue-component.gif) We want our new component to render a greeting when we click a button.

### Using code snippets

Instead of typing the `data` definition inside the component, we’ll use a code snippet (aka Live Template): start typing `vdata`, then select the template from the completion popup or hit Tab. It will expand it into the code with the variables. Hit _Tab_ to jump from one variable in the template to another and replace the placeholders with the names you need. ![using-vue-live-template](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2017/12/using-vue-live-template.gif) There more templates that you can use in your Vue component! You can find a full list of the available Vue templates in _Preferences | Editor | Live Templates – Vue_. Let’s keep developing our new component. WebStorm will provide us with all the useful code completion as we type: for tags, Vue directives, properties, and methods defined in the component. ![vue-directives](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2017/12/vue-directives.gif) Let’s now use our new component in the _HelloWorld_ component. Start typing its name in the template tag and you’ll see it in the completion suggestion. And once you’ve hit _Enter_ to auto-complete it, the required import will be immediately added to the HelloWorld component definition! ![component-import](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2017/12/component-import.gif) _Cmd-click_ on the usage of the Welcome component to navigate back to its definition. _Cmd-click_ will always navigate you back from the usage of the component, method or property to its definition. Completion is also available for the components from the vue-router and component libraries like Vuetify if they are installed in the project’s dependencies. ![router-link](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2017/12/router-link.png)

### Styling the component

We can style the component adding CSS into the style tag. WebStorm will provide code completion for CSS properties and their values, quick-fixes, and inspections. ![vue-style](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2017/12/vue-style.png) If we want to use Sass or some other language, we need to add the attribute `lang="sass"` to the tag. WebStorm will then provide code completion for this particular language.

### Configuring webpack

Our Vue app is using webpack, as many apps nowadays. Among other things, the webpack configuration of this project defines the aliases that are used in paths in imports. Like this one: ![webpack-alias](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2017/12/webpack-alias.png) To make WebStorm properly understand the paths that use an alias (and also generate imports that use these aliases), we need to point it to the webpack base configuration file (_build/webpack.base.conf.js_). You can do it in _Preferences | Languages & Frameworks | JavaScript | webpack_. WebStorm will analyze the results returned by webpack for this config and use this knowledge for coding assistance.

Debugging the app
-----------------

We can debug our application using WebStorm’s built-in debugger. All we have to do is create a new JavaScript debug configuration, specify the URL our app is running on (http://localhost:8080) in it, put the breakpoints right in the source code, and start the debug session. Once the code where the breakpoint is has been triggered, the execution will stop, and you’ll see the local and global variables, the call stack, and many other things in the IDE debug tools window. ![debugging-vue-app](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2018/01/debugging-vue-app.gif) You can then explore the app state, evaluate expressions, add watches, and step through the code to see what’s going on in the app and investigate the possible problem. You can find a sample app that we’ve created and configured on [GitHub](https://github.com/JetBrains/webstorm-samples/tree/master/Vue).
