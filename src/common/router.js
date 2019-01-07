/*
  project router
 */
const router = {
    generateUrl: ({module, name, query = {}}) => {
        const queryList = [];
        for (let key in query) {
            queryList.push(`${key}=${encodeURIComponent(query[key])}`);
        }
        let prefix = '';
        switch (process.env.NODE_ENV) {
            case 'production':
                prefix = '/dist';
                break;
            case 'prev':
                prefix = '/dist';
                break;
            case 'test':
                prefix = '/dist';
                break;
            case 'dev':
                prefix = '/dev';
                break;
        }
        return `//${location.host}${prefix}/${module}/index.html#/${name || ''}?${queryList.join('&')}`;
    },
    push(options) {
        const url = this.generateUrl(options);
        if (options.isNewWindow) {
            window.open(url);
        } else {
            location.href = url;
        }
    },
    replace(options) {
        location.replace(this.generateUrl(options));
    }
};

export default router;
