module.exports = {
	"parser": "@babel/eslint-parser",
	"parserOptions": {
		"ecmaVersion": 13,
		"requireConfigFile": false,
		"sourceType": "module",
		"babelOptions": {
			"presets": [
				["@babel/preset-react"]
			]
		},
		"ecmaFeatures": {
			"jsx": true,
			"modules": true
		}
	},
	"settings": {
		"react": {
			"version": "detect"
		}
	},
	"env": {
		"browser": true,
		"es2022": true,
		"node": true
	},
	"ignorePatterns": ["index.js"],
	"rules": {
		"no-dupe-keys": 1,
		"no-unused-vars": 1,
		"no-console": 1,
		"arrow-spacing": 1,
		"react/jsx-max-props-per-line": 1,
		"react/jsx-no-duplicate-props": 1,
		"react/void-dom-elements-no-children": 1,
		"react/display-name": 0,
		"react/prop-types": 1,
		"react/no-unknown-property": 1,
		"react/jsx-filename-extension": 0,
		"react/jsx-uses-react": 1,
		"react/jsx-uses-vars": 1,
		"react-hooks/rules-of-hooks": 2 // Checks rules of Hooks
	},
	"plugins": [
		"react-hooks"
	],
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	]
};