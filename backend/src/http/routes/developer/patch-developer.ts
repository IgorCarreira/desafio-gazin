import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function updateDeveloper(app: FastifyInstance) {
  app.patch("/api/desenvolvedores/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.preprocess(
        (arg) => (typeof arg === "string" ? Number(arg) : arg),
        z.number()
      ),
    });

    const updateDeveloperBody = z.object({
      nivel_id: z.number().optional(),
      nome: z.string().optional(),
      sexo: z.string().optional(),
      data_nascimento: z
        .preprocess(
          (arg) => (typeof arg === "string" ? new Date(arg) : arg),
          z.date()
        )
        .optional(),
      hobby: z.string().optional(),
    });

    try {
      const { id } = paramsSchema.parse(request.params);
      const data = updateDeveloperBody.parse(request.body);

      const developer = await prisma.desenvolvedor.update({
        where: { id },
        data,
      });

      return reply.status(200).send(developer);
    } catch (error) {
      console.error(error);
      return reply
        .status(400)
        .send({ message: "Erro ao atualizar desenvolvedor.", error });
    }
  });
}
