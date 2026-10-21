# ExistTrace

Aplicativo mobile para **registro emocional idiográfico** em sessões de terapia, desenvolvido como Trabalho de Conclusão de Curso (Redes de Computadores).

O psicólogo pode aplicar, a seu critério, um breve fluxo de registro no próprio dispositivo. As respostas formam um histórico individual por paciente, interpretado caso a caso, sem comparação entre pacientes.

> **Projeto em desenvolvimento:** o ExistTrace tem caráter experimental e acadêmico. Não substitui instrumentos de avaliação psicológica validados nem constitui ferramenta de diagnóstico.

## Sobre o projeto

O aplicativo estrutura o registro do estado emocional em quatro etapas sucessivas, apresentadas ao paciente como telas distintas:

1. Seleção de um emoji entre opções aleatórias.
2. Seleção de uma palavra entre opções aleatórias.
3. Escrita livre de uma palavra ou frase pelo próprio paciente.
4. Desenho livre.

As duas primeiras etapas usam opções sorteadas de conjuntos fixos; as duas últimas são de conteúdo livre, gerado pelo próprio paciente. É na leitura do histórico, feita pelo psicólogo caso a caso, que o registro se torna idiográfico.

Ao final, o psicólogo, responsável por conduzir a aplicação no próprio dispositivo, revisa todas as respostas em uma tela de confirmação e decide entre **confirmar** — gravando a sessão no histórico do paciente — ou **recomeçar** o quiz.

O desenho é apenas armazenado e exibido: o aplicativo não realiza interpretação ou análise automática.

A fundamentação teórica do projeto está ancorada em três conceitos da Terapia Cognitivo-Comportamental (TCC):

- **Automonitoramento (*self-monitoring*):** inspira o registro estruturado do estado emocional.
- **Reatividade:** considera o efeito que o próprio ato de registrar pode exercer sobre a experiência registrada.
- **Diferenciação emocional:** capacidade de distinguir emoções com precisão, que motiva a variação dos emojis e das palavras apresentados a cada aplicação.

## Funcionalidades

### Para o psicólogo

- Cadastro e login com autenticação real.
- Cadastro de pacientes por **codinome**, sem nome civil.
- Lista de pacientes com busca e data da última sessão.
- Histórico de sessões por paciente, incluindo emoji, palavra selecionada, escrita livre e miniatura do desenho.
- Aplicação do quiz e revisão das respostas antes de gravar.

### Durante a aplicação do quiz — modo imersivo

- Interface reduzida ao conteúdo, sem barra de status e com a tela mantida acesa.
- Botão para prosseguir exibido somente quando há uma resposta.
- Confirmação ao tentar sair no primeiro passo, para evitar perda de respostas.

## Stack técnica

### Frontend

- React Native com Expo.
- TypeScript.
- Expo Router para navegação.
- `react-native-svg` para desenho livre.
- `expo-keep-awake`, `expo-status-bar` e `react-native-safe-area-context`.

### Backend

- Supabase para autenticação e banco de dados PostgreSQL.
- Row Level Security (RLS) para restringir o acesso: cada psicólogo pode acessar apenas os próprios pacientes e sessões, conforme as políticas configuradas no banco.

## Modelo de dados

| Tabela | Conteúdo |
|---|---|
| `psicologo` | Perfil do psicólogo, vinculado ao usuário da autenticação. |
| `paciente` | Codinome e idade, vinculados a um psicólogo. |
| `sessao_terapia` | Uma aplicação do quiz: `emoji`, `palavra_selecionada`, `palavra_livre`, `desenho` e `data`. |

O desenho é armazenado como `jsonb`, em traços vetoriais, e reconstruído no aplicativo. O formato permite adaptar o desenho a diferentes tamanhos de tela.

Exemplo de estrutura:

```json
{
  "largura": 366,
  "altura": 488,
  "traces": [
    {
      "d": "M145.7 372.7 L140 368.7 L130.3 363",
      "cor": "#111111",
      "espessura": 6
    }
  ]
}
```

## Estrutura do projeto

```text
app/             telas e rotas (Expo Router)
components/      componentes reutilizáveis (ScreenHeader, TabBar,
                 QuizScreen, QuizSelector, QuadroDesenho,
                 Desenho, SessaoCard, InfoCard)
hooks/           hooks de dados (usePacientes, useSessoes)
hooks/context/   estado global (AuthContext, QuizContext)
services/        cliente do Supabase
utils/           funções auxiliares (datas, sorteio de itens)
```

> A estrutura acima é ilustrativa. Os diretórios e nomes podem variar conforme a organização atual do repositório.

## Estado atual

### Implementado

- [x] Setup inicial do projeto com Expo e TypeScript.
- [x] Autenticação real e perfil do psicólogo via Supabase.
- [x] Cadastro e listagem de pacientes, com busca.
- [x] Fluxo do quiz em quatro etapas, com tela de confirmação.
- [x] Randomização dos estímulos (sorteio de quatro opções por etapa).
- [x] Persistência das sessões, com RLS.
- [x] Histórico de sessões por paciente, incluindo o desenho.

### Planejado

- [ ] Finalizar os conjuntos de estímulos (atualmente há um conjunto reduzido para testes).
- [ ] Edição de paciente e inclusão de observações.
- [ ] Recuperação de senha e login social.
- [ ] Tela de configurações.
- [ ] Visualização consolidada dos resultados ao longo das sessões.
- [ ] Avaliação de usabilidade com psicólogos.

## Como rodar o projeto

### Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) na sua maquina local
- [Expo Go](https://expo.dev/go) no celular que será usado para testar o aplicativo.

O Expo Go permite executar projetos Expo compatíveis diretamente no celular durante o desenvolvimento, sem precisar gerar um APK ou instalar versão publicada do aplicativo.

Links para instalar o Expo Go:

- **Android:** [Google Play — Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent).
- **iOS:** [App Store — Expo Go](https://apps.apple.com/app/expo-go/id982107779).

### 1. Configure as variáveis de ambiente

Na raiz do projeto, crie um arquivo chamado `.env` com as credenciais do seu projeto Supabase:

```dotenv
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
EXPO_PUBLIC_EAS_PROJECT_ID=seu-build-id //opcional
```

### 2. Instale as dependências

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

### 3. Inicie o Expo

Escolha o modo adequado à sua conexão.

#### Caso 1 — Celular e computador na mesma rede Wi-Fi

```bash
npx expo start
```

Se necessário, limpe o cache:

```bash
npx expo start -c
```

Mantenha o celular e o computador na mesma rede. Se a conexão local não funcionar, tente o modo de túnel.

#### Caso 2 — Celular e computador em redes diferentes

Por exemplo, quando o computador está no Wi-Fi e o celular usa dados móveis:

```bash
npx expo start --tunnel
```

O modo de túnel pode ser mais lento e depende da disponibilidade do serviço de túnel do Expo.

### 4. Abra o aplicativo no celular

1. Aguarde o QR Code aparecer no terminal.
2. Abra o Expo Go no celular e escaneie o QR Code. No iOS, também é possível usar a Câmera para abrir o link.
3. Aguarde o projeto carregar.

O celular precisa ter conexão com a rede ou com a internet, conforme o modo de conexão escolhido. O aplicativo também precisa alcançar o Supabase para autenticação e operações de banco de dados.

## Aviso acadêmico

O ExistTrace é um projeto experimental desenvolvido para fins acadêmicos. Seu uso deve respeitar a avaliação e o critério profissional do psicólogo. Os registros não devem ser interpretados isoladamente como diagnóstico, e o aplicativo não substitui instrumentos psicológicos validados nem o acompanhamento profissional.
