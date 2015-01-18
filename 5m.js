var http = require('http');


function httpPost (url, prt, id, cb) {

    var body = '';
    var postBody = JSON.stringify({'user_id': id});

    var options = {
        hostname: url,
        port: prt,
        path: '/users/create',
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Content-Length': postBody.length}
    };

    var postReq = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function(){
            cb(null, body);
        });
    });

    postReq.on('error', cb);

    postReq.end(postBody);
}

module.exports = httpPost;
