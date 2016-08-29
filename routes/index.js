var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = mongoose.model('Image');
var fs = require('fs');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
var imgPath = './img.png';
router.get('/saveImage', function (req, res, next) {
    var a = new Image;
    a.img.data = fs.readFileSync(imgPath);
    a.img.contentType = 'image/png';
    a.save(function (err, a) {
        if (err) throw err;
        console.error('saved img to mongo');
        res.send(a);
    });
});
router.get('/image', function (req,res) {
    Image.findOne({'_id': '57c3fd75f3b731606e578ebd'}, function (err, doc) {
        if (err) return next(err);
        res.contentType(doc.img.contentType);
        res.send(doc.img.data);
    });
});

module.exports = router;
