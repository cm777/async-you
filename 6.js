var async = require('async');
var qs = require('querystring');
var http = require('http');


function httpGet (item, done){

      http.get(process.argv[2] + '/' + '?' + qs.stringify({number: item}), function(res){
          var body = '';

          res.on('data', function(chunk){
              body += chunk.toString();
          });

          res.on('end', function(){
              done(null, Number(body));
          });

      })
      .on('error', function(err) {
            done(err);
      });
}

async.reduce(['one', 'two', 'three'], 0, function(memo, item, callback){
    httpGet(item, function(err, nums){
        if (err) {callback(err);}
        callback(null, memo + nums);
    });
}, function(err, result){
      if(err) {console.log(err);}
          console.log(result);
});
