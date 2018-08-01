/**
 * px2rem
 * 只生成一倍方案
 * modify by KyLeo 2017.08.02
 */
'use strict';

let css = require('css');
let extend = require('extend');

let defaultConfig = {
    baseDpr: 2,             // base device pixel ratio (default: 2)
    remUnit: 75,            // rem unit value (default: 75)
    remPrecision: 6,        // rem value precision (default: 6)
    forcePxComment: 'px',   // force px comment (default: `px`)
    keepComment: 'no',      // no transform value comment (default: `no`)
    hairComment: 'hair'     // 0.5px add comment
};

let pxRegExp = /\b(\d+(\.\d+)?)px\b/;

function Px2rem(options) {
    this.config = {};
    extend(this.config, defaultConfig, options);
}

// generate rem version stylesheet
Px2rem.prototype.generateRem = function (cssText) {
    let self = this;
    let config = self.config;
    let astObj = css.parse(cssText);
    let MAX_OF_DPR = 1; // add by KyLeo 2017.08.02

    function processRules(rules, noDealPx) { // FIXME: keyframes do not support `force px` comment
        let hairSelectors = [];
        let imgUrlList = [];
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            let newRules = [];
            if (rule.type === 'media') {
                processRules(rule.rules); // recursive invocation while dealing with media queries
                continue;
            } else if (rule.type === 'keyframes') {
                processRules(rule.keyframes, true); // recursive invocation while dealing with keyframes
                continue;
            } else if (rule.type !== 'rule' && rule.type !== 'keyframe') {
                continue;
            }

            if (!noDealPx) {
                // generate 3 new rules which has [data-dpr]
                for (let dpr = 1; dpr <= MAX_OF_DPR; dpr++) {
                    let newRule = {};
                    newRule.type = rule.type;
                    newRule.selectors = rule.selectors.map(function (sel) {
                        // return '[data-dpr="' + dpr + '"] ' + sel;
                        return sel;
                    });
                    newRule.declarations = [];
                    newRules.push(newRule);
                }
            }

            let declarations = rule.declarations;
            for (let j = 0; j < declarations.length; j++) {
                let declaration = declarations[j];
                let nextDeclaration = rule.declarations[j + 1];
                // need transform: declaration && has 'px'
                if (declaration.type === 'declaration' && pxRegExp.test(declaration.value)) {
                    if (nextDeclaration && nextDeclaration.type === 'comment') { // next next declaration is comment
                        let trimComment = nextDeclaration.comment.trim();
                        if (trimComment === config.forcePxComment) { // force px
                            // do not transform `0px`
                            if (declaration.value === '0px') {
                                declaration.value = '0';
                                declarations.splice(j + 1, 1); // delete corresponding comment
                                continue;
                            }
                            if (!noDealPx) {
                                declaration.value = self._getCalcValue('px', declaration.value, 1);
                                declarations.splice(j + 1, 1); // delete corresponding comment
                                // generate 3 new declarations and put them in the new rules which has [data-dpr]
                                // for (let dpr = 1; dpr <= MAX_OF_DPR; dpr++) {
                                //     let newDeclaration = {};
                                //     extend(true, newDeclaration, declaration);
                                //     newDeclaration.value = self._getCalcValue('px', newDeclaration.value, dpr);
                                //     newRules[dpr - 1].declarations.push(newDeclaration);
                                // }
                                // declarations.splice(j, 2); // delete this rule and corresponding comment
                                // j--;
                            } else { // FIXME: keyframes do not support `force px` comment
                                declaration.value = self._getCalcValue('rem', declaration.value); // common transform
                                declarations.splice(j + 1, 1); // delete corresponding comment
                            }
                        } else if (trimComment === config.keepComment) { // no transform
                            declarations.splice(j + 1, 1); // delete corresponding comment
                        } else if (trimComment === config.hairComment) {
                            // 遇到hair注释的
                            // 添加0.5px的样式
                            hairSelectors = hairSelectors.concat(rule.selectors || []);
                            declarations.splice(j + 1, 1); // delete corresponding comment
                        } else {
                            declaration.value = self._getCalcValue('rem', declaration.value); // common transform
                        }
                    } else {
                        declaration.value = self._getCalcValue('rem', declaration.value); // common transform
                    }
                } else if (declaration.type === 'declaration' && declaration.value.indexOf('url') > -1) {
                    if (nextDeclaration && nextDeclaration.type === 'comment' && nextDeclaration.comment.trim() === 'img url') {
                        if (rule.selectors) {
                            imgUrlList.push({
                                selectors: rule.selectors,
                                value: declaration.value
                            });
                        }
                        declarations.splice(j + 1, 1); // delete corresponding comment
                    }
                }
            }

            // if the origin rule has no declarations, delete it
            if (!rules[i].declarations.length) {
                rules.splice(i, 1);
                i--;
            }

            if (!noDealPx) {
                // add the new rules which contain declarations that are forced to use px
                if (newRules[0].declarations.length) {
                    // rules.splice(i + 1, 0, newRules[0], newRules[1], newRules[2]);
                    rules.splice(i + 1, 0, newRules[0]); // modify by KyLeo
                    i += MAX_OF_DPR; // skip the added new rules
                }
            }
        }
        hairSelectors.length && rules.push({
            type: 'rule',
            selectors: hairSelectors.map(selector => '.hairline ' + selector),
            declarations: [{
                type: 'declaration',
                property: 'border-width',
                value: '0.5px!important'
            }]
        });
        if (imgUrlList.length) {
            const rule = {
                type: 'media',
                media: 'only screen and  (-webkit-min-device-pixel-ratio: 3)',
                rules: []
            };
            // 这里还需要修改下，因为缺少对多背景图的支持，比如:
            // background-image: url("1.jpg"), url("2.jpg"), url("3.jpg")
            imgUrlList.forEach(item => {
                const valueList = item.value.split(' ');
                const urlValue = valueList.filter(value => {
                    // 找出url值
                    return value.indexOf('url') > -1;
                })[0];
                const splitByQuery = urlValue.split('?'); // 把参数先去掉
                splitByQuery[0] = splitByQuery[0].replace(/(\.jpg)|(\.jpeg)|(\.png)|(\.webp)|(\.gif)/gi, match => {
                    return '@3x' + match;
                });
                rule.rules.push({
                    type: 'rule',
                    selectors: item.selectors,
                    declarations: [{
                        type: 'declaration',
                        property: 'background-image',
                        value: splitByQuery.join('?')
                    }]
                });
            });
            rules.push(rule);
        }
    }

    processRules(astObj.stylesheet.rules);

    return css.stringify(astObj);
};

// get calculated value of px or rem
Px2rem.prototype._getCalcValue = function (type, value, dpr) {
    let config = this.config;
    let pxGlobalRegExp = new RegExp(pxRegExp.source, 'g');

    function getValue(val) {
        val = parseFloat(val.toFixed(config.remPrecision)); // control decimal precision of the calculated value
        return val == 0 ? val : val + type;
    }

    return value.replace(pxGlobalRegExp, function ($0, $1) {
        return type === 'px' ? getValue($1 * dpr / config.baseDpr) : getValue($1 / config.remUnit);
    });
};

module.exports = Px2rem;
