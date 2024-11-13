import fastify, { FastifyInstance } from "fastify";
import { listLevels } from "../list-levels";
import { prisma } from "../../../../lib/prisma";

jest.mock("../../../../lib/prisma", () =>
  require("../../../../__mocks__/prisma")
);

describe("GET /api/niveis", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(listLevels);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar uma lista de níveis ", async () => {
    const mockedLevels = [
      { id: 1, nivel: "Junior" },
      { id: 2, nivel: "Pleno" },
    ];

    const mockedTotal = mockedLevels.length;

    (prisma.nivel.findMany as jest.Mock).mockResolvedValue(mockedLevels);
    (prisma.nivel.count as jest.Mock).mockResolvedValue(mockedTotal);

    const response = await app.inject({
      method: "GET",
      url: "/api/niveis",
      query: {
        current_page: "1",
        per_page: "10",
      },
    });

    const responseBody = response.json();

    expect(response.statusCode).toBe(200);
    expect(responseBody.data).toEqual(mockedLevels);
    expect(responseBody.meta).toEqual({
      total: mockedTotal,
      current_page: 1,
      per_page: 10,
      last_page: 1,
    });
  });

  it("deve retornar uma lista vazia quando não há níveis", async () => {
    (prisma.nivel.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.nivel.count as jest.Mock).mockResolvedValue(0);

    const response = await app.inject({
      method: "GET",
      url: "/api/niveis",
      query: {
        current_page: "1",
        per_page: "10",
      },
    });

    const responseBody = response.json();

    expect(response.statusCode).toBe(200);
    expect(responseBody.data).toEqual([]);
    expect(responseBody.meta).toEqual({
      total: 0,
      current_page: 1,
      per_page: 10,
      last_page: 0,
    });
  });
});
