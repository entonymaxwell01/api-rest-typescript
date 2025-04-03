import { testSever } from "../jest.setup";

describe("Testando o método de atualizar dados de uma cidade", () => {
  it("Deve atualizar dados de uma cidade com sucesso", async () => {
    const res = await testSever.put("/cidades/1").send({
      nome: "São Paulo",
      estado: "São Paulo",
      pais: "Brasil",
    });

    expect(res.status).toEqual(200);
    expect(res.body.message).toBe("Cidade atualizada");
  });

  it("Deve retornar erro ao tentar atualizar os dados de uma cidade com id inválido", async () => {
    const res = await testSever.put("/cidades/teste").send({
      nome: "São Paulo",
      estado: "São Paulo",
      pais: "Brasil",
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors.params.id");
    expect(res.body.errors.params).toEqual({
      id: "Formato digitado é invalido",
    });
  });

  it("Deve retornar erro ao tentar atualizar os dados de uma cidade com nome inválido", async () => {
    const res = await testSever.put("/cidades/1").send({
      nome: "SP",
      estado: "São Paulo",
      pais: "Brasil",
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors.body.nome");
    expect(res.body.errors.body).toEqual({
      nome: "Deve ter pelo menos 3 caracteres",
    });
  });

  it("Deve retornar erro ao tentar atualizar os dados de uma cidade com estado inválido", async () => {
    const res = await testSever.put("/cidades/1").send({
      nome: "São Paulo",
      estado: "SP",
      pais: "Brasil",
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors.body.estado");
    expect(res.body.errors.body).toEqual({
      estado: "Deve ter pelo menos 3 caracteres",
    });
  });

  it("Deve retornar erro ao tentar atualizar os dados de uma cidade com país inválido", async () => {
    const res = await testSever.put("/cidades/1").send({
      nome: "São Paulo",
      estado: "São Paulo",
      pais: "BR",
    });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors.body.pais");
    expect(res.body.errors.body).toEqual({
      pais: "Deve ter pelo menos 3 caracteres",
    });
  });
});
