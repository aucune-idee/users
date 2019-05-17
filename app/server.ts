// lib/server.ts
import app from "./app";
import configuration from "./config";

/*process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error);
});*/

app.listen(configuration.port, () => {
    console.log('Express server listening on port ' + configuration.port);
})