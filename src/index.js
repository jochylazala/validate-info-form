const express = require('express');
const morgan = require('morgan');
const path = require('path')
const session = require('express-session');
const app = express();


app.use(express.static(path.join(__dirname,'public')));
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//routes
app.use(require('./routes/'));

app.listen(app.get('port'), () => {
	console.log("Server running on port", app.get('port'));
})

