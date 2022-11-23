// trans rights, black lives matter, slava ukraini.
// kye cedar >:3c

exports.commands =
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