;(function (window, document) {
    var dpr = window.devicePixelRatio || 1;
    var docEl = document.documentElement;
    var bodyEl = docEl.getElementsByTagName('body')[0];
    var metaEl = document.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover');
    docEl.firstElementChild && docEl.firstElementChild.appendChild(metaEl);

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        width = (width / dpr) > 540 ? (540 * dpr) : width;
        docEl.style.fontSize = (width / 10) + 'px';
    }

    var timeoutId;
    timeoutId = setTimeout(refreshRem, 300);
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(refreshRem, 300);
        }
    });
    window.addEventListener('resize', refreshRem);
    window.refreshRem = refreshRem;
    refreshRem();

    if (dpr >= 2) {
        var testHairEl = document.createElement('div');
        testHairEl.style.border = '.5px solid transparent';
        bodyEl.appendChild(testHairEl);
        if (testHairEl.offsetHeight === 1) {
            bodyEl.classList.add('hairline');
        }
        bodyEl.removeChild(testHairEl);
    }
})(window, document);
