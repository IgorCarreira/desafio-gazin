# Cadastro de Desenvolvedores e Níveis 🚀

Este é um projeto de cadastro de desenvolvedores e seus respectivos níveis, com um backend que fornece uma API RESTful e um frontend SPA (Single Page Application). A aplicação permite listar, cadastrar, editar e remover desenvolvedores e níveis.

## Tecnologias Utilizadas 🛠️

- **NodeJs**: v20.11.0
- **Backend**: Fastify, Prisma ORM, Swagger (documentação)
- **Frontend**: React com Vite
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker e Docker Compose

## Funcionalidades da Aplicação 🌟

### Backend - Endpoints da API

Acesse a documentação [aqui](https://cadastro-desenvolvedores.onrender.com/docs).

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

## Acessar o Projeto Online 🌐

Este projeto está disponível online e pode ser acessado diretamente pelos links abaixo:

- [Frontend](https://cadastro-desenvolvedores-web.onrender.com/)
- [Backend](https://cadastro-desenvolvedores.onrender.com) | [Documentação](https://cadastro-desenvolvedores.onrender.com/docs)

### Observação sobre o Ambiente de Hospedagem

O projeto foi hospedado utilizando o serviço **Render** em um plano gratuito. Isso significa que, quando os servidores ficam inativos por um certo período, o Render pode "hibernar" os serviços. Como resultado, a primeira requisição após um período de inatividade pode demorar alguns segundos a mais para responder, pois o Render precisa "acordar" os servidores.

Após a primeira requisição, o desempenho deve ser normal até que os servidores voltem a hibernar.

## Como Rodar o Projeto ❓

Existem duas maneiras para executar o projeto localmente

### 1. Executar com Docker Compose

Para rodar o projeto inteiro em modo de produção, use o Docker Compose na raiz do projeto. Certifique-se de que você tem o Docker e Docker Compose instalados.

1. Na raiz do projeto, execute:

   ```bash
   docker-compose up -d
   ```

Esse comando inicia o backend, o frontend e o banco de dados PostgreSQL em containers Docker. Todos os serviços estarão configurados com as variáveis de ambiente adequadas para o ambiente de produção.

2. Acesse o projeto localmente

- **Backend**: Acesse http://localhost:3030
- **Frontend**: Acesse http://localhost:3000

### 2. Executar Manualmente

Caso queira rodar o backend e o frontend manualmente, siga os passos abaixo. Certifique-se de que o PostgreSQL está instalado e em execução, e configure as variáveis de ambiente no .env de cada serviço.

```bash
docker compose up -d postgres
```

Configurações Iniciais
Instale as dependências do projeto (na raiz):

```bash
cd backend && npm install && cd ../frontend && npm install && cd ..
```

#### Configurar o Banco de Dados com Prisma

No backend, configure o arquivo .env com as informações de conexão ao banco de dados PostgreSQL. Provavelmente terá que alterar o user para "localhost"

Execute as migrações do Prisma para criar as tabelas necessárias:

```bash
cd backend
npx prisma migrate dev
```

Esse comando aplica as migrações ao banco de dados configurado e cria as tabelas necessárias.

(Opcional) Se precisar popular o banco de dados com dados iniciais, crie e execute um arquivo seed:

```bash
npm run seed
```

#### Executar o Backend

Garanta que o banco de dados PostgreSQL esteja rodando e que as variáveis de ambiente estejam configuradas corretamente no .env do backend (com a URL do banco de dados, etc.).

Entre na pasta backend e inicie o servidor:

```bash
cd backend
npm run dev
```

Isso inicia o backend localmente em modo de desenvolvimento (porta padrão: 3030).

#### Executar o Frontend

Entre na pasta frontend.

```bash
cd frontend
npm run dev
```

Isso inicia o frontend localmente (porta padrão: 5173).

- **Backend**: http://localhost:3030
  - Documentação: http://localhost:3030/docs
- **Frontend**: http://localhost:5173
