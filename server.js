// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date_string", function (req, res) {
  let dateString = req.params.date_string;
  console.log("Request: " + dateString)
  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString)
    res.json({
      unix: dateInt,
      utc: new Date(dateInt).toUTCString()
    })
  } else {
    const date = new Date(dateString)
    if (date.toString() === 'Invalid Date') {
      res.json({
        error: "Invalid Date"
      })
    }  else {
      // if it's invalid return the answer
      res.json({
        unix: date.valueOf(),
        utc: date.toUTCString()
      });
    }
  }
});

app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    utc: now.toUTCString(),
    unix: now.getTime()
  })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
