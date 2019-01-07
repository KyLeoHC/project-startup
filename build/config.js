module.exports = {
    cleanFiles: ['./dist.zip', './dist', './dist-tpc', './dist-tpc.zip'],
    outputDirectory: 'dist',
    publicPathMap: {
        dev: '/dev',
        test: '/dist/',
        prev: '/dist/',
        production: '/project-startup/dist/'
    }
};
