import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function deleteDeveloper(app: FastifyInstance) {
  app.delete("/api/desenvolvedores/:id", { schema }, async (request, reply) => {
    const paramsSchema = z.object({
      id: z.preprocess(
        (arg) => (typeof arg === "string" ? Number(arg) : arg),
        z.number()
      ),
    });

    try {
      const { id } = paramsSchema.parse(request.params);

      await prisma.desenvolvedor.delete({
        where: { id },
      });

      return reply
        .status(204)
        .send({ message: "Desenvolvedor removido com sucesso." });
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Erro ao remover desenvolvedor.", error });
    }
  });
}

const schema = {
  description: "Remove um desenvolvedor pelo ID.",
  tags: ["Desenvolvedores"],
  params: {
    type: "object",
    properties: {
      id: { type: "number", description: "ID do desenvolvedor a ser removido" },
    },
    required: ["id"],
  },
  response: {
    204: {
      description: "Desenvolvedor removido com sucesso.",
      type: "null",
    },
    400: {
      description: "Erro ao remover o desenvolvedor.",
      type: "object",
      properties: {
        message: { type: "string", description: "Mensagem de erro" },
        error: { type: "object", description: "Detalhes do erro" },
      },
    },
  },
};
