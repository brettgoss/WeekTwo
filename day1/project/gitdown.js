var request = require('request');
var fs = require('fs');
// This is used to add my API Token to the end of each endpoint URL
var dotenv = require('dotenv').config();

function getContributorsByURL(owner, repo, cb) {
  // Building the GitHub api endpoint URL + API access token
  var endpoint = 'http://api.github.com/repos/' + owner + '/' + repo + '/contributors' + '?access_token=' + process.env.GITHUB_KEY;

  var requestConfig = {
    url: endpoint,
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    },
    json: true,
  };

  request(requestConfig, function(err, response, body) {
      if (err) {
        throw err;
     }
    console.log("Response Status Code:", response.statusCode);
    // Only continue to map the request if the request was successful.
    if(response.statusCode == 200) {
      body.map(function (usr) {
        var path = "avatars/" + usr.login + '.jpg';
        var url = usr.avatar_url;
      cb(url, path);
      });
    }
  });
}
// Requests the avatar url for each repo contributor and writes it to a path
function getImage(url, path) {
  var requestConfig = {
    url: url,
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    },
    json: true,
  }
  var stream = request(requestConfig, function(err, response, body) {
    if (err) {
      throw err;
    }
    console.log("Response Status Code:", response.statusCode);
  });
  // Pipes the request to a stream and writes to the given path.
  stream.pipe(fs.createWriteStream(path));
};

// Command line input to decide GitHub username followed by repo name
var username = process.argv[2];
var reponame = process.argv[3];
console.log("Requesting " + username + "'s " + reponame + " repository");

getContributorsByURL(username, reponame, getImage);
