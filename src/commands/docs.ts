import { Pagination } from "@discordx/pagination";
import type { CommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { fetchResponse } from "../utils/fetchTolyGpt.js";
import path from "path"
import { OpenAIEmbeddings } from "langchain/embeddings";
import { HNSWLib } from "langchain/vectorstores";
import { makeChain } from "../utils/llm.js";
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
      const dir = path.resolve(process.cwd(), "data");

      const vectorstore = await HNSWLib.load(dir, new OpenAIEmbeddings());
      const chain = makeChain(vectorstore);

      try {
      const res =   await chain.call({
          question: msg,
          chat_history: [],
        });
        console.log(res.text)
        interaction.reply(res.text)
      } catch (err) {
        console.error(err);
      }

    interaction.reply(msg)
  }
}
