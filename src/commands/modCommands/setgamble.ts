import {
  Discord,
  Guard,
  SimpleCommand,
  SimpleCommandMessage,
  SimpleCommandOption,
  SimpleCommandOptionType,
} from 'discordx'
import { Prisma } from '../../../prisma/generated/prisma-client-js'
import { injectable } from 'tsyringe'
import { ORM } from '../../persistence'
import { IsSuperUser } from '../../guards/RoleChecks'

@Discord()
@injectable()
@Guard(IsSuperUser)
class SetGamble {
  public constructor(private client: ORM) {}

  @SimpleCommand({ name: 'gamblechance' })
  async simpleGambleChance(
    @SimpleCommandOption({ name: 'gamblechance', description: 'Gample chance', type: SimpleCommandOptionType.String })
    gambleChance: number,
    command: SimpleCommandMessage
  ) {
    const guildId = command.message.guildId ?? '-1'
    if (!isNaN(gambleChance) && gambleChance >= 0) {
      const newChance = new Prisma.Decimal(gambleChance).toDecimalPlaces(2)

      // TODO: Fix types
      await this.client.guildOptions
        .update({
          where: { guildId: guildId },
          data: { gambleChance: newChance },
        })
        .then((_) => command.message.channel.send(`Gamble chance is now ${newChance}`))
    } else {
      const guildOptions = await this.client.guildOptions.upsert({
        where: { guildId: guildId },
        create: { guildId: guildId },
        update: {},
      })
      command.message.channel.send(`Current gamble chance is: ${guildOptions.gambleChance.toDecimalPlaces(2)}`)
    }
  }
}
