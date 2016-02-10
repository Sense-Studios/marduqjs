// marduq?
var MARDUQ_URL = "cdn.marduq.tv";
var MARDUQ_KEY = "[YOUR MARDUQ KEY]";
var MARDUQ_SECRET ="[YOUR MARDUQ SECRET]";
var MARDUQ_CLIENT_ID = "[YOUR MARDUQ CLIENT ID]";

var defaults = {
  host: MARDUQ_URL,
  path: '/api/v2/programs/' + MARDUQ_CLIENT_ID,
  method: 'get',
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/api/v2/programs/'+MARDUQ_CLIENT_ID
};


var http = require("http");

//console.log(options)
//options.path = ''


var doRequest = function( _opt ) {
  console.log("DO REQUEST")
  var options = require('api_auth').auth(MARDUQ_KEY, MARDUQ_SECRET).sign_options( _opt , '');
  var request = http.request( options, function( res ) {
    console.log("request has options")
    console.log(options)
    var result = "";
    res.on('data', function( chunk ) {
      //console.log("chunk", chunk);
      result += chunk;
    });

    res.on('end', function() {
      //console.log(" --- end ");
      console.log(" results:");
      //try{
      //  for( var i in JSON.parse(result) ) {
      //    console.log( JSON.parse(result)[i].title );
      //  }
      //}catch(e){};
      console.log(result);
      console.log("---- END");
      try { console.log(JSON.parse(result).length, " items") } catch(e){};
    });
  });
  request.end();
}

// test!
//doRequest( defaults );


// TEST FUNCTION
var getMarduq = function( url ) {
  //options.url = url;
  //if ( url === null ) options.url = '/api/v2/programs.json?client_id=54dc8cc56465766b732d0100';
  //requestApi.end();
};
//getMarduq('/api/v2/programs/552e31e46465767ea1090000.json');

var ajaxRelay = function(options, params, json) {
  var opts;
  if (json == null) {
    json = false;
  }
  opts = {
    type: options.method,
    url: options.url,
    data: options.data,
    success: function(data, status) {
      return params.success(data);
    },
    error: function(data, status) {
      return params.failure(data);
    }
  };
  if (json) {
    opts['dataType'] = 'json';
    opts['contentType'] = 'application/json';
  }
  console.log("using node relay: ", opts, params);
  console.log("GOGOGO", opts.url ) //+ '.json' )
  defaults.url = opts.url //+ '.json';
  defaults.path = opts.url //+ '.json';
  doRequest(defaults)
  //options.path = opts.url;
  //requestApi.end();
  //return $.ajax(opts);
};

var MarduqApi = (function() {
  //return this.endpoint = '/marduq_api/';
  return this.endpoint = '/api/v2/';
});


MarduqApi.prototype.uploadVideo = function(params) {
  var options;
  console.log("M3 Api url:", this.endpoint + "videos.json");
  console.log("upload video with: ", params);
  options = {};
  options.method = "POST";
  options.url = this.endpoint + "videos.json";
  options.data = {
    video: params.video
  };
  return ajaxRelay(options, params);
};

MarduqApi.prototype.getVideo = function(params) {
  var options;
  console.log("M3 Api get video", params);
  options = {};
  options.method = "GET";
  options.url = this.endpoint + "videos/" + params.video.id;
  return ajaxRelay(options, params);
};

MarduqApi.prototype.createAsset = function(params) {
  var options;
  console.log("M3 Api url:", this.endpoint + "assets.json");
  console.log("create asset with: ", params);
  options = {};
  options.method = "POST";
  options.url = this.endpoint + "assets.json";
  options.data = {
    asset: params.asset
  };
  return ajaxRelay(options, params);
};

MarduqApi.prototype.updateAsset = function(params) {
  var options;
  console.log("M3 Api url: updateAsset", params);
  options = {};
  options.method = "PATCH";
  options.data = {
    asset: params.asset
  };
  options.url = this.endpoint + "assets/" + params.asset.id;
  return ajaxRelay(options, params);
};

