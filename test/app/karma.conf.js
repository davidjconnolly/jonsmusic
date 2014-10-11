module.exports = function(config) {
  config.set({
    basePath: '../../',
    frameworks: ['mocha', 'chai'],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    autoWatch: true,

    // these are default values anyway
    singleRun: false,
    colors: true
  });
};
