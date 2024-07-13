import createDebug from 'debug';
import 'dotenv/config';
import { createServer } from 'http';
import { createApp, startApp } from './app.js';
import { dbConnect } from './tools/db.connect.js';



const debug = createDebug('TFD:server');
debug('Starting server');

const port = process.env.PORT ?? 7373;

const app = createApp();
const server = createServer(app);

dbConnect().then((prisma) => {
  startApp(app, prisma);
  server.listen(port)
}).catch((error) => {
  server.emit(error)
})


server.on("error", (error) => {
  debug('Error:', error);
  process.exit(1);
})

server.on('listening', () => {
  debug(`Server express running on port ${port}`);
});


