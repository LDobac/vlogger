module.exports = {
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