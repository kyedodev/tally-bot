// trans rights, black lives matter, slava ukraini.
// kye cedar >:3c

const commands =
{   rest :
    [
        {   name        : 'ping',
            description : 'Replies with "Pong!"'
        }
    ],
    functions :
    {   'ping': async ( interaction ) =>
        {   await interaction.reply('Pong!');
        },
    },
};



export { commands };