import initServiceWorker from './initServiceWorker';

export default router => {
    initServiceWorker();
    return router;
};
