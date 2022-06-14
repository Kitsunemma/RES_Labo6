const { v4: uuidv4 } = require('uuid');
let uuid = uuidv4(); 

/*
 * We use a standard Node.js module to work with UDP
 */
let dgram = require('dgram');

/*
 * Let's create a datagram socket. We will use it to send our UDP datagrams 
 */
let s = dgram.createSocket('udp4');


const musician = process.argv[2];

const instrumentToSoundMap = new Map();
instrumentToSoundMap.set('piano', 'ti-ta-ti');
instrumentToSoundMap.set('trumpet', 'pouet');
instrumentToSoundMap.set('flute', 'trulu');
instrumentToSoundMap.set('violin', 'gzi-gzi');
instrumentToSoundMap.set('drum', 'boum-boum');

const sound = instrumentToSoundMap.get(musician);

if (!sound) {
    console.error("Instrument not reconized! >:(");
    process.exit(9);
}

playASound = function() {
    let content = {
        uuid: uuid,
        sound: sound
    };
    let message  = JSON.stringify(content);

    /*
    * Finally, let's encapsulate the payload in a UDP datagram, which we publish on
    * the multicast address. All subscribers to this address will receive the message.
    */
    let payload = Buffer.from(message, "utf8");
    s.send(payload, 0, payload.length, 9907, "239.255.22.5", function(err, bytes) {
        console.log("Sending payload: " + payload + " via port " + s.address().port);
    });

}

setInterval(this.playASound.bind(this), 1000);
