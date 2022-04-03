module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://mall-pre.springboot.cn",
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      },
      // mock数据，有后端接口可改
      "/mock": {
        target: "http://localhost:8080",
        // changeOrigin: true,
        pathRewrite: {
          "/mock": "/mock",
        },
      },
    },
  },
};
