var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = mongoose.model('Image');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: '/tmp/'});
var mv = require('mv');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/saveImage', upload.single('file'), function (req, res) {
    var file = __dirname + '/' + req.file.filename;
    mv(req.file.path, file, function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            var a = new Image;
            a.img.data = fs.readFileSync(file);
            a.img.contentType = 'image/png';
            a.save(function (err, a) {
                if (err) throw err;
                res.send('http://node-image-upload.herokuapp.com/image/' + a._id);
            });
        }
    });
});

router.post('/saveImage64', function (req, res) {
    var base64Data = req.body.baseData.replace(/^data:image\/png;base64,/, "");
    require("fs").writeFile("out.png", base64Data, 'base64', function (err) {
        if (err) throw err;
        var a = new Image;
        a.img.data = fs.readFileSync("out.png");
        a.img.contentType = 'image/png';
        a.save(function (err, a) {
            if (err) throw err;
            res.send('http://node-image-upload.herokuapp.com/image/' + a._id);
        });

    });
});

router.get('/image/:imgId', function (req, res, next) {
    Image.findOne({'_id': req.param('imgId')}, function (err, doc) {
        if (err) return next(err);
        res.contentType(doc.img.contentType);
        res.send(doc.img.data);
    });
});

module.exports = router;
