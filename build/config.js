module.exports = {
    cleanFiles: ['./dist.zip', './dist'],
    outputDirectory: 'dist',
    publicPathMap: {
        dev: '/dev',
        test: '/dist/',
        prev: '/dist/',
        production: '/dist/'
    }
};
