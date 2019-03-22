const express = require('express');
const bodyParser = require('body-parser');
const posts = require('./routes/posts.routes');
const connectToDb = require('./db/connect');

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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("deploy successfull");
});
