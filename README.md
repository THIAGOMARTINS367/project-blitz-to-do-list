# Descrição

Nessa parte do projeto foi desenvolvido a aplicação React "front-end"
da aplicação "To-Do-List" (Lista de Tarefas), onde a parte de interação do usuário acontece.

Nela o usuário pode se cadastrar, fazer login, e assim, acessar sua lista de tarefas.

### *ATENÇÃO: Para utilizar a aplicação acesse o link no canto direito em "About"*.

---

# Sumário

- [Descrição](#descrição)
- [Dependências](#dependências)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
- [Tecnologias usadas](#tecnologias-usadas)
- [ANTES DE INICIALIZAR A APLICAÇÃO](#antes-de-inicializar-a-aplicação)
- [Linter](#linter)
- [Rotas Implementadas](#rotas-implementadas)

---

## Dependências

- React
- Vs Code
- Bibliotecas
  - @testing-library/jest-dom
  - @testing-library/react
  - @testing-library/user-event
  - prop-types
  - react
  - react-dom
  - react-router-dom
  - react-scripts
  - web-vitals

---

## O que foi desenvolvido

Foi implementado uma o front-end da aplicação "To-Do-List" (Lista de Tarefas) responsável
por receber as ações dos usuários da aplicação e enviar, de forma correta e esperada, dados para API
da aplicação, bem como receber os dados retornados da API e renderizá-los na página correta do site
para que os usuŕios tenham acesso, desde que estejam devidamente logados no sistema.

Tais dados podem ser: Dados do Usuário (Cadastro e Login) e dados das tarefas (Conteúdo da Tarefa, status e etc...).

---

## Tecnologias usadas

- `javascript` , `jsx` , `React` , `ContextAPI` e `css`.

---

## ANTES DE INICIALIZAR A APLICAÇÃO

1. Clone o repositório
  * `git clone `
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd project-blitz-to-do-list`
  * Acesse a branch do front-end:
    * `git checkout dev-thiago-martins-front-end`
  * Acesse a pasta do front-end:
    * `cd front-end

2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Inicialize o projeto:
    * `npm start` (uma nova página deve abrir no seu navegador)
  * Acesse a Rota da lista de tarefas no seu navegador
    * `https://localhost:3000/to-do-list`

---

## Linter

Para garantir a qualidade do código de forma a tê-lo mais legível, de mais fácil manutenção e seguindo as boas práticas de desenvolvimento foi utilizado neste projeto o linter `ESLint` e o `Stylelint`. Para rodar o linter localmente, execute o comando abaixo:

```bash
npm run lint
npm run lint:styles
```
---

## Rotas Implementadas

- Cadastro de Usuário: `/to-do-list/sign-up`
- Login do Usuário: `/to-do-list/login`
- Lista de Tarefas: `/to-do-list`
