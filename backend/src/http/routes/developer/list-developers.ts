import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function listDevelopers(app: FastifyInstance) {
  app.get("/api/desenvolvedores", async (request, reply) => {
    const querySchema = z.object({
      nivel_id: z.number().optional(),
      nome: z.string().optional(),
      sexo: z.string().optional(),
      current_page: z.number().min(1).default(1),
      per_page: z.number().min(1).max(100).default(10),
    });

    try {
      const { nivel_id, nome, sexo, current_page, per_page } =
        querySchema.parse(request.query);

      const offset = (current_page - 1) * per_page;

      const filters: Prisma.DesenvolvedorWhereInput = {
        ...(nivel_id && { nivel_id }),
        ...(nome && { nome: { contains: nome, mode: "insensitive" } }),
        ...(sexo && { sexo }),
      };

      const developers = await prisma.desenvolvedor.findMany({
        where: filters,
        skip: offset,
        take: per_page,
      });

      const totalDevelopers = await prisma.desenvolvedor.count({
        where: filters,
      });

      return reply.status(200).send({
        data: developers,
        meta: {
          total: totalDevelopers,
          current_page,
          per_page,
          last_page: Math.ceil(totalDevelopers / per_page),
        },
      });
    } catch (error) {
      console.error(error);
      return reply.status(400).send({
        message: "Erro ao listar desenvolvedores.",
        error,
      });
    }
  });
}
