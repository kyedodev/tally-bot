import fetch from 'node-fetch';
import { verifyKey } from 'discord-interactions';



export function verify( client_key )
{
    return function(req, res, buf, encoding)
    {
        const signature = req.get('X-Signature-Ed25519');
        const timestamp = req.get('X-Signature-Timestamp');

        const valid = verifyKey(buf, signature, timestamp, client_key );

        if(!valid)
        {
            res.status(401).send('Bad request signature.');
            throw new Error('Bad request signature.');
        }
    };
}



export async function request( endpoint, options )
{
    const url = 'https://discord.com/api/v10/' + endpoint;

    options.body = ( options.body ? JSON.stringify(options.body) : options.body);

    const res = await fetch(url,
    {
        headers: {
            Authorization  : `Bot ${process.pdenv.TOKEN}`,
            'Content-Type' : 'application/json; charset=UTF-8',
            'User-Agent'   : `DiscordBot (https://github.com/kyedodev/tally-bot, 0.0.1)`, // TODO, get version from package.json later
        },
        ...options
    });

    // throw api errors.
    if(!res.ok)
    {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }

    return res;
}

export async function registerCommand( endpoint, body )
{
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