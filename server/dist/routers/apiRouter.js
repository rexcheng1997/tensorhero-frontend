"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const taffydb_1 = require("taffydb");
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (_req, _file, callback) => {
            callback(null, path_1.default.join(__dirname, '../../../public/uploads'));
        },
        filename: (_req, file, callback) => {
            callback(null, Date.now() + '-' + file.originalname);
        },
    }),
});
const chartDB = (0, taffydb_1.taffy)(lodash_1.default.get(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../../../public/dump/charts.json')).toString()), 'charts', []));
const apiRouter = express_1.default.Router();
apiRouter.get('/chart', (req, res) => {
    const chartId = parseInt(req.query.chartId);
    console.log(`/chart?chartId=${chartId}`);
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
    const files = req.files;
    if (lodash_1.default.get(files, 'cover')) {
        const cover = files['cover'][0];
        console.log('cover image uploaded to: ' + cover.path);
        chartRecord.update({
            cover: path_1.default.join('uploads', cover.filename),
        });
    }
    const audio = files['audio'][0];
    const chart = files['chart'][0];
    console.log('audio uploaded to: ' + audio.path);
    console.log('chart uploaded to: ' + chart.path);
    chartRecord.update({
        audio: path_1.default.join('uploads', audio.filename),
        chart: {
            expert: path_1.default.join('uploads', chart.filename),
        },
    });
    res.status(201).json({ chartId: lastId + 1 });
});
exports.default = apiRouter;
