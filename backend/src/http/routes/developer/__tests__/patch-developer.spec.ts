import fastify, { FastifyInstance } from "fastify";
import { prisma } from "../../../../lib/prisma";
import { updateDeveloper } from "../patch-developer";

jest.mock("../../../../lib/prisma", () =>
  require("../../../../__mocks__/prisma")
);

describe("PATCH /api/desenvolvedores/:id", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(updateDeveloper);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve atualizar as informações de um desenvolvedor com sucesso", async () => {
    const updatedDeveloper = {
      id: 1,
      nome: "João Silva",
      sexo: "M",
      nivel_id: 2,
      data_nascimento: new Date("1990-05-15"),
      hobby: "Programar",
    };

    (prisma.desenvolvedor.update as jest.Mock).mockResolvedValue(
      updatedDeveloper
    );

    const response = await app.inject({
      method: "PATCH",
      url: "/api/desenvolvedores/1",
      payload: {
        nome: "João Silva",
        sexo: "M",
        nivel_id: 2,
        data_nascimento: "1990-05-15",
        hobby: "Programar",
      },
    });

    const responseBody = response.json();

    expect(response.statusCode).toBe(200);
    expect(responseBody.id).toBe(updatedDeveloper.id);
    expect(responseBody.nome).toBe(updatedDeveloper.nome);
    expect(responseBody.nivel_id).toBe(updatedDeveloper.nivel_id);
    expect(responseBody.hobby).toBe(updatedDeveloper.hobby);
  });

  it("deve retornar erro 400 se o ID do desenvolvedor não for encontrado", async () => {
    (prisma.desenvolvedor.update as jest.Mock).mockRejectedValue(new Error());

    const response = await app.inject({
      method: "PATCH",
      url: "/api/desenvolvedores/999",
      payload: {
        nome: "Carlos Souza",
        sexo: "M",
        nivel_id: 3,
        data_nascimento: "1985-08-10",
        hobby: "Jogos",
      },
    });

    expect(response.statusCode).toBe(400);
  });
});
