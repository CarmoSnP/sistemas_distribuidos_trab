# 🎬 API de Dados de Filmes

Este projeto é uma API simples que utiliza os dados de filmes de duas APIs externas (OMDb e TMDb) para buscar informações sobre filmes, incluindo sinopse e avaliações. O usuário pode buscar filmes, exibir filmes previamente buscados e salvar os dados em um arquivo JSON local.

---

## 🛠 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework web para Node.js.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **Readline-sync**: Biblioteca para criar interfaces de linha de comando interativas.
- **dotenv**: Biblioteca para carregar variáveis de ambiente a partir de um arquivo `.env`.
- **File System (fs)**: Módulo nativo do Node.js para manipulação de arquivos.

---

## 🔧 Funcionalidades

- **🔍 Buscar Filmes**: O usuário pode buscar filmes fornecendo o título e o ano de lançamento. A API consulta o OMDb e o TMDb para obter dados como título, ano, sinopse e avaliações.
- **📂 Exibir Filmes Buscados**: O usuário pode visualizar uma lista dos filmes já buscados, com suas respectivas sinopses e avaliações.
- **💾 Salvar Filmes**: As informações dos filmes buscados são salvas localmente em um arquivo `respostas.json`.
- **💻 Interface de Linha de Comando**: O sistema interage com o usuário através do terminal, permitindo realizar buscas de filmes e visualizar os resultados.

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, você precisa garantir que tenha o **Node.js** instalado. Você pode verificar se o **Node.js** está instalado no seu sistema com o comando:

```bash
node -v
```

## 🔑 Configuração das Variáveis de Ambiente

Você também precisará configurar as variáveis de ambiente. Crie um arquivo .env na raiz do projeto e adicione suas chaves de API para o OMDb e o TMDb:

```bash
OMDB_API_KEY=YOUR_OMDB_API_KEY
TMDB_API_KEY=YOUR_TMDB_API_KEY
```

Substitua YOUR_OMDB_API_KEY e YOUR_TMDB_API_KEY pelos valores das suas chaves de API.

## 🚀 Como Rodar o Projeto

1.  Clone o repositório para sua máquina local:

2.  Instale as dependências:
3.  Crie o arquivo .env com suas chaves de API:
4.  Execute o programa:

## 📜 Como Usar

- Após rodar o programa, o usuário verá um menu no terminal com as opções:

- Buscar um filme: Digite o título e o ano do filme que você deseja buscar.

- Exibir filmes já buscados: Mostra todos os filmes que já foram consultados, com suas sinopses e avaliações.

- Sair: Encerra o programa.

## Exemplo de Uso

1.  Buscar um Filme
    Digite o título e o ano de um filme:

```bash
Digite o titulo do filme: Inception
Digite o ano do filme: 2010
```

**Resultado das APIs:**

```bash
{
  "titulo": "Inception",
  "ano": 2010,
  "sinopse": "A thief who steals corporate secrets through the use of dream-sharing technology is given the task of planting an idea into the mind of a CEO.",
  "reviews": [
    "Amazing movie with a complex plot and brilliant visuals.",
    "A mind-bending experience, highly recommended."
  ]
}
```

- nesse código estou salvando as saidas em um arquivo .json

## **Exemplos**

```bash
Filmes já buscados:

1. Inception (2010)
   Sinopse: A thief who steals corporate secrets through the use of dream-sharing technology is given the task of planting an idea into the mind of a CEO.
   Reviews:
     1. Amazing movie with a complex plot and brilliant visuals.
     2. A mind-bending experience, highly recommended.
     3.
```

## 🗂 Estrutura do Projeto

```bash
/root
│
├── .env              # Arquivo de variáveis de ambiente
├── index.js          # Arquivo principal contendo a lógica do programa
├── respostas.json    # Arquivo JSON onde as respostas dos filmes são salvas
├── package.json      # Dependências do projeto e scripts
└── README.md         # Este arquivo de documentação

```
