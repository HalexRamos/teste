# Teste EVA Commerce: Back End

Esta API permite cadastrar e autenticar usuários, criar, listar e deletar produtos, e relacionar imagens aos produtos.


## 🚀 Começando

extraia o projeto em um diretório de sua preferencia;

abra com seu editor de texto de sua preferência;


### 📋 Pré-requisitos

Docker;

Insomnia;

Postbird;


## Configurando o Docker

 -> Instale o docker ce em sua máquina e rode o comando "docker run --name postgres -e POSTGRES_PASSWORD=teste -p 5432:5432 -d postgres" no power shell/windows ou no prompt/linux para iniciar um novo container.

 -> Caso o computador for desligado, quando ligar novamente será necessário rodar o comando "docker start postgres".

 -> Caso estiver usando windows, o docker vem com uma interface mais amigável, permitindo dar comando por botões na tela.


## Iniciando a aplicação

 -> rode o comando "yarn typeorm migration:run" para realizar a criação das tabelas no banco de dado.

 -> em seguida, rode o comando "yarn dev:server" para iniciar a aplicação.


## Configurando o Insomnia

 -> Instale o insomnia em sua máquina.


# Configurando requisição para criação de usuário

 -> Crie uma nova requisição e selecione o método HTTP POST.

 -> insira a url -> "http://localhost:3333/users".

 -> selecione o corpo da requisição como um arquivo JSON e insira as informações do usuário que deseja incluir no banco de dados, segue exemplo abaixo:

{
	"name": "Halex Ramos",
	"email": "halexramos@gmail.com",
	"password": "123456"
}

 -> clique em Enviar.

 -> a resposta será parecida com o corpo abaixo.

{
  "name": "Halex Ramos",
  "email": "halexramos@gmail.com",
  "password": "$2a$08$7c8ZjFI6BhKlMDRYKa397eOnjqPUhgWUsR.nG/Vow0fpM1EEUSX1y",
  "id": "01740673-cfdb-4203-85e1-7b9503878c57"
}


# Configurando requisição para criação de sessão de usuário, Este passo é importante para continuar o processo, visto que as proximas rotas necessitam de autenticação.

 -> Crie uma nova requisição e selecione o método HTTP POST.

 -> insira a url -> "http://localhost:3333/sessions".

 -> selecione o corpo da requisição como um arquivo JSON e insira as informações do usuário que deseja incluir no banco de dados, segue exemplo abaixo:

{
	"email": "halexramos@gmail.com",
	"password": "123456"
}

 -> clique em Enviar.

 -> a resposta será parecida com o corpo abaixo.

