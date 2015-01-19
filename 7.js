var async = require('async');
var http = require('http');


var name = '';
var count = 0;

async.whilst(
	function () {
		return (name.trim() !== 'meerkat');
	},

	function (done) {
        count++;
        http.get(process.argv[2], function(res){
          var body = '';

          res.on('data', function(chunk){
              body += chunk.toString();
          });

          res.on('end', function(){
			name = body;
            done(null, body);
          });

      })
      .on('error', function(err) {
            done(err);
      });
    },

    function (err) {
		if (err) {console.log(err);}
		console.log(count);
    }
);
