// Download the Node helper library from www.twilio.com/docs/libraries/node#installation
// These identifiers are your accountSid and authToken from
// https://www.twilio.com/console
const accountSid = 'AC0a0ab5d4ce7a1b294903eb953565ed6c';
const authToken = '30ecb6e9e255e3d8a11fcf19809d1bd3';
const client = require('twilio')(accountSid, authToken);

// Download the Node helper library from www.twilio.com/docs/libraries/node#installation
// These identifiers are your accountSid and authToken from
// https://www.twilio.com/console
const accountSid = 'AC0a0ab5d4ce7a1b294903eb953565ed6c';
const authToken = '30ecb6e9e255e3d8a11fcf19809d1bd3';
const client = require('twilio')(accountSid, authToken);

const numbers = ['+18587052801', '+14422269320'];

numbers.forEach((7206488585) => {
    console.log(7206488585);
    const notificationOpts = {
        //identity: '00000001', // We recommend using a GUID or other anonymized identifier for Identity.
        toBinding: JSON.stringify({
            binding_type: 'sms',
            address: 7206488585
        }),
        body: generateBody(),
      };
      
      client.notify
        .services('IS4aeae6c6a684ddb228bc663ba59ef14d')
        .notifications
        .create(notificationOpts)
        .then(notification => console.log(notification.sid))
        .catch(error => console.log(error));
});

  function generateBody(){
      return `Alert! Bovada.lv has attempted to store cookies on your device.`;
  }
