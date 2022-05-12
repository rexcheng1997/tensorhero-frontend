import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { taffy } from 'taffydb';

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, path.join(__dirname, '../../../public/uploads'));
    },
    filename: (_req, file, callback) => {
      callback(null, Date.now() + '-' + file.originalname);
    },
  }),
});
const chartDB = taffy(
  _.get(
    JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../../../public/dump/charts.json'),
      ).toString(),
    ),
    'charts',
    [],
  ),
);

const apiRouter = express.Router();

apiRouter.get('/chart', (req, res) => {
  const chartId = parseInt(req.query.chartId as string);
  console.log(`/chart?chartId=${chartId}`)

  const chart = chartDB({ id: chartId }).first();
  res.status(200).json(chart);
});

apiRouter.get('/chart/listing', (_req, res) => {
  console.log('/chart/listing');

  res.status(200).json({ charts: chartDB().get() });
});

apiRouter.put('/chart/publish', upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'audio', maxCount: 1 },
  { name: 'chart', maxCount: 1 },
]), (req, res) => {
  console.log('/chart/publish');
  console.log(req.body);

  const lastId = chartDB().last().id;
  const chartRecord = chartDB.insert({
    id: lastId + 1,
    title: req.body.title,
    artist: req.body.artist,
    charter: req.body.charter,
    genre: req.body.genre,
    album: req.body.album,
    year: req.body.year,
    createdAt: new Date().toJSON(),
    duration: parseInt(req.body.duration),
    likes: 0,
    plays: 0,
    downloads: 0,
    shares: 0,
    fullCombo: false,
  });

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (_.get(files, 'cover')) {
    const cover = files['cover'][0];
    console.log('cover image uploaded to: ' + cover.path);
    chartRecord.update({
      cover: path.join('uploads', cover.filename),
    });
  }

  const audio = files['audio'][0];
  const chart = files['chart'][0];
  console.log('audio uploaded to: ' + audio.path);
  console.log('chart uploaded to: ' + chart.path);

  chartRecord.update({
    audio: path.join('uploads', audio.filename),
    chart: {
      expert: path.join('uploads', chart.filename),
    },
  });

  res.status(201).json({ chartId: lastId + 1 });
});

export default apiRouter;
