const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


app.use(bodyParser.json());

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.post('/notify', (req, res) => {
    const message = req.body.message;


    // Broadcast the message to all connected WebSocket clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });

    res.sendStatus(200);
});

server.listen(3001, () => {
    console.log('WebSocket server running on http://localhost:3001');
});
