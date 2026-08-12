<p align="center">
  <img src="assets/prisma_banner.png" alt="Banner do Prisma" width="65%">
</p>

<p align="center">
  Documentação técnica para manutenção, configuração e extensão do Prisma.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-004b8d" alt="Versão">
  <img src="https://img.shields.io/badge/Moodle-Integration-f98012" alt="Integração com Moodle">
  <img src="https://img.shields.io/badge/Technical-Documentation-7c3aed" alt="Documentação Técnica">
</p>

<h4 align="center">
  <a href="#sobre-esta-documentação">Sobre</a> |
  <a href="#arquitetura-do-sistema">Arquitetura</a> |
  <a href="#integração-com-o-moodle">Moodle</a> |
  <a href="#métricas-e-indicadores">Métricas</a> |
  <a href="#manutenção">Manutenção</a> |
  <a href="#materiais-adicionais">Materiais</a>
</h4>

📝 **Disponível em outros idiomas:** [English](TECHNICAL_DOCUMANTATION.md)

# Prisma - Documentação Técnica

Este documento contém informações técnicas para a manutenção, configuração e evolução do projeto Prisma.

Ele complementa o [README](/README.pt-BR.md) principal, que apresenta uma visão geral do projeto, seus objetivos, funcionalidades e instruções para executar a aplicação localmente.

A documentação é destinada principalmente a desenvolvedores, pesquisadores e futuros colaboradores que precisem compreender o funcionamento do sistema ou realizar modificações no projeto.

## Sobre esta documentação

O projeto Prisma envolve diversos componentes técnicos, incluindo o Front-End, Back-End, processamento assíncrono, sistema de análise, bancos de dados e integração com o Moodle.

Este documento centraliza informações mais específicas sobre desenvolvimento e manutenção, como:

- Arquitetura do sistema e relacionamento entre seus componentes.
- Requisitos da integração com o Moodle.
- Procedimentos para atualização das versões do Moodle.
- Métricas e indicadores utilizados pelo sistema.
- Processamento e persistência dos dados.
- Diretrizes de manutenção e extensão.
- Decisões técnicas e detalhes relevantes de implementação.

O objetivo é facilitar a manutenção do projeto e contribuir para a continuidade do desenvolvimento por futuros colaboradores.

## Arquitetura do sistema

O Prisma é composto por diferentes componentes que trabalham em conjunto para receber dados acadêmicos, processá-los de forma assíncrona, calcular indicadores e disponibilizar as informações resultantes por meio da interface web.

<p align="center">
  <img src="docs/assets/Architecture.png" alt="Arquitetura do sistema Prisma" width="60%">
</p>

### Componentes principais

#### Camada do cliente

A **Camada do Cliente** contém a interface web por meio da qual os usuários interagem com o Prisma.

- **Front-End:** Aplicação web responsável por apresentar dashboards, indicadores, rankings, gráficos e outras visualizações aos usuários.

#### Back-End

O Back-End é responsável por processar requisições, orquestrar o processamento dos dados e coordenar a comunicação entre os diferentes componentes do sistema.

##### Ingestão e orquestração

- **API:** Ponto central de entrada para as requisições provenientes do Front-End. Gerencia a comunicação com os demais componentes do sistema e disponibiliza os serviços da aplicação.
- **RabbitMQ:** Message broker responsável por enfileirar tarefas e permitir o processamento assíncrono.

##### Processamento assíncrono

- **Workers:** Processos executados em segundo plano que consomem tarefas do RabbitMQ e coordenam a execução das operações de processamento e análise dos dados.

##### Sistema de análise

O **Sistema de Análise** é responsável pelo processamento dos dados necessários para gerar os indicadores do projeto.

Seus principais componentes incluem:

- **Cálculo e análise de indicadores:** Módulo responsável pelo cálculo e análise dos indicadores utilizados pelo Prisma.
- **Mapeamento de versões do Moodle:** Componente responsável por adaptar a comunicação e o acesso aos dados de acordo com a versão do Moodle utilizada.
- **Conectores do Moodle:** Conectores específicos para cada versão, responsáveis pela comunicação com as respectivas instalações do Moodle.

#### Bancos de dados

O Prisma interage com duas principais fontes de dados:

- **Banco de Dados Local (Indicadores):** Banco de dados PostgreSQL local responsável por armazenar os indicadores e resultados processados gerados pelo sistema.
- **Banco de Dados Institucional:** Banco de dados institucional externo que contém os dados acadêmicos de origem, incluindo os dados fornecidos pelo Moodle.

### Fluxo de dados

A arquitetura segue um fluxo de processamento assíncrono, representado pelas etapas de 1 a 7 no diagrama de arquitetura:

1. **Requisição do Front-End:** O Front-End envia uma requisição para a API para iniciar uma operação ou solicitar informações.

2. **Acesso aos dados locais:** A API pode consultar o Banco de Dados Local para recuperar indicadores previamente calculados e outras informações armazenadas.

3. **Orquestração das tarefas:** A API envia tarefas de processamento para o RabbitMQ e se comunica com o Banco de Dados Institucional quando é necessário acessar os dados de origem.

