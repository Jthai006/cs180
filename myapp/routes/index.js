var express = require('express');
var router = express.Router();
const csv = require('csv');
var rosterArr = [];
var playerArr = [];
var statsArr = [];
const obj = csv();
var playerIndex = 0;
var bigRoster = {};
var searchArr = [];
var players = {};
var myStars = [];
obj.from.path('/Users/Johnny Ho/Desktop/cs180/myapp/routes/PlayerStatisticsPerGame.csv').to.array(function (data) {

  yearRoster = data.filter(data => {
    return data[29] == 2020
  })

  for (var x = 2018; x < 2021; x++) {
    var temp = [];
    temp = data.filter(data => {
      return data[29] == x

    })
    bigRoster[x] = temp;
  }

});





router.get('/save', function (req, res, next) {

  // var data = { roster: rosterArr };
  // var json = JSON.parse(data);
  // console.log(json);
  // var data = JSON.stringify(json);
  // var fs = require('fs');
  // fs.writeFile("file.json", data);
  const fs = require('fs')
  const saved = {
    roster: rosterArr
  }
  const jsonString = JSON.stringify(saved)
  fs.writeFile('./data.json', jsonString, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
  res.send("done");

});
router.get('/import', function (req, res, next) {

  const fs = require('fs');

  let rawdata = fs.readFileSync('data.json');
  let data = JSON.parse(rawdata);
  rosterArr = data["roster"]
  res.send(rosterArr);

});

/* GET home page. */
router.get('/', function (req, res, next) {
  const obj = csv();
  var MyData = [];

  var shortarray = [];
  for (var index = 0; index < 49; index++) {
    var fieldPercent = yearRoster[index][9];
    var fieldPercentint = +fieldPercent;
    var threePercent = yearRoster[index][12];
    var threePercentint = +threePercent;
    var twoPercent = yearRoster[index][15];
    var twoPercentint = +twoPercent;
    var ftPercent = yearRoster[index][19];
    var ftPercentint = +ftPercent;
    var mp = yearRoster[index][6];
    var playerObject = { 'name': yearRoster[index][0], 'pos': yearRoster[index][1], 'games': yearRoster[index][4], 'field%': fieldPercentint.toFixed(3), '3p': yearRoster[index][10], '3p%': threePercentint.toFixed(3), '2p%': twoPercentint.toFixed(3), 'ft%': ftPercentint.toFixed(3), 'asst': yearRoster[index][23], 'stl': yearRoster[index][24], 'blk': yearRoster[index][25], 'pts': yearRoster[index][28], 'reb': yearRoster[index][22] }

    playerArr.push(playerObject);
  }

  // var myStars = []
  // myStars = playerArr;
  // myStars.sort(function (a, b) {
  //   return b["fantasytotal"] - a["fantasytotal"]
  // })

  // var allStars = myStars.slice(0, 24);
  // for (var index = 0; index < playerArr.length; index++) {

  //   if (allStars.includes(myStars[index])) {

  //     playerArr[index]["star"] = "****"
  //   }
  //   else {

  //     playerArr[index]["star"] = ""
  //   }

  // }


  // playerArr = MyData;
  //shortarray = playerArr.slice(0, 200);
  res.send(playerArr);
  playerArr = [];

});

router.post('/changePg', function (req, res, next) {
  playerArr = [];
  const obj = csv();
  var MyData = [];

  var shortarray = [];
  if (req.body.type == "next") {
    playerIndex += 50;
    upto = playerIndex + 50;
    console.log(playerIndex);
  }
  else {
    if (playerIndex == 0) {
      upto = 50;
    }
    else {
      playerIndex = playerIndex - 50
      upto = playerIndex + 50;
    }

  }
  for (var index = playerIndex; index < upto; index++) {
    console.log(index);
    var fieldPercent = yearRoster[index][9];
    var fieldPercentint = +fieldPercent;
    var threePercent = yearRoster[index][12];
    var threePercentint = +threePercent;
    var twoPercent = yearRoster[index][15];
    var twoPercentint = +twoPercent;
    var ftPercent = yearRoster[index][19];
    var ftPercentint = +ftPercent;
    var mp = yearRoster[index][6];
    var fantasypts = (+(yearRoster[index][28]) + (+(yearRoster[index][10]) * 3) + (+(yearRoster[index][22]) * 1.2) + (+(yearRoster[index][23]) * 1.5) + (+(yearRoster[index][25]) * 2) + (+(yearRoster[index][24]) * 2));
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

    for (var y = 0; y < playerArr.length; y++) {
      playerArr[y]["prtg"] = Math.round(((playerArr[y]["pts"] / points) + (playerArr[y]["reb"] / rebounds) * 1.2 + (playerArr[y]["asst"] / assists) * 1.5 + (playerArr[y]["stl"] / steals) * 2) + ((playerArr[y]["blk"] / blks) * 2) * 100) / 100
    }
  }

  var myStars = []
  myStars = playerArr;
  myStars.sort(function (a, b) {
    return b["fantasytotal"] - a["fantasytotal"]
  })

  var allStars = myStars.slice(0, 24);
  for (var index = 0; index < playerArr.length; index++) {

    if (allStars.includes(myStars[index])) {

      playerArr[index]["star"] = "****"
    }
    else {

      playerArr[index]["star"] = ""
    }

  }


  // playerArr = MyData;
  //shortarray = playerArr.slice(0, 200);
  res.send(playerArr);

});

router.get('/stats', function (req, res, next) {
  const obj = csv();
  var MyData = [];
  var namesOfPlayer = [];
  var shortarray = [];

  for (var index = 0; index < yearRoster.length; index++) {
    namesOfPlayer.push(yearRoster[index][0]);
    var fieldPercent = yearRoster[index][9];
    var fieldPercentint = +fieldPercent;
    var threePercent = yearRoster[index][12];
    var threePercentint = +threePercent;
    var twoPercent = yearRoster[index][15];
    var twoPercentint = +twoPercent;
    var ftPercent = yearRoster[index][19];
    var ftPercentint = +ftPercent;
    var mp = yearRoster[index][6];
    var fantasypts = (+(yearRoster[index][28]) + (+(yearRoster[index][10]) * 3) + (+(yearRoster[index][22]) * 1.2) + (+(yearRoster[index][23]) * 1.5) + (+(yearRoster[index][25]) * 2) + (+(yearRoster[index][24]) * 2));
    //console.log(+(yearRoster[index][28]) + (+(yearRoster[index][21])*1.25))
    var fantasytotal = +(fantasypts) * (+(yearRoster[index][4]));
    var playerObject = { 'name': yearRoster[index][0], 'pos': yearRoster[index][1], 'games': yearRoster[index][4], 'field%': fieldPercentint.toFixed(3), '3p': yearRoster[index][10], '3p%': threePercentint.toFixed(3), '2p%': twoPercentint.toFixed(3), 'ft%': ftPercentint.toFixed(3), 'asst': yearRoster[index][23], 'stl': yearRoster[index][24], 'blk': yearRoster[index][25], 'pts': yearRoster[index][28], 'reb': yearRoster[index][22], 'fantasyScore': fantasypts.toFixed(2), 'fantasytotal': fantasytotal.toFixed(0) }

    statsArr.push(playerObject);

    var points = 0;
    var rebounds = 0;
    var assists = 0;
    var steals = 0;
    var threesmade = 0;
    var blks = 0;
    points = Math.max.apply(Math, statsArr.map(function (o) { return o["pts"]; }))
    // console.log(points);
    rebounds = Math.max.apply(Math, statsArr.map(function (o) { return o["reb"]; }))
    assists = Math.max.apply(Math, statsArr.map(function (o) { return o["asst"]; }))
    steals = Math.max.apply(Math, statsArr.map(function (o) { return o["stl"]; }))
    threesmade = Math.max.apply(Math, statsArr.map(function (o) { return o["3p"]; }))
    blks = Math.max.apply(Math, statsArr.map(function (o) { return o["blk"]; }))

    for (var index = 0; index < statsArr.length; index++) {
      statsArr[index]["prtg"] = Math.round(((statsArr[index]["pts"] / points) + (statsArr[index]["reb"] / rebounds) * 1.2 + (statsArr[index]["asst"] / assists) * 1.5 + (statsArr[index]["stl"] / steals) * 2) + ((statsArr[index]["blk"] / blks) * 2) * 100) / 100
    }



  }
  
  // console.log(typeof(namesOfPlayer[0]))
  // console.log(namesOfPlayer[0].trim().toLowerCase());
  for (var x = 0; x < namesOfPlayer.length; x++) {
    // console.log(namesofPLayer[x].toLowerCase());
    var newPlayer = namesOfPlayer[x].trim().toLowerCase();

    // var newPlayer = namesOfPlayer[x]
    // console.log(typeof(newPlayer));
    players[newPlayer] = [];
    // players.newPlayer = [];

  }

  console.log(players["lebron james"]);

  Object.keys(bigRoster).forEach(function (key) {
    for (var x = 0; x < bigRoster[key].length; x++) {
      if (namesOfPlayer.includes(bigRoster[key][x][0])) {
        players[bigRoster[key][x][0].trim().toLowerCase()].push(bigRoster[key][x]);
      }
    }
  });

  var finalFantasypoints = {};
  var finalFantasypointslow = {};
  // console.log(players);
  Object.keys(players).forEach(function (key) {
    var temp = 0
    var temp2 = 9999
    for (var x = 0; x < players[key].length; x++) {
      var fantasypts = (+(players[key][x][28]) + (+(players[key][x][10]) * 3) + (+(players[key][x][22]) * 1.2) + (+(players[key][x][23]) * 1.5) + (+(players[key][x][25]) * 2) + (+(players[key][x][24]) * 2));
      var fantasytotal = (fantasypts) * ((players[key][x][4]));
      if (temp < fantasytotal) {
        temp = Math.ceil((100 * fantasytotal) / 100)
        finalFantasypoints[key] = (100 * temp) / 100;
      }
    }
    if (temp > fantasytotal) {
      temp = Math.ceil((100 * fantasytotal) / 100)
      finalFantasypointslow[key] = (100 * temp) / 100;
    }
  }
  );
  // console.log(finalFantasypointslow);

  for (var index = 0; index < statsArr.length; index++) {
    statsArr[index]["high"] = finalFantasypoints[statsArr[index]["name"].trim().toLowerCase()]
    statsArr[index]["low"] = finalFantasypointslow[statsArr[index]["name"].trim().toLowerCase()]
  }

  // for (var idx = 0; idx < statsArr.length; idx++) {
  //   var myPlayers = bigRoster.filter(player => {
  //     // console.log(playerArr[index]);
  //     return player[0] == playerArr[idx]["name"]


  //   //   var fantasypts = (+(yearRoster[index][28]) + (+(yearRoster[index][10]) * 3) + (+(yearRoster[index][22]) * 1.2) + (+(yearRoster[index][23]) * 1.5) + (+(yearRoster[index][25]) * 2) + (+(yearRoster[index][24]) * 2));
  //   // //console.log(+(yearRoster[index][28]) + (+(yearRoster[index][21])*1.25))
  //   // var fantasytotal = +(fantasypts) * (+(yearRoster[index][4]));
  //   })
  //   // console.log(myPlayers[0][28])
  //   myPlayers.map(index => {
  //      console.log(+([index][28]))
  //     var fantasypts = (+([index][28]) + (+([index][10]) * 3) + (+([index][22]) * 1.2) + (+([index][23]) * 1.5) + (+([index][25]) * 2) + (+([index][24]) * 2));
  //   // console.log(fantasypts);
  //     var fantasytotal = +(fantasypts) * (+([index][4]));
  //     // console.log(fantasytotal);
  //   })
  //   // console.log(myPlayers);
  // }

  // // playerArr = MyData;
  // shortarray = playerArr.slice(0, 200);
  // console.log(statsArr);
  res.send(statsArr);

});

router.get('/client', function (req, res, next) {
  console.log("Hi from client!!");
  res.json({ msg: "Message recieved from server" });
});

router.post('/searchcat', function (req, res, next) {
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
    var fantasypts = (+(yearRoster[index][28]) + (+(yearRoster[index][10]) * 3) + (+(yearRoster[index][22]) * 1.2) + (+(yearRoster[index][23]) * 1.5) + (+(yearRoster[index][25]) * 2) + (+(yearRoster[index][24]) * 2));
    //console.log(+(yearRoster[index][28]) + (+(yearRoster[index][21])*1.25))
    var fantasytotal = +(fantasypts) * (+(yearRoster[index][4]));
    var playerObject = { 'name': yearRoster[index][0], 'pos': yearRoster[index][1], 'games': yearRoster[index][4], 'field%': fieldPercentint.toFixed(3), '3p': yearRoster[index][10], '3p%': threePercentint.toFixed(3), '2p%': twoPercentint.toFixed(3), 'ft%': ftPercentint.toFixed(3), 'asst': yearRoster[index][23], 'stl': yearRoster[index][24], 'blk': yearRoster[index][25], 'pts': yearRoster[index][28], 'reb': yearRoster[index][22], 'fantasyScore': fantasypts.toFixed(2), 'fantasytotal': fantasytotal.toFixed(0) }

    searchArr.push(playerObject);
  }
  var obj1 = searchArr.reduce(function (acc, cur, i) {
    acc[cur["name"]] = cur;
    return acc;
  }, {});
  var finalArr = []
  Object.keys(obj1).forEach(function (key) {
    finalArr.push(obj1[key])
  }
  );
  finalArr.sort(function (a, b) {
    return b[req.body.searchCat] - a[req.body.searchCat]
  })
  shortarray = finalArr.slice(0, 50);
  res.send(shortarray);

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
      var fantasypts = (+([index][0][28]) + (+([index][0][10]) * 3) + (+([index][0][22]) * 1.2) + (+([index][0][23]) * 1.5) + (+([index][0][25]) * 2) + (+([index][0][24]) * 2));
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
  var player1 = req.body.player1;
  var player2 = req.body.player2;
  var player1Arr = [];
  var player2Arr = [];
  var playerArr = [];
  var bigArray = [];

  // console.log(players["\nLeBron James"][0]);
  // console.log(players);

  // console.log(yearRoster);
  for (var i = 0; i < yearRoster.length; i++) {
    if (yearRoster[i][0].trim().toLowerCase() == player1.toLowerCase()) {
      var points = (+(players[player1.toLowerCase()][0][28]) + (+(players[player1.toLowerCase()][1][28])) + (+(players[player1.toLowerCase()][2][28]))) / 3;
      
      var rebounds = (+(players[player1.toLowerCase()][0][21]) + (+(players[player1.toLowerCase()][1][21])) + (+(players[player1.toLowerCase()][2][21]))) / 3;
      var assists = (+(players[player1.toLowerCase()][0][23]) + (+(players[player1.toLowerCase()][1][23])) + (+(players[player1.toLowerCase()][2][23]))) / 3;
      var threeP = (+(players[player1.toLowerCase()][0][10]) + (+(players[player1.toLowerCase()][1][10])) + (+(players[player1.toLowerCase()][2][10]))) / 3;
      var steals = (+(players[player1.toLowerCase()][0][24]) + (+(players[player1.toLowerCase()][1][24])) + (+(players[player1.toLowerCase()][2][24]))) / 3;
      var blocks = (+(players[player1.toLowerCase()][0][25]) + (+(players[player1.toLowerCase()][1][25])) + (+(players[player1.toLowerCase()][2][25]))) / 3;

      player1Arr.push(points.toFixed(1), rebounds.toFixed(1), assists.toFixed(1), threeP.toFixed(1), steals.toFixed(1), blocks.toFixed(1))
    }
  }

  for (var i = 0; i < yearRoster.length; i++) {
    if (yearRoster[i][0].trim().toLowerCase() == player2.toLowerCase()) {
      var points = (+(players[player2.toLowerCase()][0][28]) + (+(players[player2.toLowerCase()][1][28])) + (+(players[player2.toLowerCase()][2][28]))) / 3;
      
      var rebounds = (+(players[player2.toLowerCase()][0][21]) + (+(players[player2.toLowerCase()][1][21])) + (+(players[player2.toLowerCase()][2][21]))) / 3;
      var assists = (+(players[player2.toLowerCase()][0][23]) + (+(players[player2.toLowerCase()][1][23])) + (+(players[player2.toLowerCase()][2][23]))) / 3;
      var threeP = (+(players[player2.toLowerCase()][0][10]) + (+(players[player2.toLowerCase()][1][10])) + (+(players[player2.toLowerCase()][2][10]))) / 3;
      var steals = (+(players[player2.toLowerCase()][0][24]) + (+(players[player2.toLowerCase()][1][24])) + (+(players[player2.toLowerCase()][2][24]))) / 3;
      var blocks = (+(players[player2.toLowerCase()][0][25]) + (+(players[player2.toLowerCase()][1][25])) + (+(players[player2.toLowerCase()][2][25]))) / 3;

      player2Arr.push(points.toFixed(1), rebounds.toFixed(1), assists.toFixed(1), threeP.toFixed(1), steals.toFixed(1), blocks.toFixed(1))
    }
  }

  playerArr.push(player1, player2)

  bigArray.push(playerArr, player1Arr, player2Arr)
  console.log(bigArray);
  res.send(bigArray);
});

