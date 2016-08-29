var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    img: { data: Buffer, contentType: String }
});
var Image = mongoose.model('Image', schema);