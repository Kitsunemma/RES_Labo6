let express = require('express');
let app = express();

let logdate = () => (new Date()).toUTCString();

app.get('/fortune-cookies/', (req, res) => {
    console.log([logdate(), req.ip, req.method, req.url].join(' '));
    
    res.send({});
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(logdate() + ' Now listening on port ' + PORT + '!');
});
