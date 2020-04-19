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
  obj.from.path('/Users/johnthai/Desktop/front+back/myapp/routes/PlayerStatisticsPerGame.csv').to.array(function (data) {

    for (var index = 0; index < data.length; index++) {
      var fieldPercent = data[index][9];
      var fieldPercentint = +fieldPercent;
      var threePercent = data[index][12];
      var threePercentint = +threePercent;
      var twoPercent = data[index][15];
      var twoPercentint = +twoPercent;
      var ftPercent = data[index][19];
      var ftPercentint = +ftPercent;
      var playerObject = { 'name': data[index][0], 'pos': data[index][1], 'games': data[index][4], 'field%': fieldPercentint.toFixed(3), '3p': data[index][10], '3p%': threePercentint.toFixed(3), '2p%': twoPercentint.toFixed(3), 'ft%': ftPercentint.toFixed(3), 'asst': data[index][22], 'stl': data[index][23], 'blk': data[index][24], 'pts': data[index][28], 'reb': data[index][21] }
      MyData.push(playerObject);

    }
    shortarray = MyData.slice(0, 50);
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
  obj.from.path('/Users/johnthai/Desktop/front+back/myapp/routes/PlayerStatisticsPerGame.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
      var fieldPercent = data[index][9];
      var fieldPercentint = +fieldPercent;
      var threePercent = data[index][12];
      var threePercentint = +threePercent;
      var twoPercent = data[index][15];
      var twoPercentint = +twoPercent;
      var ftPercent = data[index][19];
      var ftPercentint = +ftPercent;
      var mp = data[index][6];
      var mpint = +mp;
      if (data[index][29] == '2018' && mp >= 10) {
        var playerObject = { 'name': data[index][0], 'pos': data[index][1], 'games': data[index][4], 'field%': fieldPercentint.toFixed(3), '3p': data[index][10], '3p%': threePercentint.toFixed(3), '2p%': twoPercentint.toFixed(3), 'ft%': ftPercentint.toFixed(3), 'asst': data[index][22], 'stl': data[index][23], 'blk': data[index][24], 'pts': data[index][28], 'reb': data[index][21] }
        MyData.push(playerObject);
      }

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

module.exports = router;
