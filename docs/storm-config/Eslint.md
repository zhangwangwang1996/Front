ESLint
======

WebStorm integrates with [ESLint](http://eslint.org/) which brings a wide range of linting rules that can also be extended with plugins. WebStorm shows warnings and errors reported by ESLint right in the editor, as you type. With ESLint, you can also use [JavaScript Standard Style](https://standardjs.com/).

Installing, enabling, and configuring ESLint in WebStorm
--------------------------------------------------------

1.  Open the built-in WebStorm Terminal (⌥F12) and type `npm install eslint --save-dev` or `npm install eslint -g`at the command prompt.
2.  Optionally, install additional plugins, for example, [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) to lint React applications.
3.  In the Settings/Preferences dialog (⌘,), choose JavaScript under Languages and Frameworks and then choose ESLint under Code Quality Tools. On the ESLint page page that opens, select the Enable checkbox. After that the controls on the page become available.
4.  In the Node Interpreter field, specify the path to Node.js. If you followed the standard installation procedure, WebStorm detects the path and fills in the field itself.
5.  In the ESLint Package field, specify the location of the `eslint` or `standard` package.
6.  Choose the configuration to use.
    *   With Automatic search, WebStorm looks for a `.eslintrc` file or tries to detect a configuration defined under `eslintConfig` in a `package.json`. WebStorm first looks for a `.eslintrc` or `package.json` in the folder with the file to be linted, then in its parent folder, and so on up to the project root. If the search fails, ESLint uses its default embedded configuration file.
    *   Choose Configuration File to use a custom file and specify the file location in the Path field.
7.  Optionally:
    *   In the Extra ESLint Options field, specify additional command line options to run ESLint with, use spaces as separators.
    *   In the Additional Rules Directory field, specify the location of the files with additional code verification rules. These rules will be applied after the rules from `.eslintrc` or the above specified custom configuration file and accordingly will override them.

Importing code style from ESLint
--------------------------------

You can import some of the [ESLint code style rules](http://eslint.org/docs/rules/) to the WebStorm [JavaScript code style settings](https://www.jetbrains.com/help/webstorm/settings-code-style-javascript.html). That enables WebStorm to use more accurate code style options for your project when auto-completing, generating, or refactoring the code or adding import statements. When you use the Reformat action, WebStorm will then no longer break properly formatted code from the ESLint perspective.

WebStorm understands ESLint configurations in all official formats: .eslintrc JSON files, package.json files with the `eslintConfig` field, as well as JavaScript and YAML configuration files.

*   When you open your project for the first time, WebStorm imports the code style from the project ESLint configuration automatically.
*   If your ESLint configuration is updated (manually or from your version control), open it in the editor and choose Apply ESLint Code Style Rules on the context menu:
    
    ![Importing ESLint code style rules from JavaScript or YAML configuration files](https://www.jetbrains.com/help/img/idea/2018.2/ws_import_code_style_from_eslint_complex_config.png "Importing ESLint code style rules from JavaScript or YAML configuration files")
    
    Alternatively, just answer Yes to the "Apply code style from ESLint?" question on top of the file:
    
    ![WebStorm suggests importing the code style from ESLint](https://www.jetbrains.com/help/img/idea/2018.2/ws_import_code_style_from_eslint_json.png "WebStorm suggests importing the code style from ESLint")
    
    The list of applied rules is shown in the Event log tool window:
    
    ![Event log tool window shows the list of applied ESLint rules](https://www.jetbrains.com/help/img/idea/2018.2/ws_import_code_style_from_eslint_event_log.png "Event log tool window shows the list of applied ESLint rules")
    

Using JavaScript Standard Style
-------------------------------

You can set [JavaScript Standard Style](https://standardjs.com/) as default JavaScript code style for your application so its main rules are applied when you type the code or reformat it. Since Standard is based on ESLint, you can also use Standard via the WebStorm ESLint integration.

To install JavaScript Standard
------------------------------

*   Open the built-in WebStorm Terminal (⌥F12) and type `npm install standard --save-dev` at the command prompt. Learn more from the [JavaScript Standard Style Official website](http://standardjs.com/#install).

To enable linting with Standard via ESLint
------------------------------------------

1.  In the Settings/Preferences dialog (⌘,), choose JavaScript under Languages and Frameworks and then choose ESLint under Code Quality Tools.
2.  On the ESLint page that opens, select the Enable checkbox, and specify the location of the `standard` package in the ESLint Package field.

*To set the JavaScript Standard Style as default
-----------------------------------------------

1.  In the Settings/Preferences dialog (⌘,), choose Editor | Code Style | JavaScript).
2.  On the [Code Style. JavaScript](https://www.jetbrains.com/help/webstorm/settings-code-style-javascript.html) page that opens, click Set from, and then choose Predefined Style | JavaScript Standard Style. The style will replace your current scheme.

Last modified: 20 July 2018
