# Event Driven Architecture

Esse projeto tem como objetivo demonstrar a utilização de uma arquitetura orientada a eventos, utilizando o Kafka como broker de mensageria.

## Tecnologias utilizadas

- Go
- NodeJS
- Kafka

## Serviços

- Wallet - Serviço responsável pela criação de contas e transações
- Balance - Serviço responsável pelo saldo das contas

## Executando o projeto

Para executar o projeto, é necessário ter o docker e docker-compose instalados na máquina.
Para subir os serviços, basta executar o comando abaixo:

```bash
docker-compose up -d
```

## Utilizando as APIs

Para facilitar a utilização das APIs, foi criado uma pasta em cada serviço chamada `api`, onde contém um arquivo `client.http`
com as requisições necessárias para testar as APIs. Para utilizar, basta instalar a extensão `REST Client` no VSCode e clicar em `Send Request` em cada requisição.

**OBS:** *Os bancos de dados serão populados automaticamente com alguns dados para facilitar os testes.*

## Acessando o Kafka

Para acessar o `control-center` do Kafka, basta acessar o endereço `http://localhost:9021`.
Nele, é possível visualizar os tópicos, grupos de consumidores, entre outras informações.
