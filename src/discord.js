// trans rights, black lives matter, slava ukraini.
// kye cedar >:3c

import { REST, Routes,
         Client, IntentsBitField } from 'discord.js';
import { commands } from './commands.js';



const rest = new REST({ version : '10' }).setToken(process.pdenv.TOKEN);



export async function registerCommands()
{
    try
    {   console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.pdenv.APP_ID), { body : commands.rest });
    }
    catch(err)
    {   console.error('Error registering commands. ', err);
    }
}



const intents = (new IntentsBitField(
[   "Guilds",
    "GuildInvites",
    "GuildMessages",
    "GuildMessageTyping",
    "GuildMessageReactions",
    "GuildScheduledEvents",
])).freeze();

const client = new Client({ intents });



client.on('ready', () =>
{   console.log(`Bot active as ${client.user.tag}`);
});

client.on('interactionCreate', async ( interaction ) =>
{   if(interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    const fn = commands.functions[commandName];

    if(fn) fn(interaction);
});



export function login( token )
{   return client.login(token);
}