// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { application } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// if the date parameter is empty, it will reach this route instead
app.get("/api", function (req, res) {
  res.json({
    unix: Math.floor(new Date()),
    utc: new Date().toUTCString()
  })
})

app.get("/api/:date", function (req, res) {
  let inputInString = req.params.date;
  let inputInDate = new Date(req.params.date);

  if (Number(inputInString)) {
    res.json({
      unix: inputInString,
      utc: new Date(Number(inputInString)).toUTCString()
    })
  } else if (isNaN(inputInDate) === false) {
    res.json({
      unix: Math.floor(new Date(inputInString).getTime()),
      utc: inputInDate.toUTCString()
    })
  } else if (isNaN(inputInDate) === true) {
    res.json({
      error: "Invalid Date"
    })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
