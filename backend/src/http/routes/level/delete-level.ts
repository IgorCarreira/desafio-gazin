import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function deleteLevel(app: FastifyInstance) {
  app.delete("/api/niveis/:id", { schema }, async (request, reply) => {
    const paramsSchema = z.object({
      id: z.preprocess(
        (arg) => (typeof arg === "string" ? Number(arg) : arg),
        z.number()
      ),
    });

    try {
      const { id } = paramsSchema.parse(request.params);

      await prisma.nivel.delete({
        where: { id },
      });

      return reply.status(204).send({ message: "Nível removido com sucesso." });
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Erro ao remover nível.", error });
    }
  });
}

const schema = {
  description: "Remove um nível pelo ID.",
  tags: ["Níveis"],
  params: {
    type: "object",
    properties: {
      id: { type: "number", description: "ID do nível a ser removido" },
    },
    required: ["id"],
  },
  response: {
    204: {
      description: "Nível removido com sucesso.",
      type: "null",
    },
    400: {
      description: "Erro ao remover o nível.",
      type: "object",
      properties: {
        message: { type: "string", description: "Mensagem de erro" },
        error: { type: "object", description: "Detalhes do erro" },
      },
    },
  },
};
