var request = require("request");

var url = "http://www.example.com";


function readHTML (url, callback){
    console.log(url);

  request(url, function(err, response, body) {
    if (err) {
      throw err;
    }

    console.log("Response Status Code:", response.statusCode);
    callback(body)
  });
}
readHTML(url, function printHTML(data){
  console.log(data)
});