{
  "user": {
    "id": "01740673-cfdb-4203-85e1-7b9503878c57",
    "name": "Halex Ramos",
    "email": "halexramos@gmail.com",
    "password": "$2a$08$7c8ZjFI6BhKlMDRYKa397eOnjqPUhgWUsR.nG/Vow0fpM1EEUSX1y"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTU4NDc3MDMsImV4cCI6MTYxNTkzNDEwMywic3ViIjoiMDE3NDA2NzMtY2ZkYi00MjAzLTg1ZTEtN2I5NTAzODc4YzU3In0.K7WKA_ATuklakd8lh2sUUTjeg44dI3292xtxvuCiHvI"
}


 -> a partir daqui, todas as rotas são autenticadas, isso significa que no corpo da requisição é necessário levar consigo um token de autenticação.

 -> dito isso, para facilitar o processo, crie uma variável de ambiente com o token gerado pela sessão e use um atalho no campo de autenticação do tipo Bearer.


# Configurando requisição para criação de produtos

 -> Crie uma nova requisição e selecione o método HTTP POST.

 -> insira a url -> "http://localhost:3333/products".

 -> selecione o corpo da requisição como um arquivo JSON e insira as informações do usuário que deseja incluir no banco de dados, segue exemplo abaixo:

{
	"name":"Tênis Adidas",
	"description":"numero 41", 
	"price":"150,00"
}

 -> clique em Enviar.

 -> a resposta será parecida com o corpo abaixo.

{
  "name": "Tênis Adidas",
  "price": "150,00",
  "description": "numero 41",
  "user_id": "01740673-cfdb-4203-85e1-7b9503878c57",
  "id": "ce6ea353-49f6-4a1e-bbee-ca04192a870d"
}


# Configurando requisição para exclusão de produtos

 -> Crie uma nova requisição e selecione o método HTTP DELETE

 -> insira a url -> "http://localhost:3333/products/{insira aqui a id do produto que deseja deletar}".

 -> não é necessário no corpo da requisição como um arquivo JSON, e as informações do produto que deseja excluir será exibida no campo de resposta do Insomnia, similar ao exemplo abaixo:

{
  "name": "Tênis Adidas",
  "price": "150,00",
  "description": "numero 41",
  "user_id": "01740673-cfdb-4203-85e1-7b9503878c57",
  "id": "ce6ea353-49f6-4a1e-bbee-ca04192a870d"
}


# Configurando requisição para listagem de produtos

 -> Crie uma nova requisição e selecione o método HTTP GET

 -> insira a url -> "http://localhost:3333/products".

 -> não é necessário no corpo da requisição como um arquivo JSON, e será gerado uma lista de todos os produtos:


# Configurando requisição para encontrar produtos

 -> Crie uma nova requisição e selecione o método HTTP GET

 -> insira a url -> "http://localhost:3333/products/{insira aqui a id do produto que deseja encontrar}".

 -> não é necessário no corpo da requisição como um arquivo JSON, e será gerado um arquivo JSON similar ao exemplo abaixo:

{
  "name": "Tênis Adidas",
  "price": "150,00",
  "description": "numero 41",
  "user_id": "01740673-cfdb-4203-85e1-7b9503878c57",
  "id": "ce6ea353-49f6-4a1e-bbee-ca04192a870d"
}


# Configurando requisição para upload de imagem de produto

 -> Crie uma nova requisição e selecione o método HTTP PATCH

 -> insira a url -> "http://localhost:3333/images/{insira aqui a id do produto que gostaria de incluir uma imagem}".

 -> Crie uma nova requisição e selecione o método HTTP PATCH

 -> Selecione o tipo do corpo da requisição como "Multipart Form", nele terá dois campos.

 -> No primeiro, preencha com a palavra link.

 -> No segundo, selecione a opção "file" e faça upload da sua imagem.

 -> Será gerado um arquivo JSON parecido com o exemplo abaixo:

{
  "product_id": "128bd4b5-be29-4686-b9d3-6c81de3bc156",
  "link": "C:\projeto\tmp\9a5c5b6ce8cdb8c0b7c8-foguete.jpg",
  "id": "c2549428-f5bd-4273-a2ff-061298e0f205"
}


## Configurando o Postbird

 -> Na tela inicial do Postbird preencha com as seguintes informações:

	Host: localhost
	Port: 5432
	Username: postgres
	Password: teste

	Database e Start Query não é necessário preencher.

 -> Clique em conectar.

 -> Selecione a base de dados "postgres", nela você encontrará todas as tabelas do projeto atual, inclusive a de migrations.


## 🛠️ Construído com

* NodeJS

* Typescript

* express

* Multer

* TypeORM

* crypto

* JWT

* bcryptJS

* AppError


## ✒️ Autores

Halex Penha Ramos - [desenvolvedor](https://github.com/HalexRamos)


## 📄 Licença

Este projeto está sob a licença (sua licença) - veja o arquivo [LICENSE.md](https://github.com/usuario/projeto/licenca) para detalhes.

## 🎁 Expressões de gratidão

* Conte a outras pessoas sobre este projeto 📢
* Convide alguém da equipe para uma cerveja 🍺 
* Obrigado publicamente 🤓.
* etc.


---
⌨️ com ❤️ por Halex Penha Ramos 😊
