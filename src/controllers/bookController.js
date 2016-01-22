var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {
    var middleware = function (req, res, next) {
        // If you enable authentification, log-in is required!!!
        /*Authentification:
        if (!req.user) {
            res.redirect('/');
        }
        next();*/
    };
    var getIndex = function (req, res) {
        //Add your database URL link here:
        //var url = e.g. 'mongodb://';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(
                function (err, results) {
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        Books: results
                    });

                }
            );

        });
    };

    var getById = function (req, res) {
        var id = new objectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.findOne({
                    _id: id
                },
                function (err, results) {
                    if (results.bookId) {
                        bookService.getBookById(results.bookId, function (err, book) {
                            results.book = book;
                            res.render('bookView', {
                                title: 'Books',
                                nav: nav,
                                Book: results
                            });
                        });
                    } else {
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            Book: results
                        });
                    }

                }
            );

        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;