# ExistTrace

Aplicativo mobile para **registro emocional idiográfico** em sessões de terapia, desenvolvido como Trabalho de Conclusão de Curso (Redes de Computadores). O psicólogo aplica, a seu critério, um breve fluxo de registro no próprio dispositivo, e as respostas formam um histórico individual por paciente, interpretado caso a caso, sem comparação entre pacientes.

> ⚠️ **Projeto em desenvolvimento**, com caráter experimental e acadêmico. Não substitui instrumentos de avaliação psicológica validados nem constitui ferramenta de diagnóstico.

## Sobre o projeto

O aplicativo estrutura o registro do estado emocional em quatro etapas sucessivas, apresentadas ao paciente como telas distintas:

1. Seleção de um emoji entre opções aleatórias
2. Seleção de uma palavra entre opções aleatórias
3. Escrita livre de uma palavra ou frase pelo próprio paciente
4. Desenho livre

As duas primeiras etapas usam opções sorteadas de conjuntos fixos; as duas últimas são de conteúdo livre, gerado pelo próprio paciente. É na leitura do histórico, feita pelo psicólogo caso a caso, que o registro se torna idiográfico.

Ao final, o psicólogo, responsável por conduzir a aplicação no próprio dispositivo, revisa todas as respostas em uma tela de confirmação e decide entre **confirmar** (a sessão é gravada no histórico do paciente) ou **recomeçar** o quiz. O desenho é apenas armazenado e exibido: o aplicativo não realiza nenhuma interpretação ou análise automática.

A fundamentação teórica do projeto está ancorada em três conceitos da TCC: o **automonitoramento** (*self-monitoring*), que inspira o registro estruturado do estado emocional; a **reatividade**, isto é, o efeito que o próprio ato de registrar exerce sobre a experiência registrada; e a **diferenciação emocional**, a capacidade de distinguir emoções com precisão, que motiva a variação dos emojis e das palavras apresentados a cada aplicação.

## Funcionalidades

**Para o psicólogo**
- Cadastro e login com autenticação real
- Cadastro de pacientes por **codinome**, sem nome civil
- Lista de pacientes com busca e data da última sessão
- Histórico de sessões por paciente (emoji, palavra, escrita livre e miniatura do desenho)
- Aplicação do quiz e revisão das respostas antes de gravar

**Durante a aplicação do quiz (modo imersivo)**
- Interface reduzida ao conteúdo: sem barra de status, com a tela mantida acesa
- Botão de prosseguir que só aparece quando há resposta
- Confirmação ao tentar sair no primeiro passo, para evitar perda de respostas

## Stack técnica

**Frontend**
- React Native (Expo) e TypeScript
- Expo Router (navegação)
- react-native-svg (desenho livre)
- expo-keep-awake, expo-status-bar, react-native-safe-area-context

**Backend**
- Supabase: autenticação e banco PostgreSQL
- Row Level Security (RLS): cada psicólogo acessa apenas os próprios pacientes e sessões

## Modelo de dados

| Tabela | Conteúdo |
|---|---|
| `psicologo` | Perfil do psicólogo, vinculado ao usuário da autenticação |
| `paciente` | Codinome e idade, vinculados a um psicólogo |
| `sessao_terapia` | Uma aplicação do quiz: `emoji`, `palavra_selecionada`, `palavra_livre`, `desenho`, `data` |

O desenho é guardado como `jsonb`, em traços vetoriais, e remontado no aplicativo. O mesmo formato serve para qualquer tamanho de tela:

```json
{
  "largura": 366,
  "altura": 488,
  "traces": [
    { "d": "M145.7 372.7 L140 368.7 L130.3 363", "cor": "#111111", "espessura": 6 }
  ]
}
```

## Estrutura do projeto

```
app/            telas e rotas (Expo Router)
components/     componentes reutilizáveis (ScreenHeader, TabBar, QuizScreen,
                QuizSelector, QuadroDesenho, Desenho, SessaoCard, InfoCard)
hooks/          hooks de dados (usePacientes, useSessoes)
hooks/context/  estado global (AuthContext, QuizContext)
services/       cliente do Supabase
utils/          funções auxiliares (datas, sorteio de itens)
```

## Estado atual

- [x] Setup inicial do projeto (Expo + TypeScript)
- [x] Autenticação real e perfil do psicólogo (Supabase)
- [x] Cadastro e listagem de pacientes, com busca
- [x] Fluxo do quiz em quatro etapas, com tela de confirmação
- [x] Randomização dos estímulos (sorteio de quatro opções por etapa)
- [x] Persistência das sessões, com RLS
- [x] Histórico de sessões por paciente, com desenho
- [ ] Conjuntos finais de estímulos (hoje há um conjunto reduzido de teste)
- [ ] Edição de paciente e observações
- [ ] Recuperação de senha e login social
- [ ] Tela de configurações
- [ ] Visualização consolidada dos resultados (evolução ao longo das sessões)
- [ ] Avaliação de usabilidade com psicólogos

## Como rodar o projeto

Crie o arquivo `.env` na raiz com as credenciais do seu projeto Supabase:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
```

Instale as dependências e inicie:

```bash
npm install
npx expo login
npx expo start