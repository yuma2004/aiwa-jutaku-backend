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

// ミドルウェア設定
app.use(cors());
app.use(bodyParser.json());

// ルーティング設定
app.use('/api/reservations', reservationRoutes);
app.use('/api/settings', settingsRoutes);

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