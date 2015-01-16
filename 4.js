var http = require('http');
var async = require('async');

    async.map([process.argv[2], process.argv[3]],

      function(item, done){

        var body = '';

        http.get(item, function(res){

            res.on('data', function(data){
                body += data.toString();
            });

            res.on('end', function(){
                done(null, body);
            });

        }).on('error', function(err){
          done(err);
        });
      },

    function(err, results){
      if (err) {console.log(err);}
      // results is an array of the response bodies in the same order
      console.log(results);
    });
