const express = require("express")
const path = require('path')
const {logger} = require('./middleware/logger');
const errHandler = require('./middleware/errHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require("body-parser");


const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(cors({
    origin: 'http://localhost:3000', //your frontend url
    credentials: true
  }));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/index'));

app.all('*', (req,res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) { 
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errHandler);



app.listen(PORT, console.log(`Server running on port ${PORT}`));