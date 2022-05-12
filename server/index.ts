import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware'

import apiRouter from './routers/apiRouter';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../public')));

app.use(
  '/ml-server',
  createProxyMiddleware({
    target: process.env.ML_SERVER || 'http://localhost:4000',
    pathRewrite: { '^/ml-server': '' },
    changeOrigin: true,
  }),
);

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Master server listening at port ${port}...`);
});
