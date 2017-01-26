var http = require('http');
var ejs = require('ejs');
var express = require('express');
var fs = require('fs');
var session = require('cookie-session'); 
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var json = JSON.parse(fs.readFileSync('root.json', 'utf8'));
var app = express();
temp = 22;


app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

//we are not in a request handler so we may use readFileSync
var content_index = fs.readFileSync('index.html', 'utf-8');
var compiled = ejs.compile(content_index);

app.get('/', function(req, res) {
    

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(compiled({temp: temp}));

	
});

app.post('/test_user', urlencodedParser,function(req, res) {
	console.log(json.user);
	console.log(json.password);
	 var pseudo = req.body.user.pseudo;
	 var password = req.body.user.mdp;
	 //res.write('voter pseudo est ' + pseudo + 'et vote mdp est  ' + password);
	 if (pseudo == (json.user) && password == (json.password))
	 	{
			console.log(" vous etes root");

			var content = fs.readFileSync('root.html', 'utf-8');
			var compiled = ejs.compile(content);
			res.writeHead(200, {'Content-Type': 'text/html'});
   			res.write(compiled({temp: temp}));
		}
	 else
		 {
			console.log(" vous avez pas les droit");

			var content = fs.readFileSync('nope.html', 'utf-8');
			var compiled = ejs.compile(content);
			res.writeHead(200, {'Content-Type': 'text/html'});
   			res.write(compiled({temp: temp}));
   		}


});

app.post('/changer_temperature', urlencodedParser,function(req, res) {
	 console.log(req.body.user.temperature);

	 var temperature = req.body.user.temperature;

// le + permet de dire au code que c est un int , s'il n'y est pas les var sont consodérer comme des string
	 if (temperature != null) 
	 {
	 	temp = +temp + +temperature ;
	 }

	 console.log(temp);
	 
	var content_index = fs.readFileSync('index.html', 'utf-8');
	var compiled = ejs.compile(content_index);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(compiled({temp: temp}));
});

app.get('/image.jpg', function(req, res) {
    

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(compiled({temp: temp}));

	
});

app.listen(8080);

console.log('death is the answer');