MarduqApi.prototype.getAsset = function(params) {
  var options;
  console.log("M3 Api get asset", params);
  console.log("require asset: doublecheck: ", params.asset);
  options = {};
  options.method = "GET";
  options.url = this.endpoint + "assets/" + params.asset.id;
  return ajaxRelay(options, params);
};

MarduqApi.prototype.removeAsset = function(params) {
  var options;
  console.log("M3 Api delete asset", params);
  console.log("delete asset: doublecheck: ", params.asset);
  options = {};
  options.method = "DELETE";
  options.url = this.endpoint + "assets/" + params.asset.id;
  return ajaxRelay(options, params);
};

MarduqApi.prototype.createProgram = function(params) {
  var options;
  console.log("M3 Api get program", params);
  options = {};
  options.method = "GET";
  options.data = JSON.stringify({
    program: params
  });
  options.url = this.endpoint + "programs/";
  return ajaxRelay(options, params, true);
};

MarduqApi.prototype.updateProgram = function(params) {
  var options;
  console.log("M3 Api url: updateProgram", params);
  options = {};
  options.method = "PATCH";
  options.data = JSON.stringify({
    program: params.program
  });
  options.url = this.endpoint + "programs/" + params.program.id;
  return ajaxRelay(options, params, true);
};

MarduqApi.prototype.getProgram = function(params) {
  var options;
  console.log("M3 Api get program", params);
  options = {};
  options.method = "GET";

  options.url = this.endpoint + "programs/" + params.program

  // make this obvious security flaw go away
  if ( params.program === null || params.program == "" ) {
    // http://marduq3.sense-studios.com/api/v2/programs.json?client_id=54dc8cc56465766b732d0100
    options.url = this.endpoint + "programs.json?client_id=54dc8cc56465766b732d0100"
  }

  // add params.id ?
  return ajaxRelay(options, params);
};

MarduqApi.prototype.createProgramWithAsset = function(params) {
  var options;
  console.log("M3 Api url: create a program from a single asset", params.asset.id);
  options = {};
  options.method = "POST";
  options.data = {
    asset_id: params.asset.id
  };
  options.url = this.endpoint + "programs/create_program_with_asset/";
  return ajaxRelay(options, params);
};

MarduqApi.prototype.createProgramItemOnProgram = function(params) {
  return console.log("M3 Api url: updateProgram", params);
};

MarduqApi.prototype.createProgramItem = function(params) {
  return console.log("M3 Api url: updateProgram", params);
};

MarduqApi.prototype.getMarqersForProgram = function(params) {
  return console.log("M3 Api url: get Marqers for program");
};

MarduqApi.prototype.getMarqer = function(params) {
  return console.log("M3 Api url: updateProgram");
};

MarduqApi.prototype.updateMarqer = function(params) {
  var options;
  console.log("M3 Api url: updateMarqer", params);
  options = {};
  options.method = "PUT";
  options.url = this.endpoint + "marqers/" + params.marqer.remote_id;
  options.data = JSON.stringify({
    marqer: params.marqer,
    program_id: params.marqer.program_id
  });
  return ajaxRelay(options, params, true);
};

MarduqApi.prototype.createMarqer = function(params) {
  var options;
  console.log("M3 Api url: createMarqer", params);
  options = {};
  options.method = "POST";
  options.url = this.endpoint + "marqers/";
  options.data = JSON.stringify({
    marqer: params.marqer,
    program_id: params.marqer.program_id
  });
  return ajaxRelay(options, params, true);
};

MarduqApi.prototype.deleteMarqer = function(params) {
  var options;
  console.log("M3 Api url: delete marqer", params);
  options = {};
  options.method = "DELETE";
  if (params.marqer.remote_id === void 0) {
    options.url = this.endpoint + "marqers/" + params.marqer.id;
  } else {
    options.url = this.endpoint + "marqers/" + params.marqer.remote_id;
  }
  options.data = {
    marqer: params.marqer,
    program_id: params.marqer.program_id
  };
  return ajaxRelay(options, params);
};

console.log(MarduqApi)
// ---
// generated by coffee-script 1.9.2

module.exports =  {
  getMarduq: getMarduq,
  MarduqApi: new MarduqApi()
};
