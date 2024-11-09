import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function updateLevel(app: FastifyInstance) {
  app.patch("/api/niveis/:id", async (request, reply) => {
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
