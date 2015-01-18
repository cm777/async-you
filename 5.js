var postUser = require('./5m');
var http = require('http');
var async = require('async');
var hst = process.argv[2];
var prt = process.argv[3];
var url = 'http://' + hst + ':' + prt;


async.series({

      post: function (done){
        async.times(5, function(n, next){
            postUser(hst, prt, ++n, function (err, user) {
                next(err, user);
            });
        }, function (err, users) {
            if (err) {done(err);}
            else {done(null, users);}
        });
      },

      get: function users (done){

          http.get(url + '/users', function(res){
              var body = '';

              res.on('data', function(chunk){
                body += chunk.toString();
              });

              res.on('end', function(){
                return done(null, body);
              });

          })
          .on('error', function(err) {
                done(err);
          });
      }

    },

    function (err, result){
      if (err) {
        return console.log(err);
      }
      console.log(result.get);
    }
);
