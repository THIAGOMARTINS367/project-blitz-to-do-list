import app from './app';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});

export default server;
