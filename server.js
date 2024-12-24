import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// ルーティングの読み込み
import reservationRoutes from './src/routes/reservation.js';
import settingsRoutes from './src/routes/settings.js';

const app = express();
const port = process.env.PORT || 3000;

// 環境変数から許可するオリジンを取得
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];

// CORSミドルウェアの設定
app.use(cors({
  origin: function (origin, callback) {
    // 許可されたオリジンリストに存在するかチェック
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation: Origin not allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 許可するHTTPメソッド
  allowedHeaders: ['Content-Type', 'Authorization'], // 許可するHTTPヘッダ
}));

// ミドルウェア設定
app.use(cors());
app.use(bodyParser.json());

// ルーティング設定
app.use('/api/reservations', reservationRoutes);
app.use('/api/settings', settingsRoutes);

// CORSエラーハンドリング
app.use((err, req, res, next) => {
  if (err instanceof cors.CorsError) {
    res.status(403).json({ message: 'CORSエラー: アクセスが拒否されました。' });
  } else {
    next(err);
  }
});

// MongoDB接続
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  }); 