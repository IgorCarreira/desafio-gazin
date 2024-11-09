import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function updateDeveloper(app: FastifyInstance) {
  app.patch("/api/desenvolvedores/:id", { schema }, async (request, reply) => {
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

const schema = {
  description: "Atualiza as informações de um desenvolvedor pelo ID.",
  tags: ["Desenvolvedores"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "ID do desenvolvedor a ser atualizado",
      },
    },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      nivel_id: {
        type: "number",
        description: "ID do nível do desenvolvedor",
        nullable: true,
      },
      nome: {
        type: "string",
        description: "Nome do desenvolvedor",
        nullable: true,
      },
      sexo: {
        type: "string",
        description: "Sexo do desenvolvedor",
        nullable: true,
      },
      data_nascimento: {
        type: "string",
        format: "date",
        description: "Data de nascimento do desenvolvedor (YYYY-MM-DD)",
        nullable: true,
      },
      hobby: {
        type: "string",
        description: "Hobby do desenvolvedor",
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      description: "Desenvolvedor atualizado com sucesso.",
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
      description: "Erro ao atualizar o desenvolvedor.",
      type: "object",
      properties: {
        message: { type: "string", description: "Mensagem de erro" },
        error: { type: "object", description: "Detalhes do erro" },
      },
    },
  },
};
