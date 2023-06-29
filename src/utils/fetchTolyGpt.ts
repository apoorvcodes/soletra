import axios from "axios"
import { TOLYGPT_URL } from "../constant.js"
export async function fetchResponse(question: string): Promise<string | undefined> {
const resp = await fetch(TOLYGPT_URL, {
    method: "POST",
    body: JSON.stringify({
        "question": question
    })
})
const data = await resp.body?.getReader()
const stream = await data?.read();
while (true) {

    if (stream?.done) {
      break;
    }

    const data = new TextDecoder().decode(stream?.value);
    console.log(data);
    // Do something with the received data
  }
console.log(stream?.value?.toString(), stream?.done )
return undefined
}