
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts/index',
  //     routes: [
  //       { path: '/', component: '../pages/index' }
  //     ]
  //   },
  // ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'history',
      dll: false,
      
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
      target: 'http://192.168.2.2:80/v1.0/api/',
      // target: 'http://39.106.65.69:80/v1.0/api/',
      // target: '192.168.100.110:80/v1.0/api/',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/v1.0/api': '' },
    }
  }
}
