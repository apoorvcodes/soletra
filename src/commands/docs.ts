import { Pagination } from "@discordx/pagination";
import type { CommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class DocsSlash {
  // example: pagination for all slash command
  @Slash({
    description: "Fetch docs frm tolygpt",
    name: "docs",
  })
  async pages( 
    @SlashOption({
        description: "Query you wanna get frm gpt model",
        name: "msg",
        required: true,
        type: ApplicationCommandOptionType.String,
      })
      msg: string,
    interaction: CommandInteraction): Promise<void> {
    interaction.reply(msg)
  }
}