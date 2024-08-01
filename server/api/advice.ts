import { ChatCompletion } from "@baiducloud/qianfan";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = new ChatCompletion();
  const resp = await client.chat({
    messages: [{
      role: 'user',
      content: '你是智能山药水肥管理建议系统，请根据下面的气象资料，给出具体的山药种植水肥管理建议报告。不要有其他辅助文字：' + JSON.stringify(body),
    }],
  }, 'ERNIE-Speed-128K');
  return resp.result;
});