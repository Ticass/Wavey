const services = {

        onWebSocketMessage: (message, callback) => {
             // Set up WebSocket connection
        const ws = new WebSocket('ws://localhost:3001');

        ws.onmessage = (event) => {
            console.log("WEBSOCKET EVENT: ", event)
            const incomingMessage = event.data
            if (incomingMessage === message) {
                callback();
            }
        };

        return () => {
            ws.close();
        };
    }
}

export default services
