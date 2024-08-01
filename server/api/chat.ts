import { ChatCompletion } from "@baiducloud/qianfan";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = new ChatCompletion();
  const resp = await client.chat({
    messages: [{
      role: 'user',
      content: body.question,
    }],
  }, 'ERNIE-Speed-128K');
  return resp.result;
});