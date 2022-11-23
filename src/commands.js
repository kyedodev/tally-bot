// trans rights, black lives matter, slava ukraini.
// kye cedar >:3c

import { SlashCommandBuilder as Command } from 'discord.js';



const commands =
{   rest :
    [   {   name        : 'ping',
            description : 'Ping-pong command.',
        },
    ],
    functions :
    {   'ping': async ( interaction ) =>
        {   await interaction.reply('Pong!');
        },
    },
};



export { commands };