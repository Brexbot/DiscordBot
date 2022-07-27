import { User } from 'discord.js'
import { Client, Discord, Guard, SimpleCommand, SimpleCommandMessage, SimpleCommandOption } from 'discordx'
import { IsSuperUser, memberIsSU } from '../../guards/RoleChecks'

@Discord()
@Guard(IsSuperUser)
class ReleaseTheEggplant {
  @SimpleCommand('releasetheeggplant', {
    description: 'Release the eggplant on a user of your choosing',
    argSplitter: '\n',
  })
  simple(@SimpleCommandOption('name') name: User, command: SimpleCommandMessage, client: Client) {
    if (!name) return command.message.reply('usage: ``>releasetheeggplant <user>``')
    const botId = client.user?.id
    const thisBot = command.message.guild?.members.cache.find((u) => u.id === botId)
    thisBot?.setNickname('🍆🔪')
    command.message.channel
      .send(`I'm coming for you, ${name}!`)
      .then((_) => {
        setTimeout(() => thisBot?.setNickname(null), 5000)
      })
      .catch(console.error)
  }

  // TODO: Lock behind mod permissions
  // @Slash('releasetheeggplant', {
  //   description: 'Release the eggplant on a user of your choosing',
  //   defaultMemberPermissions: PermissionFlagsBits.ModerateMembers,
  // })
  // async slash(
  //   @SlashOption('name')
  //   name: User,
  //   interaction: ChatInputCommandInteraction
  // ) {
  //   const botId = interaction.channel?.client.user?.id
  //   const thisBot = interaction.guild?.members.cache.find((u) => u.id === botId)
  //   thisBot?.setNickname('🍆🔪')
  //   interaction
  //     .reply(`I'm coming for you, ${name}!`)
  //     .then((_) => {
  //       setTimeout(() => thisBot?.setNickname(null), 5000)
  //     })
  //     .catch(console.error)
  // }
}
