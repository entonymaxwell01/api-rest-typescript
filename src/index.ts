import { server } from "./server/Server";
const PORT = process.env.PORT || 3030;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
