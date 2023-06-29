  //Import the PromptTemplate module
  import { PromptTemplate } from "langchain/prompts";
  import { OpenAI } from "langchain/llms";
 import {GoogleCustomSearch} from "langchain/tools"
  import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";

  export const gptrun = async () => {
      //Create the template. The template is actually a "parameterized prompt". A "parameterized prompt" is a prompt in which the input parameter names are used and the parameter values are supplied from external input 
      const template = `{question}?`;
      const model = new OpenAI({ temperature: 0.9, modelName: "gpt-3.5-turbo", verbose: true});

      //Instantiate "PromptTemplate" passing the prompt template string initialized above and a list of variable names the final prompt template will expect
      const prompt = new PromptTemplate({ template, inputVariables: ["question", "format"] });

      const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
        llm: model,
        tools: [new GoogleCustomSearch()],
      });


      //Create a new prompt from the combination of the template and input variables. Pass the value for the variable name that was sent in the "inputVariables" list passed to "PromptTemplate" initialization call
      const res = await prompt.format({ question: "Who is the current president of the United States? What is their current age raised to the second power?", format: "theory format" });
      const resp = await executor.call({input: res.toString()});
    console.log({ res });
    console.log(resp)
  };

 
