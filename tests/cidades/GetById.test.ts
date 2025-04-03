import { testSever } from "../jest.setup";

describe("Testando o método de buscar um única cidade", () => {
  it("Deve buscar um cidade com sucesso", async () => {
    const res = await testSever.get("/cidades/1").send();

    expect(res.status).toEqual(200);
    expect(res.body.message).toBe("Cidades");
  });

  it("Deve retornar erro ao tentar passar um id inválido ao buscar uma única cidade", async () => {
    const res = await testSever.get("/cidades/teste").send();

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors.params.id");
    expect(res.body.errors.params).toEqual({
      id: "Formato digitado é invalido",
    });
  });
});
