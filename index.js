var express = require("express");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var hotelResponse = require("./routes/responseOfHotels.js");
var app = express();
app.use(bodyParser.json());
app.listen(3000, function () {
  console.log("app running on port.",3000);
});


app.post('/outputData', function (req, res) {

  return hotelResponse(req,res);
});

