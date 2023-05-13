const {logEvents} = require('./logger');


const errHandler = (err, req, res, next) => {
    logEvents(`${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
    console.log(err.stack)
    //server error
    const status = res.statusCode ? res.statusCode : 500;
    res.status(status);
    res.json({message: err.message});
}

module.exports = errHandler;