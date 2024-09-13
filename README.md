
# **Asclepius-Mobile**

## **Descrição do Projeto**

O Asclepius-Mobile é um aplicativo móvel desenvolvido como parte do curso Programação para Dispositivos Móveis, (PDM). Esse projeto foi criado com **TypeScript** e **React-Native** e se conecta a uma API desenvolvida anteriormente no matéria de  Programação para Web I (PWI), do curso de Análise e Desenvolvimento de Sistemas (ADS) do IFPB - Campus Cajazeiras, no ano de 2024.1.

O objetivo desse aplicativo é fornecer uma experiência de gerenciamento de vacinação para usuários, aproveitando recursos como autenticação de usuário, agendamento de vacinas e rastreamento de registros por meio de uma interface eficiente e fácil de usar.

## **Asclepius API**

O aplicativo se comunica com a API **Asclepius**, que está em constante evolução para desempenhar um papel fundamental nos registros eletrônicos de vacinas. O Asclepius foi projetado como uma API especializada para gerenciar vacinas eletrônicas de forma eficiente, abordando conceitos importantes como autenticação de usuário, uploads de arquivos e gerenciamento de banco de dados.

A API do Asclepius foi originalmente desenvolvida como parte da matéria de Programação para Web I (PWI). Ela foi criada para implementar sistemas robusto e funcional para gerenciar registros de vacinação.

