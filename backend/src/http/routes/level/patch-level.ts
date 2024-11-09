import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function updateLevel(app: FastifyInstance) {
  app.patch("/api/niveis/:id", { schema }, async (request, reply) => {
    const paramsSchema = z.object({
      id: z.preprocess(
        (arg) => (typeof arg === "string" ? Number(arg) : arg),
        z.number()
      ),
    });

    const updateLevelBody = z.object({
      nivel: z.string(),
    });

    try {
      const { id } = paramsSchema.parse(request.params);
      const data = updateLevelBody.parse(request.body);

      const level = await prisma.nivel.update({
        where: { id },
        data,
      });

      return reply.status(200).send(level);
    } catch (error) {
      console.error(error);
      return reply
        .status(400)
        .send({ message: "Erro ao atualizar nível.", error });
    }
  });
}
const schema = {
  description: "Atualiza as informações de um nível pelo ID.",
  tags: ["Níveis"],
  params: {
    type: "object",
    properties: {
      id: { type: "number", description: "ID do nível a ser atualizado" },
    },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      nivel: { type: "string", description: "Nome do nível" },
    },
    required: ["nivel"],
  },
  response: {
    200: {
      description: "Nível atualizado com sucesso.",
      type: "object",
      properties: {
        id: { type: "number", description: "ID do nível" },
        nivel: { type: "string", description: "Nome do nível" },
      },
    },
    400: {
      description: "Erro ao atualizar o nível.",
      type: "object",
      properties: {
        message: { type: "string", description: "Mensagem de erro" },
        error: { type: "object", description: "Detalhes do erro" },
      },
    },
  },
};
