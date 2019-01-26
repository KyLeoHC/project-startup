module.exports = {
    root: true,
    env: {
        browser: true
    },
    parserOptions: {
        // vue-eslint-parser uses the parser which is set by parserOptions.parser to parse scripts
        parser: 'babel-eslint', // 部分语法，比如babel的动态import需要这个parser
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'standard', // 这里检查单独JS文件的语法
        'plugin:vue/strongly-recommended' // eslint-plugin-vue只检查vue组件的template和script部分语法
    ],
    globals: {
        // 'build': true
    },
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
        'vue/script-indent': ['error', 4, {
            'baseIndent': 1,
            'switchCase': 1,
            'ignores': []
        }],
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        'vue/html-closing-bracket-spacing': ['error', {
            'selfClosingTag': 'never'
        }],
        'vue/max-attributes-per-line': [4, {
            'multiline': {
                'allowFirstLine': true
            }
        }],
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'error',
            'multiline': 'never'
        }],
        'vue/no-unused-components': 0,
        'vue/html-self-closing': 0,
        // eslint(check for js) config
        'object-curly-spacing': ['error', 'never'],
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'never',
            'asyncArrow': 'ignore'
        }],
        'indent': ['error', 4, {
            'SwitchCase': 1
        }],
        'eqeqeq': 'off',
        'semi': ['error', 'always'],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    },
    'overrides': [
        {
            'files': ['*.vue'],
            'rules': {
                'indent': 'off'
            }
        }
    ]
};
