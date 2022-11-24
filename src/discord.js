// trans rights, black lives matter, slava ukraini.
// kye cedar >:3c

import { REST, Routes, Events,
         Client, IntentsBitField } from 'discord.js';
import { commands } from './commands.js';



const rest = new REST({ version : '10' });



const intents = (new IntentsBitField(
[   "Guilds",
    "GuildInvites",
    "GuildMessages",
    "GuildMessageTyping",
    "GuildMessageReactions",
    "GuildScheduledEvents",
])).freeze();

const client = new Client({ intents });



client.once(Events.ClientReady, () =>
{   console.log(`Bot active as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async ( interaction ) =>
{   if(interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    const fn = commands.functions[commandName];

    if(fn) fn(interaction);
});



export function login( token, app_id, guild_id )
{   client.login(token);
    rest.setToken(token);

    // register slash commands.
    (async () =>
    {   try
        {   console.log(`Started refreshing ${commands.rest.length} application (/) commands.`);

            // refresh all commands.
            const data = await rest.put(
                Routes.applicationCommands(app_id),
                { body : commands.rest },
            );

            console.log(`Successfully refreshed ${data.length} application (/) commands.`);
        }
        catch(err)
        {   console.error('Error registering commands. ', err);
        }
    })();
}