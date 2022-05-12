"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const apiRouter_1 = __importDefault(require("./routers/apiRouter"));
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
app.use('/ml-server', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: process.env.ML_SERVER || 'http://localhost:4000',
    pathRewrite: { '^/ml-server': '' },
    changeOrigin: true,
}));
app.use('/api', apiRouter_1.default);
app.listen(port, () => {
    console.log(`Master server listening at port ${port}...`);
});
