# Cadastro de Desenvolvedores e Níveis 🚀

Este é um projeto de cadastro de desenvolvedores e seus respectivos níveis, com um backend que fornece uma API RESTful e um frontend SPA (Single Page Application). A aplicação permite listar, cadastrar, editar e remover desenvolvedores e níveis.

## Tecnologias Utilizadas 🛠️

- **Backend**: Node.js, Fastify, Prisma ORM
- **Frontend**: React com Vite
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker e Docker Compose

## Funcionalidades da Aplicação 🌟
### Backend - Endpoints da API

1. Níveis

   - Listar níveis (`GET /api/niveis`)
   - Cadastrar nível (`POST /api/niveis`)
   - Editar nível (`PUT/PATCH /api/niveis/:id`)
   - Remover nível (`DELETE /api/niveis/:id`)

2. Desenvolvedores
   - Listar desenvolvedores (`GET /api/desenvolvedores`)
   - Editar desenvolvedor (`PUT/PATCH /api/desenvolvedores/:id`)
   - Cadastrar desenvolvedor (`POST /api/desenvolvedores`)
   - Remover desenvolvedor (`DELETE /api/desenvolvedores/:id`)

### Frontend - Interface do Usuário

- Listagem, cadastro, edição e exclusão de níveis e desenvolvedores
- Confirmação de exclusão
- Feedback visual para sucesso e erro nas operações
