import { testSever } from "../jest.setup";

describe("Testando o método de buscar todas as cidades", () => {
  it("Deve buscar todas as cidades com sucesso", async () => {
    const res = await testSever.get("/cidades/").send();

    expect(res.status).toEqual(200);
    expect(res.body.message).toBe("Cidades");
  });

  it("Deve buscar todas as cidades com query com sucesso  ", async () => {
    const res = await testSever.get("/cidades/").query({
      page: 1,
      limit: 10,
      filter: "São Paulo",
    });

    expect(res.status).toEqual(200);
    expect(res.body.message).toBe("Cidades");
  });

  it("Deve retornar erro ao tentar passar uma query inválida ", async () => {
    const res = await testSever.get("/cidades/").query({
      page: 0,
      limit: 10,
      filter: "São Paulo",
    });

    expect(res.status).toEqual(400);
    expect(res.body.errors.query).toEqual({
      page: "Deve ser maior que 0",
    });
  });
});
