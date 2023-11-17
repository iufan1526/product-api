import express from 'express';
import db from './models/index.cjs';
import authRouter from './routers/auth.router.js';
import userRouter from './routers/user.router.js';
import productRouter from './routers/product.router.js';
import authMiddleware from './middlewares/auth.middle.js';
import User from './models/user.js';
import Product from './models/product.js';

const app = express();
const port = 8000;

db.sequelize
    .sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch(err => {
        console.error(err);
    });

User.associate(db);
Product.associate(db);

app.use(express.json());
app.use(express.urlencoded());

app.use('/api', authRouter);
app.use('/api', authMiddleware, userRouter);
app.use('/api', authMiddleware, productRouter);

app.listen(port, () => {
    console.log(`서버가 정상적으로 구동되었습니다. ${port}`);
});
