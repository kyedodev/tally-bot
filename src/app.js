import express from 'express';
import pdenv from 'pdenv';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { verify, request, registerCommand } from './util.js';



pdenv.config();
const { TOKEN, APP_ID, PUBLIC_KEY, GUILD_ID } = process.pdenv;

const app = express();



app.use(express.json({ verify : verify(PUBLIC_KEY) }));

app.post('/interactions', function(req, res)
{
    const { type, data } = req.body;

    switch(type)
    {
        case InteractionType.PING:
            return res.send({ type: InteractionResponseType.PONG });
        case InteractionType.APPLICATION_COMMAND:
            const { name } = data;

            switch(name)
            {
                case 'test':
                    return res.send(
                    {
                        type : InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data :
                        {
                            content : 'Test message. YIPPEE!!!',
                        },
                    });
            }
    }
});



async function registerCommands()
{
    const endpoint = `applications/${APP_ID}/guilds/${GUILD_ID}/commands`;

    registerCommand(endpoint,
    {   name        : 'test',
        description : 'Testing command.',
        type        : 1,
    });
}



app.listen(3000, function() {
    console.log(`Listening on port ${this.address().port}.`);
    registerCommands();
});