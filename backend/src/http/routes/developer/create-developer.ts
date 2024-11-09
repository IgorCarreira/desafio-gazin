import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function createDeveloper(app: FastifyInstance) {
  app.post("/api/desenvolvedores", { schema }, async (request, reply) => {
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

const schema = {
  description: "Cria um novo desenvolvedor.",
  tags: ["Desenvolvedores"],
  body: {
    type: "object",
    properties: {
      nivel_id: { type: "number", description: "ID do nível do desenvolvedor" },
      nome: { type: "string", description: "Nome do desenvolvedor" },
      sexo: { type: "string", description: "Sexo do desenvolvedor" },
      data_nascimento: {
        type: "string",
        format: "date",
        description: "Data de nascimento do desenvolvedor (YYYY-MM-DD)",
      },
      hobby: { type: "string", description: "Hobby do desenvolvedor" },
    },
    required: ["nivel_id", "nome", "sexo", "data_nascimento", "hobby"],
  },
  response: {
    201: {
      description: "Desenvolvedor criado com sucesso.",
      type: "object",
      properties: {
        id: { type: "number", description: "ID do desenvolvedor" },
        nivel_id: {
          type: "number",
          description: "ID do nível do desenvolvedor",
        },
        nome: { type: "string", description: "Nome do desenvolvedor" },
        sexo: { type: "string", description: "Sexo do desenvolvedor" },
        data_nascimento: {
          type: "string",
          format: "date",
          description: "Data de nascimento do desenvolvedor",
        },
        hobby: { type: "string", description: "Hobby do desenvolvedor" },
      },
    },
    400: {
      description: "Erro na criação do desenvolvedor.",
      type: "object",
      properties: {
        message: { type: "string", description: "Mensagem de erro" },
        error: { type: "object", description: "Detalhes do erro" },
      },
    },
  },
};
