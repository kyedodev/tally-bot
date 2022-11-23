// trans rights, black lives matter, slava ukraini.
// kye cedar >:3c

import pdenv from 'pdenv';

pdenv.config();
const { TOKEN, APP_ID, PUBLIC_KEY, GUILD_ID, PORT } = process.pdenv;



import { registerCommands, login } from './discord.js';
import './express.js';



registerCommands();
login(TOKEN);



app.listen(PORT, function()
{   console.log(`Listening on port ${this.address().port}.`);
});