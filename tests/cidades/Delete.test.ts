import { testSever } from "../jest.setup";

describe("Testando o método de excluir uma cidade", () => {
  it("Deve excluir uma cidade com sucesso", async () => {
    const res = await testSever.delete("/cidades/1").send();

    expect(res.status).toEqual(200);
    expect(res.body.message).toBe("Cidade excluida");
  });
});

it("Deve retornar erro ao tentar passar um id inválido ", async () => {
  const res = await testSever.delete("/cidades/teste").send();

  expect(res.status).toEqual(400);
  expect(res.body).toHaveProperty("errors.params.id");
  expect(res.body.errors.params).toEqual({
    id: "Formato digitado é invalido",
  });
});
