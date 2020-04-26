var express = require('express');
var router = express.Router();
const csv = require('csv');
/* GET home page. */
router.get('/', function (req, res, next) {
  const obj = csv();
  var MyData = [];
  
  var shortarray = [];
  var playerObject = {
    'name': '', //0
    'pos': '', //1
    'games': '', //4
    'field%': 0, //9
    '3p': 0, //10
    '3p%': 0, //12
    '2p%': 0,//15
    'ft%': 0,//18
    'ast': 0,//22
    'stl': 0,//23
    'blk': 0,//24
    //'turnover': 0, //25
    'pts': 0, //27
    'reb': 0, //21
  }
  obj.from.path('/Users/Johnny/Desktop/School Projects/cs180/myapp/routes/PlayerStatisticsPerGame.csv').to.array(function (data) {
    yearRoster = data.filter(data=>{
      return data[29] == 2018
    })

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
      
      MyData.push(playerObject);
      

    }
    shortarray = MyData.slice(0, 200);
    res.send(shortarray);

  });
});
router.get('/client', function (req, res, next) {
  console.log("Hi from client!!");
  res.json({ msg: "Message recieved from server" });
});

router.post('/searchcat', function (req, res, next) {
  const obj = csv();
  var MyData = [];
  var shortarray = [];
  var playerObject = {
    'name': '', //0
    'pos': '', //1
    'games': '', //4
    'field%': 0, //9
    '3p': 0, //10
    '3p%': 0, //12
    '2p%': 0,//15
    'ft%': 0,//18
    'ast': 0,//22
    'stl': 0,//23
    'blk': 0,//24
    //'turnover': 0, //25
    'pts': 0, //27
    'reb': 0, //21
  }
  obj.from.path('/Users/Johnny/Desktop/School Projects/cs180/myapp/routes/PlayerStatisticsPerGame.csv').to.array(function (data) {
    const yearRoster = data.filter(data=>{
      return data[29] == 2018
    })

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
      
      MyData.push(playerObject);
      

    }
    function sortByKey(array, key) {
      return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
    MyData.sort(function (a, b) {
      return b[req.body.searchCat] - a[req.body.searchCat]
    })

    //res.send(sortByKey(MyData, req.body.searchCat));
    res.send(MyData);
    // shortarray = MyData.slice(0, 50);
    // if (req.body.searchCat == 'none') {
    //   res.send(shortarray);
    // }
    // else {
    //   function compareValues(key, order = 'asc') {

    //     return function innerSort(a, b) {
    //       if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
    //         // property doesn't exist on either object
    //         return 0;
    //       }

    //       const varA = (typeof a[key] === 'string')
    //         ? a[key].toUpperCase() : a[key];
    //       const varB = (typeof b[key] === 'string')
    //         ? b[key].toUpperCase() : b[key];

    //       let comparison = 0;
    //       if (varA > varB) {
    //         comparison = 1;
    //       } else if (varA < varB) {
    //         comparison = -1;
    //       }
    //       return (
    //         (order === 'desc') ? (comparison * -1) : comparison
    //       );
    //     };
    //   }
    //   res.send(MyData.sort(compareValues(req.body.searchCat, 'desc')));
    // }

  });
});

router.post('/addPlayer', function (req, res, next) {
  const obj = csv();
  var playerName = req.body.addPlayer;
  var roster = req.body.roster;
  console.log(roster);
  //console.log(playerName);
  var MyData = [];
  var addRoster = [];
  var yearRoster = [];
  var playerObject = {
    'name': '', //0
    'pos': '', //1
    'games': '', //4
    'field%': 0, //9
    '3p': 0, //10
    '3p%': 0, //12
    '2p%': 0,//15
    'ft%': 0,//18
    'ast': 0,//22
    'stl': 0,//23
    'blk': 0,//24
    //'turnover': 0, //25
    'pts': 0, //27
    'reb': 0, //21
  }
  obj.from.path('/Users/Johnny/Desktop/School Projects/cs180/myapp/routes/PlayerStatisticsPerGame.csv').to.array(function (data) {
    // console.log(data[0][0].toLowerCase())
    
    yearRoster = data.filter(data=>{
      return data[29] == 2018
    })
    addRoster = [];
    addRoster = yearRoster.filter(data => {
      // console.log(data[0])
      return data[0].includes(playerName)})
      .map(index =>{
      // console.log(index[0])
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
      roster.push(playerObject);
      
      })
    
    // console.log(roster);
    // for (var index = 0; index < addRoster.length; index++) {
    //   var fieldPercent = data[index][9];
    //   var fieldPercentint = +fieldPercent;
    //   var threePercent = data[index][12];
    //   var threePercentint = +threePercent;
    //   var twoPercent = data[index][15];
    //   var twoPercentint = +twoPercent;
    //   var ftPercent = data[index][19];
    //   var ftPercentint = +ftPercent;
    //   var mp = data[index][6];
    //   var year = data[index][29];
    //   if (year === '2018' && mp >= 10) {
    //     var playerObject = { 'name': data[index][0], 'pos': data[index][1], 'games': data[index][4], 'field%': fieldPercentint.toFixed(3), '3p': data[index][10], '3p%': threePercentint.toFixed(3), '2p%': twoPercentint.toFixed(3), 'ft%': ftPercentint.toFixed(3), 'asst': data[index][22], 'stl': data[index][23], 'blk': data[index][24], 'pts': data[index][28], 'reb': data[index][21] }
    //     roster.push(playerObject);
    //   }
      
    // }
    // console.log(roster);
    res.send(roster);

  });
});

router.post('/dropPlayer', function (req, res, next) {
  var playerName = req.body.addPlayer;
  var roster = req.body.roster;
  // console.log(roster);
  //console.log(playerName);
  roster.map(idx => {
    if(idx['name'] == playerName){
      roster.splice(idx,1);
    }
  })
    console.log(roster);
    res.send(roster);

  
});

module.exports = router;
