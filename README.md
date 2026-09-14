# ExistTrace

Aplicativo mobile de acompanhamento emocional, desenvolvido como Trabalho de Conclusão de Curso (Redes de Computadores). O projeto propõe uma ferramenta auxiliar para psicólogos aplicarem, ao longo de sessões terapêuticas, um breve fluxo de registro do estado emocional do paciente.

> !Projeto em desenvolvimento, com caráter experimental e acadêmico. Não substitui instrumentos de avaliação psicológica validados nem constitui ferramenta de diagnóstico.

## Sobre o projeto

O aplicativo estrutura a coleta de estados emocionais momentâneos em três etapas sucessivas, apresentadas ao paciente como telas distintas:

1. Seleção de um emoji entre opções aleatórias
2. Seleção de uma palavra entre opções aleatórias
3. Escrita livre de uma palavra pelo próprio paciente

Ao final, o psicólogo — responsável por conduzir a aplicação no próprio dispositivo — visualiza os resultados da sessão.

A fundamentação teórica do projeto está ancorada na Terapia Cognitivo-Comportamental (TCC), especificamente na técnica de automonitoramento (*self-monitoring*), com apoio metodológico complementar no conceito de *Ecological Momentary Assessment* (EMA).

## Stack técnica

**Frontend**
- React Native (Expo)
- TypeScript

**Backend** *(em planejamento)*
- Node.js + Express + TypeScript
- Persistência e autenticação via Supabase (PostgreSQL)
- Prisma como ORM
- Padrão de repositório (contratos/interfaces desacoplados da implementação de persistência)

## Estado atual

- [x] Setup inicial do projeto (Expo + TypeScript)
- [x] Fluxo de telas de login e das três etapas de coleta (protótipo, dados ainda estáticos)
- [ ] Randomização real dos estímulos (emojis/palavras)
- [ ] Backend e persistência de dados (Supabase + Prisma)
- [ ] Autenticação real
- [ ] Tela de resultados para o psicólogo

## Como rodar o projeto

Crie o .env

```bash
npm install
npx expo start --tunnel
```

## Delimitações

Este projeto é desenvolvido no âmbito de um Trabalho de Conclusão de Curso, com escopo e prazo limitados. Não há garantia de cobertura ampla de dispositivos/versões de sistema operacional, testes de usabilidade com usuários reais, ou conformidade completa com a LGPD nesta fase.

## Licença

Este projeto está licenciado sob a licença MIT.
