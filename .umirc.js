var CompressionPlugin = require('compression-webpack-plugin');
var env = process.env.QA_ENV;

export default {
  chainWebpack: function (config, { webpack }) {
    if (env === 'build') {
      config.optimization
        .runtimeChunk(false) // share the same chunks across different modules
        .splitChunks({
          chunks: 'async',
          name: 'vendors',
          maxInitialRequests: Infinity,
          minSize: 0,
        });
      config.plugin('compression').use(
        new CompressionPlugin({
          test: /\.(js|css)(\?.*)?$/i,
          filename: '[path].gz[query]',
          algorithm: 'gzip',
        }),
      );
    }
  },
  treeShaking: true,
  publicPath: '/',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      title: 'history',
      dll: false,
      dva: {
        hmr: true,
      },
      targets: { ie: 11 },
      // 部署按需加载
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      chunks: ['vendors','umi'],
      hardSource: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/v1.0/api': {
      target: 'http://47.100.24.69:8080/v1.0/api/',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/v1.0/api': '' },
    }
  },
  hash:true,
}
