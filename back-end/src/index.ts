import app from './app';

const PORT: number = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, (): void => {
  console.log(`Online na porta ${PORT}`);
});

export default server;
