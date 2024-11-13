import fastify, { FastifyInstance } from "fastify";
import { prisma } from "../../../../lib/prisma";
import { deleteDeveloper } from "../delete-developer";

jest.mock("../../../../lib/prisma", () =>
  require("../../../../__mocks__/prisma")
);

describe("DELETE /api/desenvolvedores/:id", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(deleteDeveloper);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve remover um desenvolvedor com sucesso", async () => {
    const developerId = 1;

    (prisma.desenvolvedor.delete as jest.Mock).mockResolvedValue({
      id: developerId,
      nome: "João Silva",
      sexo: "M",
      data_nascimento: new Date("1990-05-15"),
      hobby: "Programar",
    });

    const response = await app.inject({
      method: "DELETE",
      url: `/api/desenvolvedores/${developerId}`,
    });

    expect(response.statusCode).toBe(204);
  });

  it("deve retornar erro 400 se o ID for inválido", async () => {
    const invalidId = "invalid_id";

    const response = await app.inject({
      method: "DELETE",
      url: `/api/desenvolvedores/${invalidId}`,
    });

    expect(response.statusCode).toBe(400);
  });

  it("deve retornar erro 400 em caso de falha no Prisma", async () => {
    const developerId = 1;

    (prisma.desenvolvedor.delete as jest.Mock).mockRejectedValue(
      new Error("Prisma error")
    );

    const response = await app.inject({
      method: "DELETE",
      url: `/api/desenvolvedores/${developerId}`,
    });

    expect(response.statusCode).toBe(400);
  });
});
