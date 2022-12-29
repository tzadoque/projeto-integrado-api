# Projeto Integrado API

## Tutorial para instalar e rodar o projeto

Para rodar o projeto você precisa ter o [NodeJs](https://nodejs.org/) instalado em sua máquina, além de algum gerenciador de pacotes (no tutorial dou o exemplo utilizando `npm` e `yarn`).

---

Primeiramente, faça um clone do projeto:

```
$ git clone https://github.com/tzadoque/projeto-integrado-api.git
```

Instale todas as dependências listadas no package.json usando os seguintes comandos:

```
npm i
```

Após isso vocẽ deverá rodar os comandos para criar a base de dados conforme as informações abaixo

### Utilizando o Sqlite3

O sqlite não necessita que seja criada a base de dados, então você pode rodar direto o comando de migração do sequelize

```
npx sequelize db:migrate
```

### Utilizando outra base de dados

Você precisará editar o arquivo `src/config/database.json` informando os dados para acessar o banco de dados que deseja utilizar.

Após isso, rode o comando para criar a base de dados:

```
npx sequelize db:create
```

E em seguida, rode as migrações com o comando a seguir:

```
npx sequelize db:migrate
```

### Executando o projeto

Agora é só rodar o projeto:

```
npm run dev
```

Após isso, acesse o seu localhost na porta `:3000`, caso apareça um array vazio, tudo ocorreu normalmente. Você pode acessar a documentação na rota `/docs`.
