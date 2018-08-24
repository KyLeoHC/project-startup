export default function registerTpc(name, component) {
    window.$tpc = window.$tpc || {};
    if (window.$tpc[name]) {
        console.warn(`[TPC register]: '${name}' has been used!`);
    } else {
        window.$tpc[name] = component;
    }
};
