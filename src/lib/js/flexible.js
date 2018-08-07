;(function (window, document) {
    var dpr = window.devicePixelRatio || 1;
    var docEl = document.documentElement;
    var metaEl = document.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover');
    docEl.firstElementChild && docEl.firstElementChild.appendChild(metaEl);

    function setRem() {
        var width = docEl.getBoundingClientRect().width;
        width = (width / dpr) > 540 ? (540 * dpr) : width;
        docEl.style.fontSize = (width / 10) + 'px';
    }

    window.addEventListener('pageshow', function (e) {
        e.persisted && setRem();
    });
    window.addEventListener('resize', setRem);
    window.setRem = setRem;
    setRem();
})(window, document);
