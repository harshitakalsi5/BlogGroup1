import express from 'express';
import bodyParser from 'body-parser';
import posts from './routes/posts.routes';
import connectToDb from './db/connect';

connectToDb();

let app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/api', posts);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3005, () => {
    console.log('server started - 3005');
});
