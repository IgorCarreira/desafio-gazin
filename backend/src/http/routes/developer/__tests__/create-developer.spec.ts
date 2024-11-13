import fastify, { FastifyInstance } from "fastify";
import { prisma } from "../../../../lib/prisma";
import { createDeveloper } from "../create-developer";

jest.mock("../../../../lib/prisma", () =>
  require("../../../../__mocks__/prisma")
);

describe("POST /api/desenvolvedores", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(createDeveloper);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar um desenvolvedor com sucesso", async () => {
    const developerData = {
      nivel_id: 1,
      nome: "João Silva",
      sexo: "M",
      data_nascimento: "1990-05-15",
      hobby: "Programar",
    };

    (prisma.desenvolvedor.create as jest.Mock).mockResolvedValue({
      id: 1,
      ...developerData,
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/desenvolvedores",
      payload: developerData,
    });

    const responseBody = response.json();

    expect(response.statusCode).toBe(201);
    expect(responseBody).toEqual({
      id: 1,
      ...developerData,
    });
  });

  it("deve retornar erro 400 se os dados forem inválidos", async () => {
    const invalidData = {
      nivel_id: "invalid_id",
      nome: 12345,
      sexo: "M",
      data_nascimento: "1990-05-15",
      hobby: "Programar",
    };

    const response = await app.inject({
      method: "POST",
      url: "/api/desenvolvedores",
      payload: invalidData,
    });

    expect(response.statusCode).toBe(400);
  });

  it("deve retornar erro 400 em caso de falha no Prisma", async () => {
    const developerData = {
      nivel_id: 1,
      nome: "João Silva",
      sexo: "M",
      data_nascimento: "1990-05-15",
      hobby: "Programar",
    };

    (prisma.desenvolvedor.create as jest.Mock).mockRejectedValue(
      new Error("Prisma error")
    );

    const response = await app.inject({
      method: "POST",
      url: "/api/desenvolvedores",
      payload: developerData,
    });

    expect(response.statusCode).toBe(400);
  });
});
