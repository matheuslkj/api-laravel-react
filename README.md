**Desafio FullStack Gazin Tech**

Este é um projeto que combina um backend desenvolvido com Laravel e um frontend em React, usando containers Docker para simplificar o processo de desenvolvimento e implantação.

**Visão Geral do Projeto**

Este projeto tem como objetivo fornecer uma aplicação web completa com backend em Laravel e frontend em React. O Laravel é usado para fornecer uma API RESTful que o React consome para exibir dados e permitir interações do usuário. O Docker é utilizado para facilitar o ambiente de desenvolvimento, garantindo que todos os desenvolvedores e servidores de produção usem a mesma configuração de ambiente.

**Tecnologias Utilizadas**

- **Backend**: Laravel 9.x
- **Frontend**: React 18.x
- **Banco de Dados**: MySQL 5.7
- **Containerização**: Docker
- **Gerenciamento de Dependências**: Composer (Laravel), npm/yarn (React)
- **Documentação da API**: Swagger

**Configuração do Ambiente de Desenvolvimento**

Para configurar o ambiente de desenvolvimento, você precisará das seguintes ferramentas instaladas em seu sistema:

- Docker e Docker Compose
- Node.js (preferencialmente na versão LTS mais recente)
- Composer (para gerenciamento de dependências do Laravel)

**Pré-requisitos**

- **Docker**: Instalar Docker
- **Node.js e npm**: Instalar Node.js
- **Composer**: Instalar Composer

**Configurando o Projeto**

1. Clone este repositório:
   ```bash
   git clone https://github.com/matheuslkj/api-laravel-react.git
   ```

   ```bash
   cd api-laravel-react
   ```

2. Copie o arquivo de exemplo .env.dev do Laravel:
   ```bash
   cp backend/.env.dev backend/.env
   ```
3. Configure as variáveis de ambiente nos arquivos .env conforme necessário.

**Criação do Banco de Dados**
Antes de iniciar o projeto, crie um banco de dados chamado "developers". Isso pode ser feito usando a linha de comando ou através de uma ferramenta de gerenciamento de banco de dados.

1. Exemplo usando MySQL CLI:
   ```bash
   mysql -u root -p
   ```

2. No prompt do MySQL:
   ```bash
   CREATE DATABASE developers;
   ```

**Executando o Projeto**

**Usando Docker**

1. Certifique-se de que o Docker está em execução.
2. **Inicie os containers:**
   ```bash
   docker-compose up --build
   ```
3. **Execute as migrações e seeds do banco de dados:**
   ```bash
   docker-compose exec backend php artisan migrate --seed
   ```
4. O frontend React estará disponível em <http://localhost:3000> e o backend Laravel em http://localhost:8000.

**Sem Docker**

Se preferir executar o projeto sem Docker, siga estas etapas:

**Backend (Laravel)**

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```
3. Instale as dependências do Laravel:
   ```bash
   composer install
   ```
4. Configure o arquivo .env com as credenciais do banco de dados local.

5. Execute as migrações e seeds:
   ```bash
   php artisan migrate --seed
   ```
6. Inicie o servidor Laravel:
   ```bash
   php artisan serve
   ```
**Frontend (React)**

1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências do React:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento do React:
   ```bash
   npm start
   ```
**Testando o Projeto**

**Testes Automatizados**

O projeto inclui testes automatizados para garantir que as funcionalidades básicas estejam funcionando conforme esperado.

**Executar Testes no Backend**

1. Execute os testes do Laravel:
   ```bash
   docker-compose exec backend php artisan test
   ```
2. Ou, se estiver sem Docker:
   ```bash
   php artisan test
   ```

**Testes Manuais**

Para realizar testes manuais, abra o navegador e acesse o frontend React em <http://localhost:3000> e o backend Laravel em http://localhost:8000. Navegue pelas diferentes funcionalidades da aplicação e verifique se tudo está funcionando como esperado.

**Documentação dos Endpoints**


**Exemplos de Endpoints**

**DevelopersController**

**GET /api/v1/developers**

Retorna uma lista de desenvolvedores.

- **Resposta de Sucesso:**
  - **Status:** 200 OK
  - **Body:**
   ```json
    [

    `  `{

    `    `"id": 1,

    `    `"levels_id": 1,

    `    `"nome": "Teste1",

    `    `"sexo": "F",

    `    `"data_nascimento": "1990-01-01",

    `    `"idade": 34,

    `    `"hobby": "Coding"

    `  `}

    ]
   ```
**POST /api/v1/developers**

Cria um novo desenvolvedor.

- **Request Body:**
   ```json
  {

  `  `"levels_id": 1,

  `  `"nome": "Teste2",

  `  `"sexo": "M",

  `  `"data_nascimento": "1995-05-20",

  `  `"idade": 29,

  `  `"hobby": "Gaming"

  }
   ``` 

- **Resposta de Sucesso:**
  - **Status:** 201 Created
  - **Body:**
   ```json
    {

    `  `"id": 2,

    `  `"levels_id": 1,

    `  `"nome": "Teste2",

    `  `"sexo": "M",

    `  `"data_nascimento": "1995-05-20",

    `  `"idade": 29,

    `  `"hobby": "Gaming"

    }
   ```
**PUT /api/v1/developers/{id}**

Atualiza um desenvolvedor existente.

- **Request Body:**
 ```json
  {

  `  `"levels_id": 1,

  `  `"nome": "Teste1 Updated",

  `  `"sexo": "M",

  `  `"data_nascimento": "1995-05-20",

  `  `"idade": 29,

  `  `"hobby": "Reading"

  }
 ```
- **Resposta de Sucesso:**
  - **Status:** 200 OK
  - **Body:**
  ```json
    {

    `  `"id": 2,

    `  `"levels_id": 1,

    `  `"nome": "Teste1 Updated",

    `  `"sexo": "M",

    `  `"data_nascimento": "1995-05-20",

    `  `"idade": 29,

    `  `"hobby": "Reading"

    }
  ```
**DELETE /api/v1/developers/{id}**

Remove um desenvolvedor do sistema.

- **Resposta de Sucesso:**
  - **Status:** 204 No Content

**LevelController**

**GET /api/v1/levels**

Retorna uma lista de níveis.

- **Resposta de Sucesso:**
  - **Status:** 200 OK
  - **Body:**

   ```json
    [

    `  `{

    `    `"id": 1,

    `    `"nivel": "Junior"

    `  `}

    ]
   ```
**POST /api/v1/levels**

Cria um novo nível.

- **Request Body:**
 ```json
  {

  `  `"nivel": "Senior"

  }
 ``` 

- **Resposta de Sucesso:**
  - **Status:** 201 Created
  - **Body:**
   ```json
    {

    `  `"id": 2,

    `  `"nivel": "Senior"

    }
   ```
**PUT /api/v1/levels/{id}**

Atualiza um nível existente.

- **Request Body:**
 ```json
  {

  `  `"nivel": "Mid-Level"

  }
 ```
- **Resposta de Sucesso:**
  - **Status:** 200 OK
  - **Body:**
   ```json
    {

    `  `"id": 2,

    `  `"nivel": "Mid-Level"

    }
   ```
**DELETE /api/v1/levels/{id}**

Remove um nível do sistema.

- **Resposta de Sucesso:**
  - **Status:** 204 No Content

