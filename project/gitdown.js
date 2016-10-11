var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config();

function getContributorsByURL(owner, repo, cb) {
  var endpoint='http://api.github.com/repos/' + owner + '/' + repo + '/contributors' + '?access_token='+process.env.GITHUB_KEY;

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
    if(response.statusCode == 200) {
      body.map(function (usr) {
        var path = "download/" + usr.login + '.jpg';
        var url = usr.avatar_url;
      cb(url, path);
      });
    }
  });
}

function getImage(url, path) {
  var requestConfig = {
    url: url,
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    },
    json: true,
  };

  var stream = request(requestConfig, function(err, response, body) {
    if (err) {
      throw err;
    }
    console.log("Response Status Code:", response.statusCode);
  });
  stream.pipe(fs.createWriteStream(path));
};

var username = process.argv[2];
var reponame = process.argv[3];
console.log("Requesting " + username + "'s " + reponame + " repository");

getContributorsByURL(username, reponame, getImage)



