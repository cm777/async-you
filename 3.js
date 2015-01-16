var http = require('http');
var async = require('async');

async.each([process.argv[2], process.argv[3]],

    function(item, done){
        http.get(item, function(res){
            res.on('data', function(data){
            });

            res.on('end', function(){
                done(null);
            });

        }).on('error', function(err){
          done(err);
        });
      },

      function(err){
          if(err) {console.log(err);}
      }
);
