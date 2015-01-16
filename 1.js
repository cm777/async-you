var http = require('http');
var fs = require('fs');
var async = require('async');

async.waterfall([readUrl, httpGet],
    function(err, result){
        if (err) return console.error(err);
        console.log(result);
    }
); 

function readUrl (cb){

    var url = '';
    var stream = fs.createReadStream(process.argv[2]);

    stream.on('error', function (err) {
      return cb(err);
    });

    stream.on('data', function (data) {
      url = data.toString();
    });

    stream.on('end', function () {
      // console.log(
      return cb(null,url);
    });
}

function httpGet (url, cb){

    var body = '';

    http.get(url, function(res){
        res.on('data', function(chunk){
          body += chunk.toString();
        });

        res.on('end', function(){
          cb(null, body);
        });

    })
    .on('error', function(err) {
          cb(err);
    });
}