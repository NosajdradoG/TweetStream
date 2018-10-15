var	app = require('http').createServer(handler);
	io = require('socket.io').listen(app);
    fs = require('fs');
    util = require('util');
    twitter = require('twitter');

app.listen(9999, console.log('App listening on port 9999'));

// Twitter access token
var twit = new twitter ({
	consumer_key: 'ZDlB334dL0YQNjFf2JyFn9kd1',
	consumer_secret: 'NDmhOrHXwbnKjj8yBMYiDqPENl7MLbGiHXGOK4ifmpAb6JmLXV',
	access_token_key: '1049279921904910337-XmJHTqQ9cJxqW2baAApa1qKekL6uAf',
	access_token_secret: 'KNSiXWXdc63FGwicyDDfKGE4RtpgY01MtULG7mzlvmhRP',
});

// Gestion du stream
twit.stream('statuses/filter', { track: 'javascript' }, function(stream) {
  stream.on('data', function (data) {
    io.sockets.emit('tweet', data);
    console.log(data);
  });
});

// Lis le fichier index
function handler (req, res) {
  fs.readFile(__dirname + '/app_client/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
};