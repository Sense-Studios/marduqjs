
// Marduq
var marduq = require('./modules/marduq');
var mapi = require('./modules/marduq').MarduqApi;
marduq.getMarduq('/api/v2/programs.json?client_id=[YOUR CLIENT ID]');   // test

//marduq.MarduqApi.getProgram({'program':''});                          // all programs
//marduq.MarduqApi.getProgram({'program':'[SOME PROGRAM ID]'});  // 1 progrmas

// go go  go

// ### Fire it up
server.listen( process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});
