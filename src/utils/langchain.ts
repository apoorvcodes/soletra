  //Import the PromptTemplate module
  import { PromptTemplate } from "langchain/prompts";
  import { OpenAI } from "langchain/llms";
 import {GoogleCustomSearch} from "langchain/tools"
  import { initializeAgentExecutorWithOptions } from "langchain/agents";

  export const gptrun = async () => {
      //Create the template. The template is actually a "parameterized prompt". A "parameterized prompt" is a prompt in which the input parameter names are used and the parameter values are supplied from external input 
      const template = "who won the fifa world cup of year {product}?";
      const model = new OpenAI({ temperature: 0.9 });

      //Instantiate "PromptTemplate" passing the prompt template string initialized above and a list of variable names the final prompt template will expect
      const prompt = new PromptTemplate({ template, inputVariables: ["product"] });

      const executor = await initializeAgentExecutorWithOptions(
        [new GoogleCustomSearch()],
        model,
        { agentType: "chat-zero-shot-react-description", verbose: true }
        );


      //Create a new prompt from the combination of the template and input variables. Pass the value for the variable name that was sent in the "inputVariables" list passed to "PromptTemplate" initialization call
      const res = await prompt.format({ product: "2022" });
      const resp = await executor.call({input: res.toString()});
    console.log({ res });
    console.log(resp)
  };

 
