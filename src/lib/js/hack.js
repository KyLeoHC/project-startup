/**
 * 一、1px兼容处理，判断当前系统能否渲染出0.5px
 * 二、异形屏的判断，适配iphoneX等手机的屏幕
 * by KyLeo on 2018/01/12.
 */
;(function (window) {
    var docEl = window.document;
    var bodyEl = docEl.getElementsByTagName('body')[0];

    if (window.devicePixelRatio && window.devicePixelRatio >= 2) {
        var testEl = docEl.createElement('div');
        testEl.style.border = '.5px solid transparent';
        bodyEl.appendChild(testEl);
        if (testEl.offsetHeight === 1) {
            bodyEl.classList.add('hairline');
        }
        bodyEl.removeChild(testEl);
    }

    docEl.addEventListener('DOMContentLoaded', function () {
        var testXEl = docEl.createElement('div');
        testXEl.style.cssText = 'padding-bottom:constant(safe-area-inset-bottom);padding-bottom:env(safe-area-inset-bottom);';
        bodyEl.appendChild(testXEl);
        // 直接判断属性有没有生效
        // if (testXEl.style.cssText) {
        //     bodyEl.classList.add('safe-area');
        // }
        // bodyEl.removeChild(testXEl);
        // 以下代码计算paddingBottom高度
        setTimeout(function () {
            var paddingBottom = window.getComputedStyle(testXEl, null).getPropertyValue('padding-bottom');
            if (paddingBottom && paddingBottom.replace('px', '') !== '0') {
                bodyEl.classList.add('safe-area');
            }
            bodyEl.removeChild(testXEl);
        }, 300);
    }, false);
})(window);
