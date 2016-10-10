var myArg = process.argv.slice(2);
var fs = require("fs");

var filePath = "/tmp/test_async.txt";
var fileData = myArg + "\n";

fs.writeFile(filePath, fileData, function(err) {
  if (err) {
    throw err;
  }
  console.log("Successfully wrote to", filePath);
});
console.log(myArg);




