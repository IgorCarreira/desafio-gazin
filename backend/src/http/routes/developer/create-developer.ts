import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function createDeveloper(app: FastifyInstance) {
  app.post("/api/desenvolvedores", async (request, reply) => {
    const createDeveloperBody = z.object({
      nivel_id: z.number(),
      nome: z.string(),
      sexo: z.string(),
      data_nascimento: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
          return new Date(arg);
        }
      }, z.date()),
      hobby: z.string(),
    });

    try {
      const { data_nascimento, hobby, nivel_id, nome, sexo } =
        createDeveloperBody.parse(request.body);

      const developer = await prisma.desenvolvedor.create({
        data: {
          nivel_id,
          nome,
          sexo,
          data_nascimento,
          hobby,
        },
      });

      return reply.status(201).send(developer);
    } catch (error) {
      return reply.status(400).send({
        message: "Erro ao criar desenvolvedor.",
        error,
      });
    }
  });
}
