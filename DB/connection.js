var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('connected', function () {
    console.log('Connected Mongo')
});
mongoose.connection.on('error', function () {
    console.log('Error Mongo')
});
mongoose.connection.on('disconnected', function () {
    console.log('DisConnected Mongo')
});