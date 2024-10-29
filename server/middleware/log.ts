export default defineEventHandler(async (event) => {
  console.log('Acessando: ' + getRequestURL(event));
});

