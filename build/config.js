module.exports = {
  cleanFiles: ['./dist.zip', './dist'],
  cdnPrefix: 'http://10.4.50.122:8089',
  outputDirectory: 'dist',
  publicPathMap: {
    development: '/dev/',
    test: '/dist/',
    prev: '/dist/',
    production: '/project-startup/dist/'
  }
};
