var express = require('express');
var router = express.Router();
const csv = require('csv');
/* GET home page. */
router.get('/', function (req, res, next) {
  const obj = csv();
  var MyData = [];
  var playerObject = {
    'name': '', //0
    'pos': '', //1
    'games': '', //4
    'field%': 0, //9
    '3p': 0, //10
    '3p%': 0, //12
    '2p%': 0,//15
    'ft%': 0,//18
    'asst': 0,//22
    'stl': 0,//23
    'blk': 0,//24
    //'turnover': 0, //25
    'pts': 0, //27
    'reb': 0, //21
  }
  obj.from.path('/Users/Johnny/Desktop/cs180/myapp/routes/PlayerStatisticsPerGame.csv').to.array(function (data) {
    
    for (var index = 0; index < data.length; index++) {
      var playerObject = { 'name': data[index][0], 'pos': data[index][1], 'games': data[index][4], 'field%': data[index][9], '3p': data[index][10], '3p%': data[index][12], '2p%': data[index][15], 'ft%': data[index][18], 'asst': data[index][22], 'stl': data[index][23], 'blk': data[index][24], 'pts': data[index][27], 'reb': data[index][21] }
      MyData.push(playerObject);

    }

    res.send(MyData);

  });
});
router.get('/client', function (req, res, next) {
  console.log("Hi from client!!");
  res.json({ msg: "Message recieved from server" });
});

router.post('/searchcat', function (req, res, next) {
  console.log("Hi from client!!");
  const players = req.body.players;
  const searchcat = req.body.searchCat;
  console.log(searchcat);
  console.log(players);
  
  res.json({ msg: "Message recieved from server" });
});

module.exports = router;
