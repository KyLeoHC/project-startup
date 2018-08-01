;(function (win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = null;
    var dpr = 1;
    var scale = 1;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;

    if (isIPhone) {
        if (devicePixelRatio >= 3) {
            dpr = 3;
        } else if (devicePixelRatio >= 2) {
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1;
    }

    // docEl.setAttribute('data-rdpr', rdpr);
    docEl.setAttribute('data-dpr', dpr);

    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no, viewport-fit=cover');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    win.addEventListener('resize', refreshRem);

    // if (doc.readyState === 'complete') {
    //     doc.body.style.fontSize = 12 * dpr + 'px';
    // } else {
    //     doc.addEventListener('DOMContentLoaded', function (e) {
    //         doc.body.style.fontSize = 12 * dpr + 'px';
    //     }, false);
    // }
    win.refreshRem = refreshRem;
    refreshRem();
})(window, window['lib'] || (window['lib'] = {}));
