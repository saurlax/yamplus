export default defineEventHandler(async (event) => {
  event.node.res.setHeader('Content-Type', 'text/plain');
  return 'Hello, World!';
});