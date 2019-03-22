import express from 'express';
import bodyParser from 'body-parser';
import posts from './routes/posts.routes';
import connectToDb from './db/connect';

connectToDb();

let app = express();

app.use('/assets', express.static('assets'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/api', posts);

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

// app.listen(3005, () => {
//     console.log('server started - 3005');
// });

app.listen(process.env.PORT, process.env.IP);