// lib/server.ts
import app from "./app";
import configuration from "./config";

app.listen(configuration.port, () => {
    console.log('Express server listening on port ' + configuration.port);
})