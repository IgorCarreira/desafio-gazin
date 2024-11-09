import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function listLevels(app: FastifyInstance) {
  app.get("/api/niveis", async (request, reply) => {
    const querySchema = z.object({
      nivel: z.string().optional(),
      current_page: z.number().min(1).default(1),
      per_page: z.number().min(1).max(100).default(10),
    });

    try {
      const { nivel, current_page, per_page } = querySchema.parse(
        request.query
      );

      const offset = (current_page - 1) * per_page;

      const filters: Prisma.NivelWhereInput = {
        ...(nivel && { nivel: { contains: nivel, mode: "insensitive" } }),
      };

      const levels = await prisma.nivel.findMany({
        where: filters,
        skip: offset,
        take: per_page,
      });

      const totalLevels = await prisma.nivel.count({
        where: filters,
      });

      return reply.status(200).send({
        data: levels,
        meta: {
          total: totalLevels,
          current_page,
          per_page,
          last_page: Math.ceil(totalLevels / per_page),
        },
      });
    } catch (error) {
      console.error(error);
      return reply.status(400).send({
        message: "Erro ao listar niveis.",
        error,
      });
    }
  });
}
