import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function listLevels(app: FastifyInstance) {
  app.get("/api/niveis", { schema }, async (request, reply) => {
    const querySchema = z.object({
      id: z.coerce.number().optional(),
      nivel: z.string().optional(),
      current_page: z.number().min(1).default(1),
      per_page: z.number().min(1).max(100).default(10),
    });

    try {
      const { nivel, current_page, per_page, id } = querySchema.parse(
        request.query
      );

      const offset = (current_page - 1) * per_page;

      const filters: Prisma.NivelWhereInput = {
        ...(id && { id }),
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

const schema = {
  description: "Lista níveis com paginação e filtros.",
  tags: ["Níveis"],
  querystring: {
    type: "object",
    properties: {
      nivel: {
        type: "string",
        description: "Nome do nível para filtro",
        nullable: true,
      },
      current_page: {
        type: "number",
        description: "Página atual",
        minimum: 1,
        default: 1,
      },
      per_page: {
        type: "number",
        description: "Número de níveis por página",
        minimum: 1,
        maximum: 100,
        default: 10,
      },
    },
  },
  response: {
    200: {
      description: "Lista de níveis.",
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number", description: "ID do nível" },
              nivel: { type: "string", description: "Nome do nível" },
            },
          },
        },
        meta: {
          type: "object",
          properties: {
            total: { type: "number", description: "Total de níveis" },
            current_page: { type: "number", description: "Página atual" },
            per_page: {
              type: "number",
              description: "Número de níveis por página",
            },
            last_page: { type: "number", description: "Última página" },
          },
        },
      },
    },
    400: {
      description: "Erro ao listar níveis.",
      type: "object",
      properties: {
        message: { type: "string", description: "Mensagem de erro" },
        error: { type: "object", description: "Detalhes do erro" },
      },
    },
  },
};
