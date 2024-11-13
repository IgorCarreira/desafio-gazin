import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const countLevels = await prisma.nivel.count();
  if (countLevels === 0) {
    await prisma.nivel.createMany({
      data: [{ nivel: "Junior" }, { nivel: "Pleno" }, { nivel: "Sênior" }],
    });
  }

  const countDevelopers = await prisma.desenvolvedor.count();
  if (countDevelopers === 0) {
    const developers = [
      {
        nome: "Lucas Souza",
        sexo: "M",
        data_nascimento: new Date("1990-01-01"),
        hobby: "Futebol",
        nivel_id: 1,
      },
      {
        nome: "Ana Silva",
        sexo: "F",
        data_nascimento: new Date("1988-05-15"),
        hobby: "Leitura",
        nivel_id: 2,
      },
      {
        nome: "Carlos Almeida",
        sexo: "M",
        data_nascimento: new Date("1985-11-23"),
        hobby: "Videogame",
        nivel_id: 3,
      },
      {
        nome: "Mariana Pereira",
        sexo: "F",
        data_nascimento: new Date("1992-03-10"),
        hobby: "Fotografia",
        nivel_id: 1,
      },
      {
        nome: "Felipe Costa",
        sexo: "M",
        data_nascimento: new Date("1987-07-20"),
        hobby: "Caminhada",
        nivel_id: 2,
      },
      {
        nome: "Beatriz Santos",
        sexo: "F",
        data_nascimento: new Date("1995-12-05"),
        hobby: "Desenho",
        nivel_id: 1,
      },
      {
        nome: "Rafael Oliveira",
        sexo: "M",
        data_nascimento: new Date("1983-02-18"),
        hobby: "Música",
        nivel_id: 3,
      },
      {
        nome: "Patrícia Rocha",
        sexo: "F",
        data_nascimento: new Date("1990-09-25"),
        hobby: "Cinema",
        nivel_id: 2,
      },
      {
        nome: "Ricardo Lima",
        sexo: "M",
        data_nascimento: new Date("1988-10-30"),
        hobby: "Corrida",
        nivel_id: 1,
      },
      {
        nome: "Julia Martins",
        sexo: "F",
        data_nascimento: new Date("1993-06-17"),
        hobby: "Culinária",
        nivel_id: 2,
      },
      {
        nome: "Gabriel Rocha",
        sexo: "M",
        data_nascimento: new Date("1990-04-22"),
        hobby: "Viajar",
        nivel_id: 1,
      },
      {
        nome: "Fernanda Dias",
        sexo: "F",
        data_nascimento: new Date("1986-08-11"),
        hobby: "Esportes",
        nivel_id: 2,
      },
      {
        nome: "Eduardo Silva",
        sexo: "M",
        data_nascimento: new Date("1981-12-13"),
        hobby: "Tecnologia",
        nivel_id: 3,
      },
      {
        nome: "Camila Souza",
        sexo: "F",
        data_nascimento: new Date("1994-02-28"),
        hobby: "Jardinagem",
        nivel_id: 1,
      },
      {
        nome: "João Pereira",
        sexo: "M",
        data_nascimento: new Date("1991-09-14"),
        hobby: "Pesca",
        nivel_id: 2,
      },
    ];

    await prisma.desenvolvedor.createMany({
      data: developers,
    });
  }

  console.log("Valores iniciais inseridos.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
