var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

var aWss = expressWs.getWss('/');


app.ws('/', function(ws, req) {
  
  ws.on('message', function(data) {
    obj = JSON.parse(data);
    body = {
      sensor_id : obj.sensor_id,
      temperatura: parseInt(obj.data.temperature) - 2,
      humedad: parseInt(obj.data.humidity),
      created_at: new Date()
    }
    console.log(body);
    //TODO: Insertar en base de datos
  });

  //Compartir mensaje
  ws.onmessage = function(data) {
    obj = JSON.parse(data.data);
    
    body = {
      sensor_id : obj.sensor_id,
      temperatura: parseInt(obj.data.temperature) - 2,
      humedad: parseInt(obj.data.humidity),
      created_at: new Date()
    };

    res = JSON.stringify(body);
    
    aWss.clients.forEach(function (client) {
      if (client != ws) {
        client.send(res);
      }
    });

  };

});
 
app.listen(3000);