import { Discord, SimpleCommand, SimpleCommandMessage, SimpleCommandOption, SimpleCommandOptionType } from 'discordx'

@Discord()
class Winter {
  @SimpleCommand({ name: 'winter', description: 'Winter', argSplitter: '\n' })
  async simple(
    @SimpleCommandOption({ name: 'text', type: SimpleCommandOptionType.String }) text: string | undefined,
    command: SimpleCommandMessage
  ) {
    let content
    if (text) {
      content = `${text}? Estrogen can help with that`
    } else {
      content = 'Estrogen can help with that'
    }

    await command.message.channel.send({
      content: content,
    })
    return
  }
}
