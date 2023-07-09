# dncommerce API
Desafio proposto na formação em tecnologia da Escola DNC. </br>
A aplicação consiste em umA REST API para lidar com o fluxo de </br>
criação, busca, atualização e deleção de clientes, produtos e </br>
vendas de um comércio online.

## Rotas

### Clientes

|Path                | Método      | Descrição                               |
|--------------------|-------------|-----------------------------------------|
|/costumers          | Get         | Buscar todos os clientes                |
|/costumers/:id      | Get         | Buscar cliente pelo id                  |
|/costumers/         | Post        | Cadastrar cliente                       |
|/costumers/:id      | Put         | Atualizar informações do cliente        |
|/costumers/:id      | Delete      | Deletar cliente                         |

```json
// Exemplo de objeto para cadastro de cliente

{
    "name": "S. Holmes",
    "cpf": "123456789",
    "address": "221B Backer St.",
    "email": "sh@email.com",
    "telephone": "(99)99999-9999"
}
```

### Produtos

|Path                | Método      | Descrição                               |
|--------------------|-------------|-----------------------------------------|
|/products           | Get         | Buscar todos os produtos                |
|/products/:id       | Get         | Buscar produtos pelo id                 |
|/products/          | Post        | Cadastrar produto                       |
|/products/:id       | Put         | Atualizar informações do produto        |
|/products/:id       | Delete      | Deletar produto                         |

```json
// Exemplo de objeto para cadastro de produto

{
    "name": "Notebook",
    "description": "16GB ram, 1TB rom",
    "price": 300000,
    "category": "Eletronic",
    "productStock": 10
}
```

### Vendas

|Path                | Método      | Descrição                               |
|--------------------|-------------|-----------------------------------------|
|/sales              | Get         | Buscar todas as vendas                  |
|/sales/:id          | Get         | Buscar vendas pelo cliente id           |
|/sales/             | Post        | Cadastrar nova venda                    |

```json
// Exemplo de objeto para cadastro de produto

{
    "costumer": 1,
    "totalValue": 300000,
    "products": [
        { "id": 1, "amount": 1 }
    ]
}
```

## Tecnologias utilizadas

- [NodeJs](https://nodejs.org)
- [ExpressJs](https://expressjs.com)
- [Typescript](https://www.typescriptlang.org/docs/)
- [MySQL](https://www.mysql.com/)

## Modelagem dos dados

![Modelagem de dados](/images/modelagem.png)

## Testando o projeto

```bash
# Faça o clone do repositório:

$ git clone https://github.com/Cleidson-Oliveira/dncommerce.git

# Entre na pasta que acabou de ser criada:

$ cd dncommerce

# Você vai precisar criar um banco MySQL.

# Renomeie o arquivo ".env.exemple" para ".env" e preencha a variáveis 
# com as informações necessárias para a conexão com o banco.

# Instale as dependências:

$ npm install

# Para criar as tabelas no banco de dados, use o comando:

$ npm run db:init

# Rodando o projeto:

$ npm run dev
```

Com o projeto rodando, use Insomnia, Postman ou similares para testar 
a partir do endereço: http://localhost:3000.