- **API Repository**: [Asclepius API](https://github.com/AsclepiusPW/Asclepius.git)

## **Funcionalidades**

- **Autenticação do usuário**: Login seguro do usuário para gerenciar os registros de vacinação.
- **Solicitações de vacinação**: Os usuários podem visualizar, solicitar e gerenciar as consultas de vacinação.
- **Dados em tempo real**: Conecta-se à API do Asclepius para obter informações atualizadas sobre vacinação.
- **Rastreamento e histórico**: Permite que os usuários acompanhem seu status de vacinação e visualizem o histórico.
- **Upload de fotos**: Apresenta um ambiente integrado para os usuários enviarem e editarem as imagens do seu perfil.

## **Tecnologia Utilizada**
- **React Native**: Estrutura de front-end para criar aplicativos móveis multiplataforma.
- **TypeScript**: Linguagem de programação com tipagem forte usada para desenvolver código confiável.
- **Axios**: Usado para fazer solicitações HTTP para a API do Asclepius.
- **API do Asclepius**: Sistema de back-end que lida com o gerenciamento de vacinação.

## **Pré-requisitos**

- [Node.js](https://nodejs.org/) instalado
- [Visual Studio Code](https://code.visualstudio.com) instalado
- [Asclepius API](https://github.com/AsclepiusPW/Asclepius.git) iniciado

## Estrutura dos diretórios

```bash
├── expo/
│   └── devices.json
|   └── Readme.md
├── @types/
│   └── declaration.d.ts
│   └── navigation.d.ts
│   └── styled.d.ts
├── assests/
├── global/
|   └── theme.ts
|   └── useFonts.ts
|   └── validationForm.ts
├── images/
├── src/
│ ├── components/
| │   | ├── Calendar-Component
| │   | |   └── index.tsx
| │   | |   └── styles.ts
| │   | ├──   ...
│ ├── connection/
| │   | └── axios.ts
│ ├── context/
| │   | └── AuthContext.tsx
| │   | └── UserContext.tsx
| │   | └── EventContext.tsx
│ ├── navigation/
| │   | ├── StackNaviagtion/
| │   | |   └── index.tsx
| │   | ├── TabNaviagtion/
| │   | |   └── index.tsx
│ ├── pages/
| │   | ├── Screen-Details-Event
| │   | |   └── index.tsx
| │   | |   └── styles.ts
| │   | ├──   ...
├── utils/
| ├── tests/
| │   └── arrayEvent.ts
| │   └── arrayInfoVaccines.ts
| │   └── arrayNews.ts
| │   └── arrayVaccinationRequest.ts
| │   └── arrayVaccinationRegisters.ts
| ├── types/
| │   └── typeEvent.ts
| │   └── typeInfoVaccines.ts
| │   └── typeModal.ts
| │   └── typeNews.ts
| │   └── typeUser.ts
| │   └── typeVaccinationRequest.ts
| │   └── typeVaccinationRegisters.ts
├── .gitignore
├── app.json
├── App.tsx
├── babel.config.js
├── package.json
├── package-lock.json
├── tsconfig.json
├── readme.md
```

## **Instalação**

0. Incialmente, clone e configure, com forme é apresentado, o repositório do Asclepius API:

```bash
https://github.com/AsclepiusPW/Asclepius.git
```

1. Clone o repositório do Asclepius-Mobile:

```bash
https://github.com/AsclepiusPW/Asclepius-Mobile.git
```

2. Instale as dependências:
```bash
npm install
```
ou
```bash
yarn install
```

## **Uso**

1. Inicie o aplicativo utilizando o Expo CLI:
```bash
expo start
```

ou

```bash
npx expo start
```

2. Abra o aplicativo em um emulador ou escaneie o código QR com o aplicativo Expo Go em seu dispositivo móvel.

3. Siga para o diretório de **conxeção** dentro da pasta **Source**, e configure a rota da API com base no IP do aplicativo:

```bash
export const portApi = "http://192.168.0.XX:{porta_da_api}";
```

4. Verifique a conexão, se tudo ocorrer bem, o sistema estará pronto para uso.

## **Desenvolvedores**

### Douglas Silva
- [GitHub](https://github.com/7-Dodi)
- Papel: Frontend
- Resumo: Douglas Silva desempenhou um papel fundamental no desenvolvimento da interface do usuário, focando na usabilidade e experiência do usuário. Sua expertise foi vital para garantir uma navegação fluida e intuitiva no aplicativo Asclepius-Mobile.

### Jose Gabriel
- [GitHub](https://github.com/J-Gabriel-F-D)
- Papel: Frontend
- Resumo: Jose Gabriel contribuiu de maneira significativa para o design e implementação das interfaces do aplicativo, assegurando uma integração harmoniosa entre o design visual e a funcionalidade. Sua dedicação foi essencial para a criação de uma experiência de usuário agradável.

### Marcos Paulo
- [GitHub](https://github.com/KingZabitus)
- Papel: Frontend
- Resumo: Marcos Paulo desempenhou um papel crucial no desenvolvimento da arquitetura do frontend, contribuindo para a construção de componentes reutilizáveis e responsivos. Sua atuação garantiu a eficiência do aplicativo, proporcionando uma interação otimizada para os usuários.

Agradecemos a todos os desenvolvedores por suas valiosas contribuições para o frontend do projeto Asclepius-Mobile. Se você tiver dúvidas, sugestões ou deseja colaborar, sinta-se à vontade para entrar em contato com a equipe de desenvolvimento.

## **Conclusão**

O projeto Asclepius-Mobile foi desenvolvido como uma iniciativa acadêmica para explorar conceitos fundamentais na disciplina de Programação para Dispositivos Móveis. Este aplicativo de gerenciamento eletrônico de vacinação, em integração com a API Asclepius, proporcionou uma experiência prática e valiosa no desenvolvimento de soluções mobile modernas, utilizando tecnologias como TypeScript e React-Native.

Apesar de ser um projeto acadêmico, o Asclepius-Mobile representa um marco importante no processo de aprendizado, abordando desde a criação de interfaces amigáveis até a integração com serviços externos de maneira eficiente e segura.

Agradecemos a todos os envolvidos neste projeto, reconhecendo o esforço e dedicação que contribuíram para sua conclusão bem-sucedida. Esperamos que esta experiência tenha sido enriquecedora e que sirva como base para futuras iniciativas.

Para mais informações ou para compartilhar feedback, explore a [página no GitHub](https://github.com/AsclepiusPW/Asclepius-Mobile.git) ou abra uma [issue](https://github.com/AsclepiusPW/Asclepius-Mobile.git/issues). Este projeto conclui sua trajetória como parte do processo de avaliação acadêmica, mas permanece disponível como referência e exemplo de aplicação prática.

Obrigado por fazer parte do projeto Asclepius-Mobile!
