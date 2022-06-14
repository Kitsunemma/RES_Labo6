const dayjs = require('dayjs');
const net = require('net');
const dgram = require('dgram');

// mapping sounds to instruments
const instrumentFromSound = new Map();
instrumentFromSound.set('ti-ta-ti', 'piano');
instrumentFromSound.set('pouet', 'trumpet');
instrumentFromSound.set('trulu', 'flute');
instrumentFromSound.set('gzi-gzi', 'violin');
instrumentFromSound.set('boum-boum', 'drum');

// array of active musicians
let activeMusicians = [];

function removeInactiveMusicians()
{
    activeMusicians = activeMusicians.filter(
        m => {
            let now = dayjs();
            let latestActivity = dayjs( m.activeSince );
            let isActive = now.diff( latestActivity, 'seconds', true ) < 5;
            
            if ( !isActive )
            {
                console.log("Musician " + m.uuid + " was removed due to inactivity.");
            }
            
            return isActive;
        }
    );
}

const socket = dgram.createSocket('udp4');

socket.bind(9907, () => {
    console.log("Joining multicast group");
    socket.addMembership("239.255.22.5");
});

socket.on('message', (msgBuffer, source) => {
	console.log("Data has arrived: " + msg + ". Source port: " + source.port);
    let message = null;
    
    try {
        message = JSON.parse(msgBuffer.toString('utf8'))
    }
    catch( err ) {
        console.error("Could not parse received JSON data!");
        return;
    }
    
    // rejecting invalid messages
    if ( typeof message.uuid !== 'string' )
    {
        console.error("No UUID found in the message!");
        return;
    }
    if ( typeof message.sound !== 'string' )
    {
        console.error("No sound found in the message!");
        return;
    }
    
    let msgInstrument = instrumentFromSound.get( message.sound );
    
    if ( !msgInstrument )
    {
        console.error("Unknown sound received in the message!");
        return;
    }
    
    // looking for the musician in the ones we know so far
    let musician = activeMusicians.find( m => m.uuid === message.uuid );
    
    // checking if the musician exists
    if ( !musician )
    {
        console.log("A new musician sent a sound!");
        
        // creating the musician if it doesn't exist yet
        musician = {
            uuid: message.uuid,
            instrument: msgInstrument,
        };
    }
    // checking if the musician changed instrument
    else if ( musician.instrument !== msgInstrument )
    {
        console.error("A musician changed instrument! He cannot do that! >:(");
        return;
    }
    
    // setting the latest activity date
    musician.activeSince = dayjs().toISOString();
    
    console.log("Updated musician's latest activity datetime.");
    
    removeInactiveMusicians();
});


const tcpServer = net.createServer((tcpSocket) => {
    removeInactiveMusicians();
    tcpSocket.end( JSON.stringify( activeMusicians ) );
}).on('error', (err) => {
    throw err;
});

tcpServer.listen(2205, () => {
  console.log('Opened server on', server.address());
});