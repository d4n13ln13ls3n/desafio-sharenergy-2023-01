# Desafio técnico realizado para o processo seletivo da SHARENERGY

Repositório destinado aos candidatos do processo seletivo da SHARENERGY em 2023, com vagas para desenvolvimento de aplicações Web e Mobile.


## 🚀 Começando

Antes de utilizar o projeto, é necessario ter Git, MongoDB (Docker container ou local) e npm/yarn instalado na máquina.



## 📃 Sobre
  <p>
    O objetivo deste projeto foi construir uma aplicação web (frontend e backend) capaz de realizar a comunicação com APIs distintas, além de um CRUD.
  </p>


## 🛠️ Ferramentas

## - Front-End:

  - React 6
  - Typescript
  - React Router Dom
  - Context Api
  - React Hooks
  - CSS modules
  - Pico CSS Library
  - Axios
  
## - Back-End:

  - Node
  - Typescript
  - Express
  - Cors
  - Mongodb
  - JWT
  - mongoose

## ⏯️ Vídeo

- [Veja no link a seguir o projeto sendo executado:](https://youtu.be/ysIHGyid3Ms)

## ⚙️ Como executar

Verifique que as portas 3000 e 3001 estejam disponíveis para a aplicação, bem como a porta 27017, que será utilizada pelo MongoDB.

1 - Clone o repositório em uma pasta de sua preferencia 
```
git@github.com:d4n13ln13ls3n/desafio-sharenergy-daniel-yabu.git

```
2 - Instale as dependências necessárias para executar o projeto através do comando <strong>npm install</strong> na raiz do projeto.

3 - Após acessar o diretório <strong>api</strong>, rode o comando <strong>npm run dev</strong> para iniciar o servidor. Certifique-se de ter habilitado um container do MongoDB em sua máquina, o que pode ser feito através do comando <strong>docker run --name some-mongo -d mongo:tag</strong>. Substituir <strong>some-mongo</strong> pelo nome que você quiser atribuir ao seu container. <strong>Tag</strong> refere-se à versão do MongoDB que você quer utilizar. Mais instruções sobre o MongoDB podem ser encontradas em <strong>https://hub.docker.com/_/mongo</strong>. O back-end está disponível no endereço <strong>http://localhost:3001</strong>

4 - A próxima etapa consiste em acessar o diretório <strong>front-end</strong>, o que pode ser feito, caso você ainda esteja no diretório <strong>api</strong>, através dos comandos <strong>cd ..</strong> e <strong>cd front-end</strong>. Feito isso, execute o comando <strong>npm run build</strong> e a aplicação deverá abrir em alguns segundos em seu browser, no endereço <strong>http://localhost:3000</strong>

# Back-End

## 1 - Rotas do Usuário - User Routes

###  Login

| Método | Funcionalidade             | URL                              |
| ------ | -------------------------- | -------------------------------- |
| `POST` | Realiza o login do usuário | http://localhost:3001/login |

Nessa requisição `POST` é necessário informar o seguinte JSON:

```
{
  "username": "desafiosharenergy",
  "password": "sh@r3n3rgy"
}
```

## 2 - Rotas de Clientes

As rotas abaixo necessitam de um token válido, que é gerado no login do usuário, para funcionar corretamente. Este token deve ser passado pelo `header` da requisição na chave `authorization`. 

### Cadastro de cliente

| Método | Funcionalidade             | URL                                 |
| ------ | -------------------------- | ----------------------------------- |
| `POST` | Realiza o cadastro de clientes | http://localhost:3001/customers |

Nessa requisição `POST` é necessário informar o seguinte JSON:

```
{
  "name": nome do cliente,
  "email": email do cliente,
  "cpf": cpf do cliente,
  "phone": telefone do cliente,
  "address": endereço do cliente,
}

```
Esta requisição retorna o seguinte JSON 
```
{
  "id": id do cliente,
  "name": nome do cliente,
  "email": email do cliente,
  "cpf": cpf do cliente,
  "phone": telefone do cliente,
  "address": endereço do cliente,
}
```

### Listagem de clientes

| Método | Funcionalidade                                    | URL                                |
| ------ | ------------------------------------------------- | ---------------------------------- |
| `GET`  | Lista todos os clientes | http://localhost:3001/customers |

Nessa rota não é necesário o envio de um token válido através do headers.

Esta requisição retorna as seguintes informações:

```
[{
  "id": id do cliente,
  "name": nome do cliente,
  "email": email do cliente,
  "cpf": cpf do cliente,
  "phone": telefone do cliente,
  "address": endereço do cliente,

}]
```

### Atualização de clientes

| Método | Funcionalidade                                    | URL                                |
| ------ | ------------------------------------------------- | ---------------------------------- |
| `PUT`  | Altera dados de um cliente | http://localhost:3001/customers/:id |

É necesário o envio de um token válido através dos headers e um id por params.

Nesta rota, são feitas algumas validações de usuario: 

name: String, maior que 3 caracteres,
email: String e formato email padrão,
cpf: String com exatamente 11 caracteres,
phone: String com pelo menos 10 caracteres,
address: String, maior que 9 caracteres,


Esta requisição `PUT` exige o seguinte JSON para funcionar:

```
{
  "name": nome do cliente,
  "email": email do cliente,
  "cpf": cpf do cliente,
  "phone": telefone do cliente,
  "address": endereço do cliente,
}
```

Esta requisição `PUT` retorna as seguintes informações:

```
{
  "id": id do cliente,
  "name": nome do cliente,
  "email": email do cliente,
  "cpf": cpf do cliente,
  "phone": telefone do cliente,
  "address": endereço do cliente,

}
```

### Remoção de clientes

| Método | Funcionalidade                                    | URL                                |
| ------ | ------------------------------------------------- | ---------------------------------- |
| `DELETE`  | Exclui um cliente especifico | http://localhost:3001/customers/:id |

É necesário o envio de um token válido através dos headers e um id por params.

Esta requisição `DELETE` retorna as seguintes informações

```
{
  "id": id do cliente,
  "name": nome do cliente,
  "email": email do cliente,
  "cpf": cpf do cliente,
  "phone": telefone do cliente,
  "address": endereço do cliente,

}
```

### Encontrar um cliente específico

| Método | Funcionalidade                                    | URL                                |
| ------ | ------------------------------------------------- | ---------------------------------- |
| `GET`  | Encontrar um cliente pelo id | http://localhost:3001/customer/:id |

É necesário o envio de um token válido atravéz do headers.

Esta requisição `GET` exige o seguinte JSON:

```
{
  "id": id do cliente
}
```

Esta requisição `GET` retorna as seguintes informações

```
{
  "id": id do cliente,
  "name": nome do cliente,
  "email": email do cliente,
  "cpf": cpf do cliente,
  "phone": telefone do cliente,
  "address": endereço do cliente,
}
```

# Front-End

## 1 - Login
Esta página inicial possui um título, um campo de login para o usuário incluir seu username, dois botões (um para usuários existentes fazerem login e outros para usuários se cadastrarem), um checkbox com a opção de  Remember Me e um footer com o nome do desenvolvedor desta aplicação.

Para realizar o login, basta clicar no botão `Login` após preencher o nome de usuário (desafiosharenergy) e senha (sh@r3n3rgy) corretos. Caso a opção `Remember-me` esteja marcada, nas próximas sessões o nome do usuário já estará preenchido.

<div align="center">
  <img src="./images/Login.png" alt="Login"/>
</div>

## 2 - Tela de Gatos

Nessa tela, solicita-se ao usuário inserir um status code no campo de input que ali aparece e clicar em um botão. Feito isso, é realizada uma requisição à API `https://http.cat/{statusCode}` com o codigo solicitado no input. Caso o status code seja válido, é exibida uma imagem de um gato correspondente àquele status code. Caso não seja, é exibida uma mensagem de Not Found.

<div align="center">
  <img src="./images/cats.png" alt="cats"/>
</div>

## 3 - Tela de Cachorros

Esta página utiliza-se da API `https://random.dog/woof` para renderizar imagens de cachorros aleatórios na tela. A cada clique no botão RECARREGAR, é exibida uma foto diferente. Em alguns casos, a imagem não está disponível e aí a página exibe o texto alternativo referente àquela imagem, que foi incluido à título de boas práticas de acessibilidade.

<div align="center">
  <img src="./images/dogs.png" alt="dogs"/>
</div>

## 4 - Tela de Users/Home

Esta página faz uso da API `https://randomuser.me/` para popular uma tabela com dados de usuários. Esta tabela permite uma filtragem de usuários por nome, username e email. Existe na tela também uma barra de paginação, já que são exibidos cinco usuários por vez em um total de 11. Através de tal barra, é possível ver os usuários seguintes e anteriores, bem como pular páginas através da barra de navegação.
<div align="center">
  <img src="./images/login.png" alt="login"/>
</div>

## 5 - Tela de Clientes

Esta página alimenta-se dos dados gerados pela API criada no back-end deste projeto. O container da esquerda exibe, de forma fixa, a lista dos clientes disponíveis no banco de dados (em tempo real, quando usuários são incluídos, atualizados e removidos, é possível ver as alterações ali). A tela da direita tem duas funções: exibir os botões que permitem fazer operações (listar, atualizar, criar e remover usuário) e exibir formulários que permitem executar as ações vinculadas a cada botão. Os formulários contém o botão de voltar, para que o usuário possa fazer outras operações com maior comodidade.
<div align="center">
  <img src="./images/clientes.png" alt="home"/>
</div>