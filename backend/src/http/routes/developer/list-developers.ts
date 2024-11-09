import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function listDevelopers(app: FastifyInstance) {
  app.get("/api/desenvolvedores", { schema }, async (request, reply) => {
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

const schema = {
  description: "Lista todos os desenvolvedores com filtros e paginação.",
  tags: ["Desenvolvedores"],
  querystring: {
    type: "object",
    properties: {
      nivel_id: {
        type: "number",
        description: "Filtra por nível do desenvolvedor",
      },
      nome: { type: "string", description: "Filtra por nome do desenvolvedor" },
      sexo: { type: "string", description: "Filtra por sexo do desenvolvedor" },
      current_page: {
        type: "number",
        description: "Número da página atual",
        default: 1,
      },
      per_page: {
        type: "number",
        description: "Número de itens por página",
        default: 10,
      },
    },
  },
  response: {
    200: {
      description: "Lista de desenvolvedores com metadados de paginação.",
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "ID do desenvolvedor" },
              nome: { type: "string", description: "Nome do desenvolvedor" },
              sexo: { type: "string", description: "Sexo do desenvolvedor" },
              data_nascimento: {
                type: "string",
                format: "date",
                description: "Data de nascimento",
              },
              hobby: { type: "string", description: "Hobby do desenvolvedor" },
            },
          },
        },
        meta: {
          type: "object",
          properties: {
            total: {
              type: "number",
              description: "Total de desenvolvedores encontrados",
            },
            per_page: {
              type: "number",
              description: "Número de itens por página",
            },
            current_page: {
              type: "number",
              description: "Número da página atual",
            },
            last_page: {
              type: "number",
              description: "Número total de páginas",
            },
          },
        },
      },
    },
    400: {
      description: "Erro na requisição",
      type: "object",
      properties: {
        message: { type: "string", description: "Mensagem de erro" },
        error: { type: "string", description: "Detalhes do erro" },
      },
    },
  },
};
