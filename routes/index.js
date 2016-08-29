var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = mongoose.model('Image');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: '/tmp/'});

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

var imgPath = './img.png';
router.post('/saveImage', upload.single('file'), function (req, res, next) {
    var file = __dirname + '/' + req.file.filename;
    fs.rename(req.file.path, file, function(err) {
        if (err) {
            console.log(err);
            res.send(500);
        } else {
            var a = new Image;
            a.img.data = fs.readFileSync(file);
            a.img.contentType = 'image/png';
            a.save(function (err, a) {
                if (err) throw err;
                console.error('saved img to mongo');
                res.send('http://localhost:3000/image/'+a._id);
            });
        }
    });
});

router.get('/image/:imgId', function (req,res,next) {
    Image.findOne({'_id': req.param('imgId')}, function (err, doc) {
        if (err) return next(err);
        res.contentType(doc.img.contentType);
        res.send(doc.img.data);
    });
});

module.exports = router;
