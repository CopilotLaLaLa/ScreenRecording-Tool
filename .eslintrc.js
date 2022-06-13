module.exports = {
    //继承 Eslint 规则
    extends: ["eslint:recommended"],
    env: {
        es6: true, //支持es6
        node: true, //启用node中全局变量
        browser: true, //启用浏览器中全局变量
    },
    parserOptions: {
        ecmaVersion: 6, // es6
        sourceType: "module", //es module
    },
    parser: "@babel/eslint-parser",
    rules: {
        "no-var": 2, //不能使用var定义变量
    }
}