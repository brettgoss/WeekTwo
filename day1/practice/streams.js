var http = require("http");

var requestOptions = {
  host: "example.com",
  path: "/"
};

function readHTML(url, callback){

  http.get(url, (response) =>{

    response.setEncoding("utf8");             // Use UTF-8 encoding

    response.on("data", function(data) {           // On Data Received
      console.log("Chunk Received. Length:", data.length);
      callback(data);
    });
    response.on("end", function() {                // On Data Completed
      console.log("Response stream complete.");
    });
  });
}
readHTML(requestOptions, function printHTML(data){
  console.log(data);
});