router.post('/searchPlayer', function (req, res, next) {
  console.log('hi')
  var player = req.body.searchPlayer;
  var searchPlayer;
  var searchArr = [];
  var addPlayer = yearRoster.filter(data => {
    return data[0].trim().toLowerCase().includes(player)
  })

  console.log(addPlayer);

  if(addPlayer.length == 0){
    
    res.send(searchArr);
    console.log("Sent alert");
  }
  else{
    var fieldPercent = players[player.toLowerCase()][2][9];
    var fieldPercentint = +fieldPercent;
    var threePercent = players[player.toLowerCase()][2][12];
    var threePercentint = +threePercent;
    var twoPercent = players[player.toLowerCase()][2][15];
    var twoPercentint = +twoPercent;
    var ftPercent = players[player.toLowerCase()][2][19];
    var ftPercentint = +ftPercent;
    // console.log(players[player.toLowerCase()][2][0])
    var playerObject = { 'name': players[player.toLowerCase()][2][0], 'pos': players[player.toLowerCase()][2][1], 'games': players[player.toLowerCase()][2][4], 'field%': fieldPercentint.toFixed(3), '3p': players[player.toLowerCase()][2][10], '3p%': threePercentint.toFixed(3), '2p%': twoPercentint.toFixed(3), 'ft%': ftPercentint.toFixed(3), 'asst': players[player.toLowerCase()][2][23], 'stl': players[player.toLowerCase()][2][24], 'blk': players[player.toLowerCase()][2][25], 'pts': players[player.toLowerCase()][2][28], 'reb': players[player.toLowerCase()][2][22]}
    searchArr.push(playerObject);
    res.send(searchArr);
  }
  
 

});

module.exports = router;
