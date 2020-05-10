var express = require('express');
var router = express.Router();
const csv = require('csv');
var rosterArr = [];
var playerArr = [];
const obj = csv();

obj.from.path('/Users/Johnny/Desktop/School Projects/cs180/myapp/routes/PlayerStatisticsPerGame.csv').to.array(function (data) {

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
    var fantasypts = (+(yearRoster[index][28]) + (+(yearRoster[index][10])*3) + (+(yearRoster[index][22])*1.2)  + (+(yearRoster[index][23])*1.5) + (+(yearRoster[index][25])*2) + (+(yearRoster[index][24])*2));
    //console.log(+(yearRoster[index][28]) + (+(yearRoster[index][21])*1.25))
    var fantasytotal = +(fantasypts) * (+(yearRoster[index][4]));
    var playerObject = { 'name': yearRoster[index][0], 'pos': yearRoster[index][1], 'games': yearRoster[index][4], 'field%': fieldPercentint.toFixed(3), '3p': yearRoster[index][10], '3p%': threePercentint.toFixed(3), '2p%': twoPercentint.toFixed(3), 'ft%': ftPercentint.toFixed(3), 'asst': yearRoster[index][23], 'stl': yearRoster[index][24], 'blk': yearRoster[index][25], 'pts': yearRoster[index][28], 'reb': yearRoster[index][22], 'fantasyScore': fantasypts.toFixed(2), 'fantasytotal': fantasytotal.toFixed(0) }

    playerArr.push(playerObject);

    var points = 0;
    var rebounds = 0;
    var assists = 0;
    var steals = 0;
    var threesmade = 0;
    var blks = 0;
    points = Math.max.apply(Math, playerArr.map(function (o) { return o["pts"]; }))
    // console.log(points);
    rebounds = Math.max.apply(Math, playerArr.map(function (o) { return o["reb"]; }))
    assists = Math.max.apply(Math, playerArr.map(function (o) { return o["asst"]; }))
    steals = Math.max.apply(Math, playerArr.map(function (o) { return o["stl"]; }))
    threesmade = Math.max.apply(Math, playerArr.map(function (o) { return o["3p"]; }))
    blks = Math.max.apply(Math, playerArr.map(function (o) { return o["blk"]; }))

    for (var index = 0; index < playerArr.length; index++) {
      playerArr[index]["prtg"] = Math.round(((playerArr[index]["pts"] / points) + (playerArr[index]["reb"] / rebounds) * 1.2 + (playerArr[index]["asst"] / assists) * 1.5 + (playerArr[index]["stl"] / steals) * 2) + ((playerArr[index]["blk"] / blks) * 2) * 100) / 100
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
      var fantasypts = (+([index][0][28]) + (+([index][0][10])*3) + (+([index][0][22])*1.2)  + (+([index][0][23])*1.5) + (+([index][0][25])*2) + (+([index][0][24])*2));
      //console.log('a');
      var fantasytotal = +(fantasypts) * (+([index][0][4]));
      //console.log('b');
      var playerrating = [index][0][4];
      //console.log('e');
      var playerObject = { 'name': [index][0][0], 'pos': [index][0][1], 'games': [index][0][4], 'field%': fieldPercentint.toFixed(3), '3p': [index][0][10], '3p%': threePercentint.toFixed(3), '2p%': twoPercentint.toFixed(3), 'ft%': ftPercentint.toFixed(3), 'asst': [index][0][23], 'stl': [index][0][24], 'blk': [index][0][25], 'pts': [index][0][28], 'reb': [index][0][21], 'fantasytotal': fantasytotal.toFixed(0), 'fantasyScore': fantasypts.toFixed(2) }
      //console.log('sa');
      rosterArr.push(playerObject);
      //console.log('c');
      var points = 0;
      var rebounds = 0;
      var assists = 0;
      var steals = 0;
      var threesmade = 0;
      var blks = 0;
      points = Math.max.apply(Math, playerArr.map(function (o) { return o["pts"]; }))
      // console.log(points);
      rebounds = Math.max.apply(Math, playerArr.map(function (o) { return o["reb"]; }))
      assists = Math.max.apply(Math, playerArr.map(function (o) { return o["asst"]; }))
      steals = Math.max.apply(Math, playerArr.map(function (o) { return o["stl"]; }))
      threesmade = Math.max.apply(Math, playerArr.map(function (o) { return o["3p"]; }))
      blks = Math.max.apply(Math, playerArr.map(function (o) { return o["blk"]; }))
      for (var index = 0; index < rosterArr.length; index++) {
        rosterArr[index]["prtg"] = Math.round(((playerArr[index]["pts"] / points) + (playerArr[index]["reb"] / rebounds) * 1.2 + (playerArr[index]["asst"] / assists) * 1.5 + (playerArr[index]["stl"] / steals) * 2) + ((playerArr[index]["blk"] / blks) * 2) * 100) / 100;
      }
    })
  // console.log('d');
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

router.post('/comparePlayers', function (req, res, next) {
  var player1 = req.body.player1
  var player2 = req.body.player2
  var bigArray = [];
  var player1Arr = [];
  var player2Arr = [];


  yearRoster.map(idx => {
    if (idx[0].toLowerCase() == player1.toLowerCase()) {
      player1Arr.push(idx[28],idx[21],idx[23],idx[10],idx[24],idx[25]);
    }
  })
  yearRoster.map(idx => {
    if (idx[0].toLowerCase() == player2.toLowerCase()) {
      player2Arr.push(idx[28],idx[21],idx[23],idx[10],idx[24],idx[25]);
    }
  })

  bigArray.push(player1Arr,player2Arr);
  console.log(bigArray);
  res.send(bigArray);
});

module.exports = router;
