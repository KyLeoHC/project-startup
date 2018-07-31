module.exports = {
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'standard',
        'plugin:vue/recommended'
    ],
    globals: {
        'build': true
    },
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
        // 'vue/script-indent': ["error", 4, {
        //     "baseIndent": 1,
        //     "switchCase": 1,
        //     "ignores": []
        // }],
        // eslint-plugin-vue(check for template) config
        'vue/html-indent': ["error", 4, {
            "attribute": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        // eslint(check for js) config
        'indent': ['error', 4, {
            'SwitchCase': 1
        }],
        'space-before-function-paren': ["error", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "ignore"
        }],
        'eqeqeq': 'off',
        'semi': ['error', 'always'],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'prefer-promise-reject-errors': 0
    }
};