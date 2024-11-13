import fastify, { FastifyInstance } from "fastify";
import { deleteLevel } from "../delete-level";
import { prisma } from "../../../../lib/prisma";

jest.mock("../../../../lib/prisma", () =>
  require("../../../../__mocks__/prisma")
);

describe("DELETE /api/niveis/:id", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(deleteLevel);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve remover um nível com sucesso", async () => {
    const levelId = 1;

    (prisma.nivel.delete as jest.Mock).mockResolvedValue({});

    const response = await app.inject({
      method: "DELETE",
      url: `/api/niveis/${levelId}`,
    });

    expect(response.statusCode).toBe(204);
    expect(response.body).toBe("");
  });

  it("deve retornar erro 400 se o ID for inválido", async () => {
    const response = await app.inject({
      method: "DELETE",
      url: "/api/niveis/abc",
    });

    expect(response.statusCode).toBe(400);
  });

  it("deve retornar erro 400 em caso de falha no Prisma", async () => {
    const levelId = 1;

    (prisma.nivel.delete as jest.Mock).mockRejectedValue(
      new Error("Prisma error")
    );

    const response = await app.inject({
      method: "DELETE",
      url: `/api/niveis/${levelId}`,
    });

    expect(response.statusCode).toBe(400);
  });
});
