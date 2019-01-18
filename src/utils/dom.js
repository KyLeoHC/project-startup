const computeOffsetTop = el => {
    let offsetTop = 0;
    let parentEl = el.offsetParent;
    while (parentEl) {
        offsetTop += parentEl.offsetTop;
        parentEl = parentEl.offsetParent;
    }
    offsetTop += el.offsetTop;
    return offsetTop;
};

export {
    computeOffsetTop
};
