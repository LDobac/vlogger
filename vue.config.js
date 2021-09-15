module.exports = {
    publicPath : "/vlogger",
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
            args[0].title = "Jaehee.dev";

            return args;
        })
    },
    css : {
        loaderOptions : {
            scss : {
                additionalData: `
                    @import "@/assets/scss/colors.scss";
                    @import "@/assets/scss/layout.scss";
                `
            }
        }
    }
};