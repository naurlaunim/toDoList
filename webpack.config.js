var path = require("path");
var webpack = require("webpack");

module.exports = {

    devtool: 'cheap-module-source-map',

    entry: "./src/index.js",

    resolve: {
        extensions: [".js", ".jsx", ".scss"],
    },

    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.app.js",
        library: "public"
    },

    module: {
        rules: [
            /* 
            Здесь нужно добавить лоадеры, которые будут переводить в понятный
            для браузеров код, например, переводить из ES6/7/2018 и JSX в ES5 или из SCSS в CSS. 
            Их применение не исчерпывается только этим, это просто модули, которые
            получают на вход файлы и возвращают результат в зависимости от их назначения.
            Тебе пока нужно добавить лоадер Babel с пресетами для реакта, ES7->ES6 и ES6->ES5
            и лоадер SASS.
            */
        ]
    },

    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'public/'),
        watchOptions: {
            ignored: /node_modules|www/
        },
    }
};