4. **Execução assíncrona:** Os Workers consomem as tarefas do RabbitMQ e executam as operações de processamento necessárias. Enquanto isso, a API pode retornar a resposta inicial ao Front-End.

5. **Coordenação da análise:** Os Workers se comunicam com o Sistema de Análise para coordenar o cálculo e a análise dos indicadores.

6. **Extração de dados do Moodle:** O Sistema de Análise utiliza o Mapeamento de Versões do Moodle e o Conector do Moodle apropriado para recuperar os dados necessários do Banco de Dados Institucional.

7. **Persistência dos resultados:** Após a conclusão dos cálculos e análises, os componentes de processamento armazenam os indicadores resultantes no Banco de Dados Local.

Essa arquitetura separa a interação com o usuário, a ingestão de dados, o processamento assíncrono e o cálculo dos indicadores, permitindo que operações potencialmente demoradas sejam executadas em segundo plano sem bloquear a interface web.

## Integração com o Moodle

O Prisma utiliza o Moodle como uma fonte institucional de dados acadêmicos.

A integração foi projetada para oferecer suporte a diferentes versões do Moodle por meio de conectores específicos e de uma camada de mapeamento responsável por adaptar a comunicação de acordo com a versão utilizada.

### Mapeamento de versões do Moodle

O componente de **Mapeamento de Versões do Moodle** determina qual conector e estratégia de comunicação devem ser utilizados para uma determinada versão do Moodle.

Essa abordagem permite que o Sistema de Análise mantenha um fluxo de processamento comum, isolando as diferenças específicas de cada versão nos respectivos conectores.

### Conectores do Moodle

Cada versão do Moodle suportada pode exigir um conector específico.

Os conectores são responsáveis por:

- Estabelecer a comunicação com o Moodle.
- Recuperar os dados acadêmicos necessários.
- Lidar com diferenças específicas de cada versão.
- Fornecer os dados ao Sistema de Análise no formato esperado.

### Versões do Moodle suportadas

As seguintes versões foram testadas com a integração atual:

| Versão do Moodle | Status | Observações |
| --- | --- | --- |
| 3.1.3 | Testada | Versão atualmente validada para o fluxo de integração. |

> Esta tabela deve ser atualizada sempre que uma nova versão do Moodle for testada e validada.

### Atualização para outra versão do Moodle

Ao migrar a integração para uma nova versão do Moodle, o seguinte procedimento deve ser seguido:

1. Identificar a versão do Moodle atualmente suportada pelo projeto.
2. Verificar as alterações introduzidas pela versão de destino.
3. Identificar alterações que possam afetar o processo de recuperação dos dados.
4. Verificar se o conector existente permanece compatível.
5. Atualizar o Mapeamento de Versões do Moodle, quando necessário.
6. Criar ou atualizar o Conector do Moodle correspondente.
7. Testar a autenticação e a comunicação com a nova versão do Moodle.
8. Testar a recuperação dos dados do Banco de Dados Institucional.
9. Validar o formato e a completude dos dados recuperados.
10. Executar o processo de cálculo dos indicadores.
11. Verificar se os indicadores resultantes foram armazenados corretamente no Banco de Dados Local.
12. Validar as visualizações correspondentes no Front-End.
13. Atualizar a tabela de versões suportadas nesta documentação.

Quaisquer alterações específicas de versão ou problemas de compatibilidade devem ser documentados nesta seção para facilitar futuras migrações.

## Processamento de dados

O Prisma utiliza processamento assíncrono para executar operações que podem exigir um tempo significativo de processamento.

A sequência geral de processamento é:

```text
Front-End
    │
    ▼
   API
    │
    ▼
RabbitMQ
    │
    ▼
 Workers
    │
    ▼
Sistema de Análise
    │
    ├── Mapeamento de Versões do Moodle
    │
    └── Conector do Moodle
             │
             ▼
Banco de Dados Institucional
             │
             ▼
Cálculo dos Indicadores
             │
             ▼
Banco de Dados Local

```

Essa arquitetura permite que operações de longa duração sejam executadas por processos em segundo plano, evitando bloquear a aplicação utilizada pelo usuário.

### Processamento assíncrono

O RabbitMQ atua como camada de comunicação entre a API e os Workers.

A API cria tarefas de processamento e as coloca na fila de mensagens. Os Workers consomem essas tarefas e executam as operações necessárias.

Essa separação permite que múltiplas tarefas de processamento sejam tratadas de forma independente e fornece um mecanismo para escalonar as operações executadas em segundo plano.

```text
Front-End
    │
    ▼
   API
    │
    ▼
RabbitMQ
    │
    ▼
 Workers
    │
    ▼
Sistema de Análise
    │
    ├── Mapeamento de Versões do Moodle
    │
    └── Conector do Moodle
             │
             ▼
Banco de Dados Institucional
             │
             ▼
Cálculo dos Indicadores
             │
             ▼
Banco de Dados Local
```

## Métricas e indicadores

O Prisma utiliza métricas e indicadores derivados para transformar dados acadêmicos em informações que podem apoiar o monitoramento e a análise.

