import express from 'express';
import pdenv from 'pdenv';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { verify, request } from './util.js';



pdenv.config();
const app = express();



app.use(express.json({ verify : verify(process.pdenv.PUBLIC_KEY) }));

app.post('/interactions', function(req, res)
{
    const { type, data } = req.body;

    if(type === InteractionType.APPLICATION_COMMAND)
    {
        if(data.name === 'test')
        {
            return res.send(
            {
                type : InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data : { content : 'Test message. YIPPEE!!!' },
            });
        }
    }
});



async function createCommand()
{
    const endpoint = `applications/${process.pdenv.APP_ID}/commands`;
    const body     =
    {
        name        : 'test',
        description : 'Testin commd.',
        type        : 1,
    };

    try
    {
        const res = await request(endpoint, { method : 'POST', body });
        console.log(await res.json());
    }
    catch(err)
    {
        console.error('Error installing commands: ', err);
    }
}



app.listen(3000, function() {
    console.log(`Listening on port ${this.address().port}.`);
    createCommand();
});