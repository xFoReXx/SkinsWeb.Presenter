import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const [ws, setWs] = useState(null);

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:6060');
		setWs(socket);

		socket.onmessage = event => {
			setMessages(prev => [...prev, event.data]);
		};

		socket.onclose = () => {
			console.log('WebSocket zamknięty');
		};

		return () => {
			socket.close();
		};
	}, []);

	const sendMessage = () => {
		if (ws && input) {
			ws.send(input);
			setInput('');
		}
	};

	return (
		<div style={{ padding: 20 }}>
			<h2>WebSocket Chat</h2>
			<div style={{ border: '1px solid #ccc', padding: 10, minHeight: 100 }}>
				{messages.map((msg, index) => (
					<div key={index}>{msg}</div>
				))}
			</div>
			<input type="text" value={input} onChange={e => setInput(e.target.value)} style={{ marginTop: 10, padding: 5 }} />
			<button onClick={sendMessage} style={{ marginLeft: 5 }}>
				Wyślij
			</button>
      <p>Test</p>
		</div>
    
	);
}

export default App;