A seção de métricas deve documentar o cálculo e a interpretação de cada métrica utilizada pelo sistema.

Para cada métrica, devem ser fornecidas as seguintes informações:

- **Objetivo:** O que a métrica representa.
- **Fonte dos dados:** Quais dados são utilizados.
- **Cálculo:** Fórmula ou procedimento utilizado.
- **Interpretação:** Como o valor resultante deve ser compreendido.
- **Implementação:** Onde a métrica é calculada ou utilizada no código.
- **Visualização:** Onde a métrica é apresentada no Front-End.

### Métricas utilizadas atualmente

| Métrica | Descrição | Fonte dos dados | Implementação |
| --- | --- | --- | --- |
| *A documentar* | | | |

### Cálculo dos indicadores

Os indicadores podem combinar uma ou mais métricas para fornecer informações de nível mais alto sobre o monitoramento acadêmico.

Para cada indicador, devem ser documentados:

- Métricas envolvidas.
- Método de cálculo ou agregação.
- Faixa de valores esperada.
- Interpretação.
- Onde é apresentado.
- Onde é calculado no código.

#### [Nome do indicador]

**Descrição:**  
[Descrição]

**Métricas envolvidas:**

- [Métrica]
- [Métrica]

**Cálculo:**  
[Fórmula ou procedimento]

**Interpretação:**  
[Interpretação]

**Apresentado em:**  
[Tela do Front-End]

## Banco de dados local

O Banco de Dados Local é responsável por armazenar os indicadores e resultados processados gerados pelo Prisma.

O banco de dados utiliza PostgreSQL.

As informações armazenadas permitem que o Front-End recupere resultados previamente calculados sem que seja necessário executar novamente todo o processo de análise a cada requisição.

> Os esquemas, tabelas e relacionamentos do banco de dados devem ser documentados aqui quando estiverem estáveis e forem relevantes para futuras atividades de manutenção.

## Manutenção

Modificações futuras no Prisma devem considerar as dependências entre seus componentes.

Alterações na integração com o Moodle, por exemplo, podem afetar a extração dos dados, o cálculo dos indicadores, a persistência e as visualizações.

Os seguintes aspectos devem ser considerados durante a manutenção:

- Compatibilidade com as versões do Moodle.
- Conectores do Moodle.
- Mapeamento de versões do Moodle.
- Comportamento da API.
- Configuração do RabbitMQ.
- Processos dos Workers.
- Sistema de Análise.
- Cálculo dos indicadores.
- Estrutura e persistência do banco de dados.
- Visualizações do Front-End.
- Autenticação e regras de acesso.
- Internacionalização.
- Dependências externas.

### Adicionando ou modificando uma métrica

Ao criar ou modificar uma métrica:

1. Identificar os dados necessários.
2. Verificar se os dados estão disponíveis no Banco de Dados Institucional.
3. Definir o cálculo.
4. Implementar a métrica no componente apropriado.
5. Validar os valores resultantes.
6. Verificar sua utilização nos indicadores.
7. Verificar as visualizações correspondentes no Front-End.
8. Atualizar esta documentação.
9. Testar o fluxo completo de dados.

### Adicionando suporte a uma nova versão do Moodle

Ao adicionar suporte a uma nova versão do Moodle:

1. Identificar as diferenças em relação às versões anteriormente suportadas.
2. Implementar ou atualizar o conector apropriado.
3. Atualizar o Mapeamento de Versões do Moodle.
4. Testar a conexão.
5. Testar a recuperação dos dados.
6. Executar o processo de análise.
7. Validar os indicadores gerados.
8. Atualizar a tabela de versões suportadas.
9. Documentar qualquer comportamento específico da versão.

## Testes e validação

Após alterações no sistema, o fluxo completo de processamento deve ser validado, quando aplicável:

```text
Moodle
  ↓
Conector do Moodle
  ↓
Sistema de Análise
  ↓
Cálculo dos Indicadores
  ↓
Banco de Dados Local
  ↓
API
  ↓
Front-End
```

A validação deve incluir:

- Comunicação bem-sucedida com o Moodle.
- Recuperação correta dos dados.
- Processamento assíncrono bem-sucedido.
- Cálculo correto dos indicadores.
- Persistência correta no PostgreSQL.
- Respostas corretas da API.
- Visualização correta no Front-End.

## Materiais adicionais

### Pitch do projeto

O pitch do projeto está disponível em:

[Prisma — Pitch do Projeto](LINK_DO_PITCH)

### Documentação principal

Para uma visão geral do projeto, consulte o [README principal](/README.pt-BR.md).

### Repositórios relacionados

- [Prisma Frontend](https://github.com/tarrafa-ufjf/Prisma-frontend)
- [Prisma Backend](https://github.com/tarrafa-ufjf/Prisma-backend)

## Documentação do projeto

Documentações adicionais do projeto estão disponíveis no diretório `docs/`.

- [Internacionalização](internacionalizacao.md)
- [Documentação Técnica](technical_documentation.md)

## Colaboradores

Para consultar a lista completa de colaboradores e a coordenação do projeto, consulte o [README principal](README.pt-BR.md).

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](/LICENSE).