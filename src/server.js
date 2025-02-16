const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 6060 });

wss.on('connection', ws => {
	console.log('Nowe połączenie WebSocket');

	ws.on('message', message => {
		console.log(`Otrzymano: ${message}`);
		ws.send(`Echo: ${message}`);
	});

	ws.on('close', () => console.log('Połączenie zamknięte'));
});

console.log('Serwer WebSocket działa na ws://localhost:8080');
