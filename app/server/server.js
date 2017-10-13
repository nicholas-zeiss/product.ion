/**
 *
 *	Creates our express server and sets up basic middleware, imports routes and adds them.
 *
 *	Authorization is done using a JWT, all endpoints under the /api path are protected with
 *  express-jwt.
 *
**/


let bodyParser = require('body-parser');
let express = require('express');
let expressJwt = require('express-jwt');
let path = require('path');


let app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../app')));
app.use('/api', expressJwt({ secret: 'SSSHHHitsaSECRET' }));


//logging
app.post('*', (req, res, next) => {
	console.log('INCOMING REQUEST:', '\n', '\n', '\n', req.url, req.body);
	next();
});


//import our endpoints
require('./routes.js')(app);


//catchall for bad urls
app.get('*', (req, res) => {
	console.log('\n', '\n', '\n', 'redirecting to /');
	res.redirect('/');
});


let port = process.env.PORT || 7000;

app.listen(port, function listeningOnPort() {
	console.log('Listening on port ', port);
});
