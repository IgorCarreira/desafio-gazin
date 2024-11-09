import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function deleteDeveloper(app: FastifyInstance) {
  app.delete("/api/desenvolvedores/:id", async (request, reply) => {
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
