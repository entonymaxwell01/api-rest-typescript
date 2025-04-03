import { testSever } from "../jest.setup";

describe("Testando o método de criar uma cidade", () => {
  it("Deve criar uma cidade com sucesso", async () => {
    const res = await testSever.post("/cidades").send({
      nome: "São Paulo",
      estado: "São Paulo",
      pais: "Brasil",
    });

    expect(res.status).toEqual(201);
    expect(res.body.message).toBe("Cidade criada com sucesso");
    expect(res.body.validatedData);
    expect(res.body.validatedData).toEqual({
      nome: "São Paulo",
      estado: "São Paulo",
      pais: "Brasil",
    });
  });

  it("Deve retornar erro ao criar uma cidade com nome inválido", async () => {
    const res = await testSever.post("/cidades").send({
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

  it("Deve retornar erro ao criar uma cidade com estado inválido", async () => {
    const res = await testSever.post("/cidades").send({
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

  it("Deve retornar erro ao criar uma cidade com país inválido", async () => {
    const res = await testSever.post("/cidades").send({
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
