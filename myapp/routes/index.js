var express = require('express');
var router = express.Router();
const csv = require('csv');
var rosterArr = [];
var playerArr = [];
const obj = csv();

obj.from.path('/Users/johnthai/Desktop/front+back/cs180/myapp/routes/PlayerStatisticsPerGame.csv').to.array(function (data) {

  yearRoster = data.filter(data => {
    return data[29] == 2018
  })
});




/* GET home page. */
router.get('/', function (req, res, next) {
  const obj = csv();
  var MyData = [];

  var shortarray = [];

  for (var index = 0; index < yearRoster.length; index++) {
    var fieldPercent = yearRoster[index][9];
    var fieldPercentint = +fieldPercent;
    var threePercent = yearRoster[index][12];
    var threePercentint = +threePercent;
    var twoPercent = yearRoster[index][15];
    var twoPercentint = +twoPercent;
    var ftPercent = yearRoster[index][19];
    var ftPercentint = +ftPercent;
    var mp = yearRoster[index][6];
    var playerObject = { 'name': yearRoster[index][0], 'pos': yearRoster[index][1], 'games': yearRoster[index][4], 'field%': fieldPercentint.toFixed(3), '3p': yearRoster[index][10], '3p%': threePercentint.toFixed(3), '2p%': twoPercentint.toFixed(3), 'ft%': ftPercentint.toFixed(3), 'asst': yearRoster[index][22], 'stl': yearRoster[index][23], 'blk': yearRoster[index][24], 'pts': yearRoster[index][28], 'reb': yearRoster[index][21] }

    playerArr.push(playerObject);

    var points = 0;
    var rebounds = 0;
    var assits = 0;
    var steals = 0;
    var turnover = 0;
    points = Math.max.apply(Math, playerArr.map(function (o) { return o["pts"]; }))
    console.log(points);
    rebounds = Math.max.apply(Math, playerArr.map(function (o) { return o["reb"]; }))
    assits = Math.max.apply(Math, playerArr.map(function (o) { return o["asst"]; }))
    steals = Math.max.apply(Math, playerArr.map(function (o) { return o["stl"]; }))
    // turnover = Math.max.apply(Math, playerArr.map(function (o) { return o["pts"]; }))

    for (var index = 0; index < playerArr.length; index++) {
      playerArr[index]["fantasyScore"] = Math.round(((playerArr[index]["pts"] / points) + (playerArr[index]["reb"] / rebounds) * 1.25 + (playerArr[index]["asst"] / assits) * 1.5 + (playerArr[index]["stl"] / steals) * 3) * 100) / 100
    }
  }
  // playerArr = MyData;
  shortarray = playerArr.slice(0, 200);
  res.send(shortarray);

});

router.get('/client', function (req, res, next) {
  console.log("Hi from client!!");
  res.json({ msg: "Message recieved from server" });
});

router.post('/searchcat', function (req, res, next) {
  const obj = csv();
  var MyData = [];
  var shortarray = [];

  // for (var index = 0; index < yearRoster.length; index++) {
  //   var fieldPercent = yearRoster[index][9];
  //   var fieldPercentint = +fieldPercent;
  //   var threePercent = yearRoster[index][12];
  //   var threePercentint = +threePercent;
  //   var twoPercent = yearRoster[index][15];
  //   var twoPercentint = +twoPercent;
  //   var ftPercent = yearRoster[index][19];
  //   var ftPercentint = +ftPercent;
  //   var mp = yearRoster[index][6];
  //   var playerObject = { 'name': yearRoster[index][0], 'pos': yearRoster[index][1], 'games': yearRoster[index][4], 'field%': fieldPercentint.toFixed(3), '3p': yearRoster[index][10], '3p%': threePercentint.toFixed(3), '2p%': twoPercentint.toFixed(3), 'ft%': ftPercentint.toFixed(3), 'asst': yearRoster[index][22], 'stl': yearRoster[index][23], 'blk': yearRoster[index][24], 'pts': yearRoster[index][28], 'reb': yearRoster[index][21], 'fantasyScore': playerArr[index]["fantasyScore"] }

  //   MyData.push(playerObject);


  // }
  playerArr.sort(function (a, b) {
    return b[req.body.searchCat] - a[req.body.searchCat]
  })
  res.send(playerArr);

});
router.post('/getRoster', function (req, res, next) {
  res.send(rosterArr);


});
router.post('/addPlayer', function (req, res, next) {

  var playerName = req.body.addPlayer;

  addRoster = yearRoster.filter(data => {
    return data[0].includes(playerName)
  })
    .map(index => {
      var fieldPercent = [index][0][9];
      var fieldPercentint = +fieldPercent;
      var threePercent = [index][0][12];
      var threePercentint = +threePercent;
      var twoPercent = [index][0][15];
      var twoPercentint = +twoPercent;
      var ftPercent = [index][0][19];
      var ftPercentint = +ftPercent;
      var mp = index[0][6];
      var year = index[0][29];
      var playerObject = { 'name': [index][0][0], 'pos': [index][0][1], 'games': [index][0][4], 'field%': fieldPercentint.toFixed(3), '3p': [index][0][10], '3p%': threePercentint.toFixed(3), '2p%': twoPercentint.toFixed(3), 'ft%': ftPercentint.toFixed(3), 'asst': [index][0][22], 'stl': [index][0][23], 'blk': [index][0][24], 'pts': [index][0][28], 'reb': [index][0][21] }
      rosterArr.push(playerObject);

    })
  console.log(rosterArr);
  res.send(rosterArr);


});

router.post('/dropPlayer', function (req, res, next) {
  var playerName = req.body.addPlayer;
  rosterArr.map(idx => {
    if (idx['name'] == playerName) {
      rosterArr.splice(idx, 1);
    }
  })
  res.send(rosterArr);


});

router.post('/scoring', function (req, res, next) {
  var points = 0;
  var rebounds = 0;
  var assits = 0;
  var steals = 0;
  var turnover = 0;
  points = Math.max.apply(Math, playerArr.map(function (o) { return o["pts"]; }))
  console.log(points);
  rebounds = Math.max.apply(Math, playerArr.map(function (o) { return o["reb"]; }))
  assits = Math.max.apply(Math, playerArr.map(function (o) { return o["asst"]; }))
  steals = Math.max.apply(Math, playerArr.map(function (o) { return o["stl"]; }))
  // turnover = Math.max.apply(Math, playerArr.map(function (o) { return o["pts"]; }))

  for (var index = 0; index < playerArr.length; index++) {
    playerArr[index]["fantasyScore"] = Math.round(((playerArr[index]["pts"] / points) + (playerArr[index]["reb"] / rebounds) * 1.25 + (playerArr[index]["asst"] / assits) * 1.5 + (playerArr[index]["stl"] / steals) * 3) * 100) / 100
  }
  res.send(playerArr);

});

module.exports = router;
