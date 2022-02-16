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

app.get("/api", function (req, res) {
  res.json({
    unix: Math.floor(new Date.now().getTime()),
    utc: new Date.now().toUTCString()
  })
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// app.get("/api/:date", function (req, res) {
//   let input = req.params.date;

//   console.log(typeof(input))

//   if (typeof(input) == 'number') {
//     res.json({
//       unix: input,
//       utc: new Date(input).toUTCString()
//     })
//   } else if (typeof(input) == 'string') {
//     res.json({
//       unix: Math.floor(new Date(req.params.date).getTime()),
//       utc: new Date(req.params.date).toUTCString()
//     })
//   } else if (typeof(input) == 'null') {
//     res.json({
//       unix: Math.floor(new Date.now().getTime()),
//       utc: new Date.now().toUTCString()
//     })
//   } else if (typeof(input) == 'undefined') {
//     res.json({
//       error: "Invalid Date"
//     })
//   }
// })

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + process.env.PORT);
// });
