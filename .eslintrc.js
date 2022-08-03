module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/eslint-recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "no-debugger": "off",
        "no-console": 0,
        "class-methods-use-this": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-implicit-any-catch": ["error", { "allowExplicitAny": false }]
    }
}