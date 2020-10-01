/**
 * WPGulp Configuration File
 *
 * 1. Edit the variables as per your project requirements.
 * 2. In paths you can add <<glob or array of globs>>.
 *
 * @package WPGulp
 */

const path = require("path");
const fs = require("fs");

const manifest = require("./package.json");

const wordpressThemePath = "/var/www/wordpress/wp-content/themes/alexvnilsson";

module.exports = {
	// Project options.
	projectURL: "localhost:8000", // Local project URL of your already running WordPress site. Could be something like wpgulp.local or localhost:3000 depending upon your local WordPress setup.
	productURL: "./", // Theme/Plugin URL. Leave it like it is, since our gulpfile.js lives in the root folder.
	browserAutoOpen: false,
	injectChanges: true,

	// Global
	rootDestination: wordpressThemePath,
	rootDestinationCleanGlobs: [path.join(wordpressThemePath, "**", "*")],

	// Template
	templateVariables: {
		template: {
			...manifest.wordpressTemplate,
			name: manifest.name,
			description: manifest.description,
			version: manifest.version,
			license: {
				name: manifest.license,
				...manifest.wordpressTemplate.license,
				content: fs.readFileSync(path.join(__dirname, "LICENSE")),
			},
			author: {
				name: manifest.author,
				...manifest.wordpressTemplate.author,
			},
		},
		templateVersion: manifest.version,
	},
	// Style options.
	styleSRC: "./src/assets/css/style.scss", // Path to main .scss file.
	stylesSRC: ["./src/assets/css/*.scss", "./src/assets/css/**/*.scss"],
	styleDestination: path.join(wordpressThemePath, "assets", "css"), // Path to place the compiled CSS file. Default set to root folder.
	outputStyle: "compact", // Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
	errLogToConsole: true,
	precision: 10,

	// JS Vendor options.
	jsVendorSRC: "./src/assets/js/vendor/*.js", // Path to JS vendor folder.
	jsVendorDestination: "./src/assets/js/", // Path to place the compiled JS vendors file.
	jsVendorFile: "vendor", // Compiled JS vendors file name. Default set to vendors i.e. vendors.js.

	// JS Custom options.
	jsCustomSRC: "./src/assets/js/custom/*.js", // Path to JS custom scripts folder.
	jsCustomDestination: "./src/assets/js/", // Path to place the compiled JS custom scripts file.
	jsCustomFile: "custom", // Compiled JS custom file name. Default set to custom i.e. custom.js.

	// PHP options
	phpSRC: ["./src/*.php", "./src/inc/**/*.php", "./src/**/*.php"],
	phpDestination: wordpressThemePath,

	// Images options.
	imgSRC: "./src/assets/img/raw/**/*", // Source folder of images which should be optimized and watched. You can also specify types e.g. raw/**.{png,jpg,gif} in the glob.
	imgDST: "./src/assets/img/", // Destination folder of optimized images. Must be different from the imagesSRC folder.

	// Watch files paths.
	watchStyles: "./src/assets/css/**/*.scss", // Path to all *.scss files inside css folder and inside them.
	watchJsVendor: "./src/assets/js/vendor/*.js", // Path to all vendor JS files.
	watchJsCustom: "./src/assets/js/custom/*.js", // Path to all custom JS files.
	watchPhp: "./src/**/*.php", // Path to all PHP files.

	// Translation options.
	textDomain: "edu.alexvnilsson.se", // Your textdomain here.
	translationFile: "WPGULP.pot", // Name of the translation file.
	translationDestination: "./languages", // Where to save the translation files.
	packageName: manifest.name, // Package name.
	bugReport: manifest.bugs.url, // Where can users report bugs.
	lastTranslator: "Ahmad Awais <your_email@email.com>", // Last translator Email ID.
	team: "AhmadAwais <your_email@email.com>", // Team's Email ID.

	// Browsers you care about for autoprefixing. Browserlist https://github.com/ai/browserslist
	// The following list is set as per WordPress requirements. Though, Feel free to change.
	BROWSERS_LIST: [
		"last 2 version",
		"> 1%",
		"ie >= 11",
		"last 1 Android versions",
		"last 1 ChromeAndroid versions",
		"last 2 Chrome versions",
		"last 2 Firefox versions",
		"last 2 Safari versions",
		"last 2 iOS versions",
		"last 2 Edge versions",
		"last 2 Opera versions",
	],
};
