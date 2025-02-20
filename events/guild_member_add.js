const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Events, EmbedBuilder, ButtonBuilder, ComponentType, ButtonStyle, MessageFlags } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const { channels, roles, name } = member.guild;
        const { username } = member.user;
        const welcome_channel = await channels.cache.find((channel) => {return channel.name === 'welcome'}).fetch();
        const default_role = await roles.cache.find((role) => {return role.name === 'Junior Ally'});
        const new_member_username = username;
        const alliance_name = name;
        const modal_button = new ButtonBuilder()
                .setCustomId('modal_button')
                .setLabel('Welcome Modal')
                .setStyle(ButtonStyle.Primary);

        const welcome_modal = new ModalBuilder()
                .setCustomId('welcome_modal')
                .setTitle('Welcome Modal');

        const game_name_input = new TextInputBuilder()
                .setCustomId('game_name')
                .setLabel('AOEM User Name')
                .setPlaceholder('Enter your AOEM user name...')
                .setStyle(TextInputStyle.Short);
        const country_input = new TextInputBuilder()
                .setCustomId('country')
                .setLabel('Country')
                .setPlaceholder('Enter you contry...')
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
        const language_1_input = new TextInputBuilder()
                .setCustomId('language_1')
                .setLabel('Language 1')
                .setPlaceholder('required...')
                .setStyle(TextInputStyle.Short)
                .setRequired(true);
        const language_2_input = new TextInputBuilder()
                .setCustomId('language_2')
                .setLabel('Language 2')
                .setPlaceholder('optional...')
                .setStyle(TextInputStyle.Short)
        const time_zone_input = new TextInputBuilder()
                .setCustomId('time_zone')
                .setLabel('Time Zone')
                .setPlaceholder('format: UTC-12h or UTC+12:00...')
                .setStyle(TextInputStyle.Short)
                .setRequired(true)

        const welcome_embed = new EmbedBuilder()
                .setColor(0xcfeb34)
                .setTitle(`Welcome to ${alliance_name} Alliance.`)
                .setDescription('Click on the button below to continue.')
                // .addFields({name: '', value: ''})
                // .setTimestamp()
                .setFooter({text: 'Oracle'});

        const row = new ActionRowBuilder().addComponents(modal_button);
        const first_action_row = new ActionRowBuilder().addComponents(game_name_input);
        const second_action_row = new ActionRowBuilder().addComponents(country_input);
        const tird_action_row = new ActionRowBuilder().addComponents(language_1_input);
        const forth_action_row = new ActionRowBuilder().addComponents(language_2_input);
        const fifth_action_row = new ActionRowBuilder().addComponents(time_zone_input);
        welcome_modal.addComponents(
            first_action_row,
            second_action_row,
            tird_action_row,
            forth_action_row,
            fifth_action_row
        );
        try {
            // await member.roles.add(default_role)
            const mensage = await welcome_channel.send({ embeds: [welcome_embed] , components:[row], flags: MessageFlags.Ephemeral });
            const filter = i => i.customId === 'modal_button' && i.user.id === member.id;
            const collector = mensage.createMessageComponentCollector({filter: filter, componentType: ComponentType.Button, time:120_000 })
            collector.on('collect', async (i) => {
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
