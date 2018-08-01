'use strict';

let postcss = require('postcss');
let Px2rem = require('./px2rem');

module.exports = postcss.plugin('px2rem', function (options) {
    return function (css, result) {
        let oldCssText = css.toString();
        let px2remIns = new Px2rem(options);
        let newCssText = px2remIns.generateRem(oldCssText);
        let newCssObj = postcss.parse(newCssText);
        result.root = newCssObj;
    };
});
