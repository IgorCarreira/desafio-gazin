import fastify, { FastifyInstance } from "fastify";
import { updateLevel } from "../patch-level";
import { prisma } from "../../../../lib/prisma";

jest.mock("../../../../lib/prisma", () =>
  require("../../../../__mocks__/prisma")
);

describe("PATCH /api/niveis/:id", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(updateLevel);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve atualizar um nível com sucesso", async () => {
    const levelId = 1;
    const updatedData = { nivel: "Senior" };

    (prisma.nivel.update as jest.Mock).mockResolvedValue({
      id: levelId,
      ...updatedData,
    });

    const response = await app.inject({
      method: "PATCH",
      url: `/api/niveis/${levelId}`,
      payload: updatedData,
    });

    const responseBody = response.json();

    expect(response.statusCode).toBe(200);
    expect(responseBody).toEqual({
      id: levelId,
      nivel: "Senior",
    });
  });

  it("deve retornar erro 400 se o ID for inválido", async () => {
    const response = await app.inject({
      method: "PATCH",
      url: "/api/niveis/abc",
      payload: { nivel: "Senior" },
    });

    expect(response.statusCode).toBe(400);
  });

  it("deve retornar erro 400 em caso de falha no Prisma", async () => {
    const levelId = 1;
    const updatedData = { nivel: "Senior" };

    (prisma.nivel.update as jest.Mock).mockRejectedValue(
      new Error("Prisma error")
    );

    const response = await app.inject({
      method: "PATCH",
      url: `/api/niveis/${levelId}`,
      payload: updatedData,
    });

    expect(response.statusCode).toBe(400);
  });
});
