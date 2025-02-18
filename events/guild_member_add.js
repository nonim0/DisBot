const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Events, EmbedBuilder, ButtonBuilder, ComponentType, ButtonStyle, MessageFlags } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const { channels, roles } = member.guild;
        const { username } = member.user;
        const welcome_channel = await channels.cache.find((channel) => {return channel.name === 'welcome'}).fetch();
        const default_role = await roles.cache.find((role) => {return role.name === 'Junior Ally'});
        const new_member_username = username;
        const modal_button = new ButtonBuilder()
                .setCustomId('modal_button')
                .setLabel('Welcome Modal')
                .setStyle(ButtonStyle.Primary);

        const welcome_modal = new ModalBuilder()
                .setCustomId('welcome_modal')
                .setTitle('Welcome Modal');

        const game_name_input = new TextInputBuilder()
                .setCustomId('game_name')
                .setLabel('Whats your AOEM User Name')
                .setStyle(TextInputStyle.Short);

        const welcome_embed = new EmbedBuilder()
                .setColor(0xcfeb34)
                .setTitle(`Welcome to [1EM]OneEmpire Alliance [1EM]${new_member_username}.`)
                .setDescription('Here are some helpful recommendations:')
                .addFields(
                    {name: '🧭 Relocate:', value: 'Relocate near alliance territory/stronghold.', inline: true},
                    {name: '♻️ Donate:', value: 'Minimum 10 daily donations to alliance technology.', inline: true}
                )
                .addFields({name: '📈 Grow:', value: 'Concentrate on dailies, gathering L4/higher(when available) resources and alliance mine at the moment, set builds and army growth. Attack common tribes regularly to gain EXP books, alliance founds, and more.'})
                // .setTimestamp()
                .setFooter({text: 'Leader'});

        const row = new ActionRowBuilder().addComponents(modal_button);
        const first_action_row = new ActionRowBuilder().addComponents(game_name_input);
        welcome_modal.addComponents(first_action_row)
        try {
            // await member.roles.add(default_role)
            // await welcome_channel.send({ embeds:[welcome_embed]})
            const mensage = await welcome_channel.send({ content:'welcome and click', components:[row], flags: MessageFlags.Ephemeral });
            const filter = i => i.customId === 'modal_button' && i.user.id === member.id;
            const collector = mensage.createMessageComponentCollector({filter: filter, componentType: ComponentType.Button, time:15_000 })
            collector.on('collect', async (i) => {
                // console.log(i.customId)
                if (i.customId === 'modal_button') {
                    try {
                        await i.showModal(welcome_modal)
                    } catch (error) {
                        console.log(error)
                    }
                };
            });
            collector.on('end', async (collected) => {console.log(`collected ${collected.size} interactions.`)});
        } catch(error){console.error(error)};
        
    }
};
