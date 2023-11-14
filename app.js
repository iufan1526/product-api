import express from 'express';
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`서버가 정상적으로 구동되었습니다. ${port}`);
});
