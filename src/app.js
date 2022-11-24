// trans rights, black lives matter, slava ukraini.
// kye cedar >:3c

import pdenv from 'pdenv';

pdenv.config();
const { TOKEN, APP_ID, PUBLIC_KEY, GUILD_ID, PORT } = process.pdenv;



import { login } from './discord.js';
import express from './express.js';

const app = express();



login(TOKEN);



// app.listen();