/**
 *
 *	Creates our express server and sets up basic middleware, imports routes and adds them
 *
**/


let bodyParser = require('body-parser');
let express = require('express');
let path = require('path');
let session = require('express-session');

let app = express();

//imports our endpoints


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../app')));
app.use(session({
	secret: 'secret session',
	resave: false,
	saveUninitialized: true
}));

app.get('*', (req, res) => {
	res.redirect('/');
});

app.post('*', (req, res, next) => {
	console.log('\n', '\n', '\n', req.url, req.body);
	next();
});

require('./routes.js')(app);

let port = process.env.PORT || 7000;

app.listen(port, function listeningOnPort() {
	console.log('Listening on port ', port);
});

