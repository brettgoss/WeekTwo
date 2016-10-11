var request = require('request');
var dotenv = require('dotenv').config();
var username = process.argv[process.argv.length - 1];
var users = [];

console.log(username);
function buildURL(endpoint) {
  return 'https://api.github.com/'+endpoint+'?access_token='+process.env.GITHUB_KEY;
}

request({
  url: buildURL('user'),
  method: 'GET',
  headers: {
    'User-Agent': 'request'
  },
  json: true
}, function(err, res, userData) {
  users.push(userData);
  request({
    url: buildURL('users/'+username),
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    },
    json: true
  }, function(err, res, userData){
    users.push(userData);
    console.log(users)
  });
})

console.log();