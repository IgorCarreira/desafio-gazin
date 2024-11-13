import fastify, { FastifyInstance } from "fastify";
import { prisma } from "../../../../lib/prisma";
import { listDevelopers } from "../list-developers";

jest.mock("../../../../lib/prisma", () =>
  require("../../../../__mocks__/prisma")
);

describe("GET /api/desenvolvedores", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(listDevelopers);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve listar desenvolvedores com sucesso", async () => {
    const developers = [
      {
        id: 1,
        nome: "João Silva",
        sexo: "M",
        data_nascimento: new Date("1990-05-15"),
        hobby: "Programar",
        nivel: { id: 1, nivel: "Júnior" },
      },
    ];

    (prisma.desenvolvedor.findMany as jest.Mock).mockResolvedValue(developers);
    (prisma.desenvolvedor.count as jest.Mock).mockResolvedValue(
      developers.length
    );

    const response = await app.inject({
      method: "GET",
      url: "/api/desenvolvedores",
    });

    const responseBody = response.json();

    expect(response.statusCode).toBe(200);
    expect(responseBody.data).toHaveLength(1);
    expect(responseBody.data[0].idade).toBe(
      new Date().getFullYear() -
        new Date(developers[0].data_nascimento).getFullYear()
    );
    expect(responseBody.meta).toEqual({
      total: developers.length,
      per_page: 10,
      current_page: 1,
      last_page: 1,
    });
  });

  it("deve filtrar desenvolvedores por nome", async () => {
    const developers = [
      {
        id: 1,
        nome: "João Silva",
        sexo: "M",
        data_nascimento: new Date("1990-05-15"),
        hobby: "Programar",
        nivel: { id: 1, nivel: "Júnior" },
      },
    ];

    (prisma.desenvolvedor.findMany as jest.Mock).mockResolvedValue(developers);
    (prisma.desenvolvedor.count as jest.Mock).mockResolvedValue(
      developers.length
    );

    const response = await app.inject({
      method: "GET",
      url: "/api/desenvolvedores?nome=João",
    });

    const responseBody = response.json();

    expect(response.statusCode).toBe(200);
    expect(responseBody.data).toHaveLength(1);
    expect(responseBody.data[0].nome).toBe("João Silva");
  });

  it("deve retornar erro 400 se os parâmetros de filtro forem inválidos", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/desenvolvedores?current_page=-1&per_page=200",
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().message).toBe("Erro ao listar desenvolvedores.");
  });
});
