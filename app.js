var express = require('express');
var app = express();

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: 'Authors',
    Text: 'Author'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

app.get('/books', function (req, res) {
    res.send('Hello books');
});

app.listen(port, function (err) {
    console.log('Running server on port' + port);
});
