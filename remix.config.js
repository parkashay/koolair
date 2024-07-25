/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
const devConfig = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
  sourcemap: true,
};

const prodConfig = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
};

module.exports =
  process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
