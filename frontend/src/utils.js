export const initWebsocket = (ws, setResponse, sendJsonOnOpen) => {
  ws.onopen = () => {
    ws.send(JSON.stringify(sendJsonOnOpen));
    console.log("Connection Established!");
  };
  ws.onmessage = (event) => {
    const response = JSON.parse(event.data);
    setResponse(response);
  };
  ws.onclose = () => {
    console.log("Connection Closed!");
  };

  ws.onerror = () => {
    console.log("WS Error");
  };
};
