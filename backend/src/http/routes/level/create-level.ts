import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function createLevel(app: FastifyInstance) {
  app.post("/api/niveis", async (request, reply) => {
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
