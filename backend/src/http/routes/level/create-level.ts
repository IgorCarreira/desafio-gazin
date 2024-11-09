import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function createLevel(app: FastifyInstance) {
  app.post("/api/niveis", { schema }, async (request, reply) => {
    const createLevelBody = z.object({
      nivel: z.string(),
    });

    try {
      const { nivel } = createLevelBody.parse(request.body);

      const level = await prisma.nivel.create({
        data: {
          nivel,
        },
      });

      return reply.status(201).send(level);
    } catch (error) {
      return reply.status(400).send({
        message: "Erro ao criar nível.",
        error,
      });
    }
  });
}

const schema = {
  description: "Cria um novo nível.",
  tags: ["Níveis"],
  body: {
    type: "object",
    properties: {
      nivel: { type: "string", description: "Nome do nível" },
    },
    required: ["nivel"],
  },
  response: {
    201: {
      description: "Nível criado com sucesso.",
      type: "object",
      properties: {
        id: { type: "number", description: "ID do nível" },
        nivel: { type: "string", description: "Nome do nível" },
      },
    },
    400: {
      description: "Erro ao criar o nível.",
      type: "object",
      properties: {
        message: { type: "string", description: "Mensagem de erro" },
        error: { type: "object", description: "Detalhes do erro" },
      },
    },
  },
};
