const rewriteReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = rewriteReactHotLoader(config, env);

  config.resolve.alias = {
    ...config.resolve.alias,
    'react-dom': '@hot-loader/react-dom',
  };

  return config;
};
