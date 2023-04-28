<h1 align="center">
  Desafio Tecnico ERural - Plataforma  
  <br>
</h1>

<!-- <h4 align="center"></h4> -->

<p align="center">
    <a alt="Vue3">
        <img src="https://img.shields.io/badge/Vue-v3.2.47-orange.svg" />
    </a>
    <a alt="Firebase">
        <img src="https://img.shields.io/badge/FirebaseSdk-v9.20.0-brightgreen.svg" />
    </a>
    <a alt="Vite">
        <img src="https://img.shields.io/badge/Vite-v4.3.0-brown.svg">
    </a>
    <a alt="Agora-RTM-Sdk">
        <img src="https://img.shields.io/badge/AgoraRTMSdk-v1.6.0-green.svg">
    </a>    
</p>

## Link da Demonstração No Firebase

- [Gettin - https://gettin-a6d10.web.app/ ](https://gettin-a6d10.web.app/)

## Índice

1. [Descrição do desafio](#Descrição-desafio)
2. [Tecnologias](#Tecnologias)
3. [Instruções de uso](#Instruções-de-uso)
4. [Desenvolvimento](#Desenvolvimento)

## Descrição do desafio

O desafio técnico consiste na criação de uma plataforma de criação de salas de chat a partir de um link de um video do youtube. Onde qualquer pessoa pode criar uma sala e esta sala ficará disponível na tela principal da plataforma para que outros usuarios possam interagir com aquela sala e ver o video em questão e mandar messages entre si.

## Tecnologias

Foram utilizados as seguintes tecnologias para o desenvolvimento da aplicação :

- [Vue3](https://vuejs.org/) - Progressive JavaScript Framework
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Firestore](https://firebase.google.com/docs/firestore?hl=pt-br) - Banco de dados NOSQL
- [Agora.io](https://www.agora.io/en/) - Cliente RTM.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS do momento :).

## Instruções de uso

**1. Clonar repositório**

```bash
git clone https://github.com/Ataide/vue-to-me.git
```

**2 Instalar as dependencias do projeto.**

```bash
cd vue-to-me && yarn
```

**3. Start usando Yarn**

```bash
yarn dev
```

Aplicação local estará disponível em <http://localhost:5173>.

## Desenvolvimento

A Usuario da aplicação pode:

- Criar uma sala a partir de um link de um video do youtube.
- Visualizar as salas criadas por outros usuario e entrar nessas salas.
- Visualizar o video da Sala(Só é permitido um video por sala).
- Visualizar quantas pessoas online tem na sala.
- Enviar mensagens para as pessoas da Sala.
- Deixar um Like para a Sala.
- Visualizar quantas pessoas entraram na sala desde a criação dela.
- Sair da Sala.

A aplicação foi desenvolvida com Vue, foi optado usar essa tecnologia por ser a utilizada pelo equipe da empresa.

Foi pensado em um layout bem simples e funcional, para isso utilizei o Tailwind CSS para estilizar os componentes e dar uma cara mais elegantes aos elementos visuais.

A aplicação tem duas rotas definidas, uma para a tela inicial onde temos dois inputs com o nome do usuario e o link do video do youtube.

Após preencher o nome e o link do video do youtube, o sistema direciona para a sala de chat onde cria uma instancia do AgoraRTM com o link do video em um iframe para ser assistido juntamente com as pessoas que entrem naquela sala. Pode-se passar tanto o link da sala na barra de endereço quanto a sala fica disponível na tela inicial da aplicação. Isso de deve pelo fato do uso do firestore para persistir os dados da sala e do video.

Logo que alguem entre na sala o chat ficará disponivel onde pode-se enviar messagens entre os usuario daquela sala. Não foi implementado nenhum tipo de cadastro ou authenticação, então qualquer pessoa pode entrar e conversar com um nome anonimo. Para referenciar os usuarios foi criado um concat do nome anonimo com a primeira sequencia do uuid gerado para instanciar o AgoraRTM.

Temos tambem a contagem de views sala. Cada nova instancia do AgoraRTM gerado é uma nova Visualização para a sala. E ainda tem a possibilidade do usuario deixar um like para aquela sala. onde será contabilizado em tempo real com os outros usuarios. Por questão de não haver cadastro, um mesmo usuario pode deixar varios likes para aquela sala.

Toda informação salva é usando o Firestore, que nos da a possibilidade de atualização de informação em tempo real.

O historico de messagens da sala não foi implementado sendo assim cada vez que o usuario sai da sala e entra novamente se perde o historico de menssagens.

## Contribuidores

[Ataide Bastos](https://github.com/Ataide/)
