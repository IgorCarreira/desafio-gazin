import fastify, { FastifyInstance } from "fastify";
import { createLevel } from "../create-level";
import { prisma } from "../../../../lib/prisma";

jest.mock("../../../../lib/prisma", () =>
  require("../../../../__mocks__/prisma")
);

describe.only("POST /api/niveis", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(createLevel);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar um nível com sucesso", async () => {
    const mockedLevel = { id: 1, nivel: "Senior" };

    (prisma.nivel.create as jest.Mock).mockResolvedValue(mockedLevel);

    const response = await app.inject({
      method: "POST",
      url: "/api/niveis",
      payload: { nivel: "Senior" },
    });

    const responseBody = response.json();

    expect(response.statusCode).toBe(201);
    expect(responseBody).toEqual(mockedLevel);
  });

  it("deve retornar erro 400 para dados inválidos", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/niveis",
      payload: {},
    });

    expect(response.statusCode).toBe(400);
  });

  it("deve retornar erro 400 em caso de falha no Prisma", async () => {
    (prisma.nivel.create as jest.Mock).mockRejectedValue(
      new Error("Prisma error")
    );

    const response = await app.inject({
      method: "POST",
      url: "/api/niveis",
      payload: { nivel: "Senior" },
    });

    expect(response.statusCode).toBe(400);
  });
});
