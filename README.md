# Descrição

Nessa parte do projeto foi desenvolvida a API (back-end) da aplicação "To-Do-List" (Lista de Tarefas),
onde todas as requisições ao banco de dados e processamento de dados, que vem do front-end acontecem de fato.
Tal API foi desenvolvida utilizando boas práticas de desenvolvimento baseando-se na arquitetura REST e nos princípios do SOLID.


### *ATENÇÃO: Para utilizar a aplicação acesse o link no canto direito em "About"*.

---

# Sumário

- [Descrição](#descrição)
- [Dependências](#dependências)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
- [Tecnologias usadas](#tecnologias-usadas)
- [ANTES DE INICIALIZAR A APLICAÇÃO](#antes-de-inicializar-a-aplicação)
- [Linter](#linter)
- [Endpoints implementados](#endpoints-implementados)


---

## Dependências

- NodeJS
- Vs Code
- Bibliotecas
  - cors
  - dotenv
  - express,
  - express-rescue
  - joi
  - jsonwebtoken
  - mysql2
 
---

## O que foi desenvolvido

Foi implementado uma API REST que recebe e retorna dados de uma lista de tarefas
e dos usuários cadastrados no Banco de Dados.
Sendo possível fazer todas as ações de um CRUD na lista de tarefas, bem como cadastrar e logar como um usuário.

Além de fazer o controle de acesso dos usuários à lista de tarefas fazendo com que apenas os usuários que cadastrarem uma tarefa tenham acesso a ela.

---

## Tecnologias usadas

- `TypeScript` , `Express` e `Docker`

---

## ANTES DE INICIALIZAR A APLICAÇÃO

1. Clone o repositório
  * `git clone git@github.com:THIAGOMARTINS367/project-blitz-to-do-list.git`
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd project-blitz-to-do-list`
  * Acesse a branch da API:
    * `git checkout dev-thiago-martins-back-end`
  * Acesse a pasta da API:
    * `cd back-end`

2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
    
  * Transpile o código TypeScript:
    * `npm run tsc`
    
  * Inicialize o projeto:
    * `npm start`

---

## Linter

Para garantir a qualidade do código de forma a tê-lo mais legível, de mais fácil manutenção e seguindo as boas práticas de desenvolvimento foi utilizado neste projeto o linter `ESLint`. Para rodar o linter localmente, execute o comando abaixo:

```bash
npm run lint
```
---

## Endpoints implementados

- Cadastro do Usuário: `POST /sign-up`
- Login do Usuário: `POST /login`
- Obter Lista de Tarefas: `GET /to-do-list`
- Cadastrar Tarefas: `POST /to-do-list`
- Editar Tarefa: `PUT /to-do-list/:taskId`
- Deletar Tarefas: `DELETE /to-do-list`
