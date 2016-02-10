

    |\  /|           |              /\      '
    | \/ |/~~||/~\/~~||   |/~~|    /__\ |~~\|
    |    |\__||   \__| \_/|\__|   /    \|__/|
                              |/        |    
    ----------------------------------------------------------------- 


Welcome to your Marduq JS!

This clumsy, sorry piece of files actually has a working example of the marduqjs api
neatly packed in an express wrapper with some jade. 
Also there is a twitter scraper in here, but don't mind that for now.


## Install

    $ npm install marduqjs


## Doublecheck your package

Just do it, it saves you time, even when everything is fine :p


## Configure the API

    // create the api
    var mapi = require('marduqjs').MarduqApi;                

    // your friendly neighbourhood marduq cdn server
    mapi.MARDUQ_URL = "cdn.marduq.tv";           
    
    // your keys
    mapi.MARDUQ_KEY = "................................";
    mapi.MARDUQ_SECRET ="................................";
    
    // your client id is mandatory
    mapi.MARDUQ_CLIENT_ID = "........................";

You can get an api key by going to http://marduq.tv/developers/ and follow the instructions.
You'll need to make an account and get your generated keys from the account panel.

You only need to authorize the api once.


## Call the api

    var mapi = require('marduqjs').MarduqApi;
    
    //  make a testcall, getMarduq( url ) host should be set
    var test = mapi.getMarduq('/api/v2/programs.json?client_id=53a0349e6465765e728b0000');   
    
    // get all programs, just send an empty string
    var programs = mapi.getProgram({'program':''});
    
    // get one specific program, provide the program id
    var program = mapi.getProgram({'program':'552bbbde6465762de3280000'});                      

Here is a simple api call, where first we just throw an url to the api.
Second, get all programs, or get a single program with a program id


## Running the server

Open `server.js` and start the app 

## The Rest

MIT Licenced 2015

MARDUQ.TV, interactive video magic.
blog at http://www.xangadix.net for http://www.sense-studios.com