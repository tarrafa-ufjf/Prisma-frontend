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

O projeto Prisma envolve diversos componentes técnicos, incluindo o **Front-End, Back-End, processamento assíncrono, sistema de análise, bancos de dados e integração com o Moodle**.

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

## Métricas e indicadores

O Prisma utiliza métricas e indicadores derivados para transformar dados do Moodle em informações para monitoramento e análise acadêmica.

Os indicadores são organizados em dois grupos:

- **Indicadores de estudantes:** Engajamento, Motivação, Desempenho, Interação Estudante-Instrutor, Profundidade Cognitiva e Risco de Evasão.
- **Indicadores de professores/tutores:** Acesso, Respostas em Fóruns e Feedback.

O processo de cálculo geralmente consiste em quatro etapas:

1. **Extração de dados:** os dados brutos são recuperados do banco de dados do Moodle.
2. **Cálculo das métricas:** os registros brutos do Moodle são transformados em métricas quantitativas.
3. **Discretização e agregação:** as métricas podem ser categorizadas e agregadas nos níveis de estudante, tutor, curso ou instituição.
4. **Persistência e visualização:** os indicadores resultantes são armazenados e disponibilizados no Front-End.

> Os cálculos descritos a seguir representam a metodologia dos indicadores implementada no Prisma. Os detalhes de implementação podem variar de acordo com a versão do Moodle e o respectivo conector.

### Indicadores de estudantes

Os indicadores de estudantes são calculados a partir de dados de atividade e desempenho acadêmico do Moodle. As principais dimensões consideradas são engajamento, motivação, desempenho, interação estudante-instrutor, profundidade cognitiva e risco de evasão.

| Indicador | Fonte Moodle | Métrica bruta |
| --- | --- | --- |
| **Engajamento** | `mdl_forum_posts` | Número total de postagens realizadas pelo estudante em fóruns avaliativos. |
| **Motivação** | `mdl_forum_posts` | Número total de postagens realizadas pelo estudante em fóruns não avaliativos. |
| **Desempenho** | `mdl_grade_grades` | Pontuação composta com base na nota absoluta e na posição relativa do estudante na distribuição de notas do curso. |
| **Interação Estudante-Instrutor** | `mdl_forum_posts`, `mdl_messages` | Frequência de trocas de mensagens diretas e respostas em fóruns entre estudantes e tutores. |
| **Profundidade Cognitiva** | `mdl_logstore_standard_log` | Pontuação de interação baseada na complexidade da atividade do estudante no Moodle. |
| **Risco de Evasão** | `mdl_user_lastaccess`, `mdl_logstore_*` | Classificação de risco baseada em inatividade e baixos níveis de desempenho, engajamento, motivação e profundidade cognitiva. |

### Discretização dos indicadores de estudantes

As métricas dos estudantes são categorizadas em relação à distribuição observada dentro do curso.

A classificação utiliza o primeiro quartil ($Q1$), o terceiro quartil ($Q3$) e o intervalo interquartil:

```text
IQR = Q3 - Q1

LowerBound = Q1 - 1.5 × IQR

UpperBound = Q3 + 1.5 × IQR
```

As categorias resultantes são:

| Categoria | Posição relativa |
| --- | --- |
| **Muito baixa** | Abaixo do limite inferior |
| **Baixa** | Entre o limite inferior e Q1 |
| **Média** | Entre Q1 e Q3 |
| **Alta** | Entre Q3 e o limite superior |
| **Muito alta** | Acima do limite superior |

Essa classificação relativa permite que os resultados dos estudantes sejam interpretados de acordo com as características de sua própria turma, em vez de considerar apenas valores absolutos.

### Engajamento

**Objetivo:**  
Mede a participação do estudante em fóruns avaliativos.

**Fonte de dados:**

- `mdl_forum_posts`

**Cálculo:**  
É contabilizado o número de postagens realizadas por cada estudante em fóruns associados a atividades avaliativas.

**Interpretação:**  
Valores mais altos indicam maior participação em atividades formais de discussão.

**Discretização:**  
O valor resultante é classificado em cinco níveis utilizando o procedimento de discretização dos estudantes descrito anteriormente.

---

### Motivação

**Objetivo:**  
Mede a participação voluntária ou não avaliativa do estudante nos espaços de discussão do Moodle.

**Fonte de dados:**

- `mdl_forum_posts`

**Cálculo:**  
É contabilizado o número de postagens realizadas por cada estudante em fóruns não avaliativos.

**Interpretação:**  
Valores mais altos indicam maior participação em espaços de interação que não estão diretamente associados à avaliação formal.

**Discretização:**  
O valor resultante é classificado em cinco níveis relativos.

---

### Desempenho

**Objetivo:**  
Representa o desempenho acadêmico do estudante considerando tanto o desempenho absoluto quanto sua posição em relação à turma.

**Fonte de dados:**

- `mdl_grade_grades`

**Cálculo:**  
O indicador de desempenho combina:

1. A nota absoluta do estudante.
2. A posição relativa do estudante na distribuição de notas da disciplina.

A pontuação final é calculada como a média aritmética desses dois componentes.

**Interpretação:**  
O indicador considera tanto a nota obtida pelo estudante quanto seu desempenho em relação aos demais estudantes da mesma disciplina.

**Categorias:**

| Categoria | Nota absoluta | Posição relativa |
| --- | --- | --- |
| **Muito baixa** | Abaixo de 39% | Abaixo do limite inferior |
| **Baixa** | 40–59% | Entre o limite inferior e Q1 |
| **Média** | 60–79% | Entre Q1 e Q3 |
| **Boa** | 80–89% | Entre Q3 e o limite superior |
| **Muito boa** | Acima de 90% | Acima do limite superior |

---

### Interação Estudante-Instrutor

**Objetivo:**  
Mede a interação entre estudantes e instrutores/tutores.

**Fontes de dados:**

- `mdl_forum_posts`
- `mdl_messages`

**Cálculo:**  
O indicador considera a frequência de trocas de mensagens diretas e de interações em fóruns entre estudantes e tutores.

**Interpretação:**  
Valores mais altos indicam maior interação entre o estudante e a equipe de ensino.

**Discretização:**  
A métrica resultante é classificada em cinco níveis relativos.

---

### Profundidade Cognitiva

**Objetivo:**  
Estima a profundidade do engajamento do estudante com base nos rastros observáveis de interação no Moodle.

**Fonte de dados:**

- `mdl_logstore_standard_log`

**Tipos de atividades considerados:**

- `assign`
- `quiz`
- `forum`

**Cálculo:**  
Os eventos do Moodle são organizados em níveis que representam graus crescentes de interação com uma atividade.

A progressão geral considera:

1. **Visualização:** o estudante acessa a atividade.
2. **Ação:** o estudante realiza uma tarefa ativa, como enviar uma atividade ou publicar em um fórum.
3. **Revisão/acompanhamento:** o estudante retorna à atividade, por exemplo, para visualizar um feedback ou revisar uma tentativa de questionário.

Para cada par estudante-atividade, é identificado o maior nível de interação alcançado. Esse valor é normalizado de acordo com a profundidade observável disponível para a atividade específica do Moodle.

A razão de realização resultante é transformada em uma escala contínua de **-1 a 1**:

- Valores menores indicam uma interação mais superficial.
- Valores maiores indicam uma interação mais profunda.

A pontuação final do estudante é calculada como a média entre as atividades `assign`, `quiz` e `forum` analisadas.

**Discretização:**  
A pontuação final é classificada em cinco níveis relativos.

---

### Risco de Evasão

**Objetivo:**  
Identifica estudantes que podem necessitar de acompanhamento mais próximo ou intervenção pedagógica.

**Fontes de dados:**

- `mdl_user_lastaccess`
- `mdl_logstore_*`

**Cálculo:**  
Um estudante é classificado como estando em risco quando apresenta simultaneamente **níveis baixos ou muito baixos** nos quatro principais indicadores estudantis:

- Engajamento
- Motivação
- Profundidade Cognitiva
- Desempenho

A presença simultânea dessas condições é utilizada como um mecanismo de sinalização de um possível risco de evasão.

**Interpretação:**  
O indicador destina-se ao monitoramento e não representa uma previsão definitiva de evasão.

---

### Agregação dos indicadores estudantis no nível da disciplina

Os indicadores estudantis podem ser agregados para produzir uma representação global de cada disciplina.

Para a maioria dos indicadores, o valor no nível da disciplina é obtido por meio da média aritmética dos valores correspondentes dos estudantes.

As seguintes métricas no nível da disciplina são calculadas:

- Média de engajamento.
- Média de motivação.
- Média de desempenho.
- Média de profundidade cognitiva.
- Média de interação estudante-instrutor.

Para **Risco de Evasão**, a métrica no nível da disciplina corresponde à proporção de estudantes classificados como estando em risco.

Os resultados no nível da disciplina podem posteriormente ser classificados em relação à distribuição das disciplinas da instituição utilizando as mesmas cinco categorias:

- `very_low`
- `low`
- `average`
- `high`
- `very_high`

---

## Indicadores de professores e tutores

Os indicadores de professores/tutores representam a atividade de ensino no Moodle. São consideradas três dimensões:

- **Acesso**
- **Respostas em Fóruns**
- **Feedback**

| Indicador | Fonte do Moodle | Métricas brutas |
| --- | --- | --- |
| **Acesso** | `mdl_logstore_standard_log` | Número de dias de acesso distintos, total de logins, acessos à disciplina, frequência semanal de login e período máximo de inatividade. |
| **Respostas em Fóruns** | `mdl_forum_posts` | Número de respostas, tempo de resposta e distribuição dos tempos de resposta. |
| **Feedback** | `mdl_assign_grades`, `mdl_feedback` | Número de atividades avaliadas, atividades com feedback, proporção de feedback e formatos de feedback. |

### Janela temporal de análise de professores/tutores

Os indicadores de tutores são calculados apenas dentro do período em que a disciplina esteve efetivamente ativa no Moodle.

A janela de análise é representada como:

```text
[t0, t1]
```

A janela é determinada a partir da série diária de eventos da disciplina. O procedimento identifica períodos de atividade consistente, evitando acessos isolados após a conclusão da disciplina.

O processo considera:

1. O volume de eventos observado ao longo do tempo.
2. Um critério mínimo de atividade.
3. Períodos contíguos de atividade regular.
4. Pequenas lacunas causadas por fins de semana, feriados ou breves interrupções.

O período com maior concentração de atividade é selecionado como a principal janela acadêmica.

Apenas as interações registradas dentro desse intervalo são consideradas para os indicadores dos tutores.

### Discretização de professores/tutores

As métricas dos tutores são discretizadas em cinco categorias relativas:

- **Muito baixa**
- **Baixa**
- **Média**
- **Alta**
- **Muito alta**

Diferentemente dos indicadores estudantis, as métricas dos tutores utilizam percentis em vez da abordagem baseada em IQR.

Os limites são:

| Categoria | Faixa |
| --- | --- |
| **Muito baixa** | Até P20 |
| **Baixa** | P20–P40 |
| **Média** | P40–P60 |
| **Alta** | P60–P80 |
| **Muito alta** | Acima de P80 |

Para métricas em que valores menores representam melhor desempenho, como tempo de resposta e período de inatividade, os rótulos são invertidos.

As categorias resultantes são convertidas em valores numéricos de `0` a `4` e agregadas para obter as pontuações compostas dos tutores.

---

### Acesso

**Objetivo:**  
Mede a presença e a regularidade do tutor no Moodle durante o período de atividade da disciplina.

**Fonte de dados:**

- `mdl_logstore_standard_log`

**Métricas brutas:**

- Número total de logins.
- Número total de acessos à disciplina.
- Frequência média semanal de login.
- Intervalo máximo de inatividade.

**Frequência semanal de login:**

```text
n_login_weekly = n_login / weeks
```

onde:

```text
weeks = max(((last_login - first_login) + 1) / 7, 1)
```

**Inatividade máxima:**

O maior período sem atividade registrada é calculado considerando:

- O período entre o início da janela de análise e o primeiro dia de atividade do tutor.
- O período entre o último dia de atividade do tutor e o final da janela de análise.
- As lacunas entre dias consecutivos de atividade.

**Interpretação:**

Maior frequência de acesso e períodos mais curtos de inatividade indicam maior presença e continuidade no Moodle.

---

### Respostas em Fóruns

**Objetivo:**  
Mede a capacidade de resposta do tutor às discussões em fóruns iniciadas pelos estudantes.

**Fonte de dados:**

- `mdl_forum_posts`

**Cálculo:**  
Para cada postagem iniciada por um estudante, são identificados o timestamp da postagem do estudante e o timestamp da primeira resposta do tutor.

O tempo de resposta é calculado em horas:

```text
response_time = (reply_timestamp - post_timestamp) / 3600
```

As respostas são agrupadas em três categorias:

| Categoria | Tempo de resposta |
|---|---|
| **Rápida** | ≤ 24 horas |
| **Normal** | > 24 e ≤ 120 horas |
| **Atrasada** | > 120 horas |

Também é calculada uma pontuação ponderada de responsividade:

```text
score =
(3 × fast + 2 × normal + 1 × late) / total_replies
```

Quando nenhuma resposta é registrada, os componentes temporais recebem o valor zero.

**Interpretação:**  
Pontuações mais altas indicam um maior volume de respostas e/ou respostas mais rápidas.

---

### Feedback

**Objetivo:**  
Mede a atividade do tutor na avaliação e no fornecimento de feedback aos estudantes.

**Fontes de dados:**

- `mdl_assign_grades`
- `mdl_feedback`

**Métricas:**

- Número de atividades avaliadas.
- Número de atividades avaliadas com feedback.
- Percentual de atividades avaliadas com feedback.
- Quantidade de feedback textual.
- Quantidade de feedback baseado em arquivos.

A proporção de feedback é calculada como:

```text
feedback_proportion =
(feedback_assignments / graded_assignments) × 100
```

**Interpretação:**

O indicador considera tanto o volume de avaliações quanto a consistência e o formato do feedback fornecido aos estudantes.

---

## Normalização e pontuações compostas no nível do tutor

As métricas dos tutores possuem diferentes escalas e características. Para torná-las comparáveis, as métricas são normalizadas utilizando a distribuição dos tutores da mesma instituição e versão do banco de dados do Moodle.

Os percentis 5 e 95 são utilizados como limites para reduzir a influência de valores extremos.

O valor normalizado é calculado como:

```text
x_norm =
(clip(x, P5, P95) - P5) /
(P95 - P5)
```
Para métricas em que valores menores representam melhor desempenho, o valor normalizado é invertido:

```text
x_norm_inv = 1 - x_norm
```

Isso produz uma interpretação comum na qual valores mais altos representam maior presença, atividade ou capacidade de resposta.

### Pontuação de Respostas em Fóruns

A pontuação de Respostas em Fóruns no nível do tutor combina:

- Número total de respostas.
- Tempo médio de resposta.
- Tempo mediano de resposta.

```text
score_forum =
(replies_norm +
 mean_time_norm_inv +
 median_time_norm_inv) / 3
 ```

 ### Pontuação de Acesso

A pontuação de Acesso no nível do tutor combina:

- Acesso geral ao Moodle.
- Acesso específico à disciplina.
- Período máximo de inatividade.

```text
score_access =
(general_access_norm +
 course_access_norm +
 inactivity_norm_inv) / 3
 ```

 ### Pontuação de Feedback

A pontuação de Feedback no nível do tutor combina:

- Número de atividades avaliadas.
- Número de atividades com feedback.
- Proporção de feedback.
- Feedback textual.
- Feedback baseado em arquivos.

```text
score_feedback =
(corrections_norm +
 corrections_with_feedback_norm +
 feedback_proportion +
 textual_feedback_norm +
 file_feedback_norm) / 5
 ```

 ---

## Agregação de tutores em nível de curso

Após o cálculo das três pontuações no nível do tutor, as pontuações são agregadas para cada curso.

Para cada curso, é utilizada a pontuação **mediana** entre os tutores atribuídos:

```text
Pontuação do Curso = mediana(pontuações dos tutores)
```

Três pontuações globais em nível de curso são, portanto, produzidas:

- `Respostas no Fórum`
- `Acesso`
- `Feedback`

A mediana é utilizada para reduzir a influência de valores extremos individuais dos tutores e representar o padrão predominante de tutoria dentro do curso.

### Classificação institucional

As pontuações dos tutores em nível de curso são classificadas em relação à distribuição dos cursos da mesma instituição e versão do banco de dados Moodle.

A posição percentual é dividida em cinco categorias:

| Posição percentual | Categoria |
| --- | --- |
| 0–20% | **Muito baixo** |
| 20–40% | **Baixo** |
| 40–60% | **Médio** |
| 60–80% | **Alto** |
| 80–100% | **Muito alto** |

Essas categorias são relativas à população institucional. Portanto, um curso classificado como **Muito alto** não representa necessariamente um limiar absoluto de qualidade; significa que sua pontuação está entre as mais altas do conjunto de cursos analisados.

Quando todos os cursos apresentam a mesma pontuação para uma dimensão, todos os cursos são classificados como **Médio**, para evitar diferenciações artificiais.

## Implementação dos indicadores

Os cálculos dos indicadores são implementados no Sistema de Análise e dependem dos conectores Moodle para recuperar os dados de origem necessários.

A dependência geral é:

```text
Banco de Dados Institucional
        │
        ▼
Conector Moodle
        │
        ▼
Dados Brutos do Moodle
        │
        ▼
Cálculo das Métricas
        │
        ▼
Cálculo dos Indicadores
        │
        ▼
Agregação / Discretização
        │
        ▼
Banco de Dados Local
        │
        ▼
Front-End
```

Ao adicionar ou modificar um indicador, a implementação deve ser documentada juntamente com:

- Tabelas de origem do Moodle.
- Métricas brutas.
- Procedimento de cálculo.
- Método de discretização ou normalização.
- Nível de agregação.
- Interpretação.
- Implementação no Sistema de Análise.
- Armazenamento no Banco de Dados Local.
- Visualização no Front-End.

### Status de implementação das métricas e indicadores

| Indicador | Estudante/Tutor | Principais fontes do Moodle | Status |
| --- | --- | --- | --- |
| Engajamento | Estudante | `mdl_forum_posts` | Implementado |
| Motivação | Estudante | `mdl_forum_posts` | Implementado |
| Desempenho | Estudante | `mdl_grade_grades` | Implementado |
| Interação Estudante-Instrutor | Estudante | `mdl_forum_posts`, `mdl_messages` | Implementado |
| Profundidade Cognitiva | Estudante | `mdl_logstore_standard_log` | Implementado |
| Risco de Evasão | Estudante | `mdl_user_lastaccess`, `mdl_logstore_*` | Implementado |
| Acesso | Tutor | `mdl_logstore_standard_log` | Implementado |
| Respostas no Fórum | Tutor | `mdl_forum_posts` | Implementado |
| Feedback | Tutor | `mdl_assign_grades`, `mdl_feedback` | Implementado |

## Banco de dados local

O Banco de Dados Local do Prisma utiliza **PostgreSQL** e é responsável por armazenar as configurações de conexão, o estado dos processos de análise e os indicadores calculados pelo Sistema de Análise.

Sua principal função é manter os resultados processados de forma persistente, permitindo que a API e o Front-End consultem os indicadores sem a necessidade de executar novamente todo o processo de análise a cada requisição.

O banco é organizado em tabelas que armazenam informações em diferentes níveis de granularidade, incluindo:

- **Configurações e controle do sistema**;
- **Status do processamento das disciplinas**;
- **Status individual dos indicadores**;
- **Indicadores de estudantes**;
- **Indicadores agregados de estudantes por disciplina**;
- **Indicadores de tutores**;
- **Indicadores agregados de tutores por disciplina**;
- **Status do agendador de tarefas**.

### Estrutura do banco de dados

As principais tabelas do Banco de Dados Local são:

| Tabela | Nível | Finalidade |
| --- | --- | --- |
| `configs` | Instituição | Armazena as configurações de conexão com o banco institucional e a versão do Moodle utilizada. |
| `subjects_status` | Disciplina | Armazena o status do processamento de uma disciplina. |
| `subject_indicator_status` | Disciplina / Indicador / Ator | Controla o status do processamento de cada indicador para uma disciplina e um tipo de ator. |
| `local_indicators_students` | Estudante / Disciplina | Armazena as métricas e classificações dos indicadores de cada estudante. |
| `global_indicators_students` | Disciplina | Armazena os indicadores estudantis agregados no nível da disciplina. |
| `local_indicators_tutors` | Tutor / Disciplina | Armazena as métricas e classificações dos indicadores de cada tutor. |
| `global_indicators_tutors` | Disciplina | Armazena os indicadores de tutores agregados no nível da disciplina. |
| `scheduler_status` | Sistema | Armazena o estado e a execução dos processos agendados. |

### Tabela `configs`

A tabela `configs` armazena as informações necessárias para estabelecer a conexão do Prisma com o Banco de Dados Institucional.

| Coluna | Tipo | Descrição |
| --- | --- | --- |
| `institution_id` | `Integer` | Identificador da instituição. |
| `version` | `String(40)` | Versão do Moodle utilizada pela instituição. |
| `host` | `String` | Endereço do servidor do banco institucional. |
| `port` | `Integer` | Porta utilizada para conexão. |
| `database` | `String` | Nome do banco de dados institucional. |
| `user` | `String` | Usuário utilizado na conexão. |
| `password` | `String(512)` | Senha da conexão, armazenada de forma criptografada. |

**Chave primária:**

```text
institution_id
```

A senha armazenada nessa tabela é criptografada por meio das funções `encrypt_config_secret()` e `decrypt_config_secret()`.

### Tabela `subjects_status`

A tabela `subjects_status` controla o estado do processamento das disciplinas.

| Coluna           | Tipo         | Descrição                                      |
| ---------------- | ------------ | ---------------------------------------------- |
| `institution_id` | `Integer`    | Identificador da instituição.                  |
| `subject_id`     | `Integer`    | Identificador da disciplina.                   |
| `status`         | `String(1)`  | Estado do processamento da disciplina.         |
| `start_date`     | `Date`       | Data inicial do período de análise.            |
| `end_date`       | `Date`       | Data final do período de análise.              |
| `updated_at`     | `DateTime`   | Data e hora da última atualização do registro. |
| `update_type`    | `String(50)` | Tipo de atualização realizada.                 |

Os estados utilizados pelo sistema incluem:

```text
P = Processing
D = Done
E = Error
```

Chave primária composta:

```text
institution_id + subject_id
```
### Tabela `subject_indicator_status`

A tabela `subject_indicator_status` permite controlar individualmente o processamento de cada indicador para uma disciplina e um determinado ator.

| Coluna           | Tipo         | Descrição                                                     |
| ---------------- | ------------ | ------------------------------------------------------------- |
| `institution_id` | `Integer`    | Identificador da instituição.                                 |
| `subject_id`     | `Integer`    | Identificador da disciplina.                                  |
| `actor`          | `String(20)` | Tipo de ator associado ao indicador, como estudante ou tutor. |
| `indicator_name` | `String(50)` | Nome do indicador.                                            |
| `status`         | `String(1)`  | Estado do processamento do indicador.                         |
| `updated_at`     | `DateTime`   | Data e hora da última atualização.                            |

Chave primária composta:

```text
institution_id + subject_id + actor + indicator_name
```

Essa tabela permite, por exemplo, identificar se um determinado indicador de estudantes ou tutores já foi processado para uma disciplina específica.

### Tabela `local_indicators_students`

A tabela `local_indicators_students` armazena os indicadores calculados individualmente para cada estudante em uma disciplina.

| Coluna                                 | Tipo         | Descrição                                                       |
| -------------------------------------- | ------------ | --------------------------------------------------------------- |
| `institution_id`                       | `Integer`    | Identificador da instituição.                                   |
| `version`                              | `String(40)` | Versão do Moodle.                                               |
| `subject_id`                           | `Integer`    | Identificador da disciplina.                                    |
| `student_id`                           | `Integer`    | Identificador do estudante.                                     |
| `n_posts_engagement`                   | `Integer`    | Número de postagens utilizadas para o indicador de engajamento. |
| `label_engagement`                     | `String(32)` | Classificação do engajamento.                                   |
| `n_posts_motivation`                   | `Integer`    | Número de postagens utilizadas para o indicador de motivação.   |
| `label_motivation`                     | `String(32)` | Classificação da motivação.                                     |
| `grade_performance`                    | `Float`      | Nota utilizada no cálculo do desempenho.                        |
| `grade_comparative_performance`        | `Float`      | Medida de desempenho comparativo em relação à turma.            |
| `label_performance`                    | `String(32)` | Classificação do desempenho.                                    |
| `mean_forum_interactions_cognitive`    | `Float`      | Média das interações cognitivas em fóruns.                      |
| `mean_quiz_interactions_cognitive`     | `Float`      | Média das interações cognitivas em questionários.               |
| `mean_assign_interactions_cognitive`   | `Float`      | Média das interações cognitivas em atividades.                  |
| `label_cognitive`                      | `String(32)` | Classificação da profundidade cognitiva.                        |
| `n_responses_relation_teacher_student` | `Integer`    | Número de interações entre estudante e professor/tutor.         |
| `label_relation_teacher_student`       | `String(32)` | Classificação da interação estudante-instrutor.                 |
| `label_give_up`                        | `String(32)` | Classificação relacionada ao risco de evasão.                   |

Chave primária composta:

```text
institution_id + version + subject_id + student_id
```

Essa tabela representa o nível local/individual, pois cada registro corresponde a um estudante dentro de uma disciplina.

### Tabela `global_indicators_students`

A tabela `global_indicators_students` armazena os indicadores estudantis agregados no nível da disciplina.

| Coluna                                    | Tipo         | Descrição                                              |
| ----------------------------------------- | ------------ | ------------------------------------------------------ |
| `institution_id`                          | `Integer`    | Identificador da instituição.                          |
| `version`                                 | `String(40)` | Versão do Moodle.                                      |
| `subject_id`                              | `Integer`    | Identificador da disciplina.                           |
| `mean_posts_engagement`                   | `Float`      | Média do indicador de engajamento dos estudantes.      |
| `label_engagement`                        | `String(32)` | Classificação global do engajamento.                   |
| `mean_posts_motivation`                   | `Float`      | Média do indicador de motivação dos estudantes.        |
| `label_motivation`                        | `String(32)` | Classificação global da motivação.                     |
| `mean_grade_performance`                  | `Float`      | Média do desempenho dos estudantes.                    |
| `label_performance`                       | `String(32)` | Classificação global do desempenho.                    |
| `mean_interactions_cognitive`             | `Float`      | Média da profundidade cognitiva dos estudantes.        |
| `label_cognitive`                         | `String(32)` | Classificação global da profundidade cognitiva.        |
| `mean_responses_relation_teacher_student` | `Float`      | Média da interação estudante-instrutor.                |
| `label_relation_teacher_student`          | `String(32)` | Classificação global da interação estudante-instrutor. |
| `mean_give_up`                            | `Float`      | Proporção/média relacionada ao risco de evasão.        |
| `label_give_up`                           | `String(32)` | Classificação global do risco de evasão.               |

Chave primária composta:

```text
institution_id + version + subject_id
```

Essa tabela representa o nível global da disciplina, sendo alimentada a partir dos resultados individuais dos estudantes.

### Tabela `local_indicators_tutors`

A tabela `local_indicators_tutors` armazena os indicadores calculados individualmente para cada tutor em uma disciplina.

| Coluna                               | Tipo         | Descrição                                                  |
| ------------------------------------ | ------------ | ---------------------------------------------------------- |
| `institution_id`                     | `Integer`    | Identificador da instituição.                              |
| `version`                            | `String(40)` | Versão do Moodle.                                          |
| `subject_id`                         | `Integer`    | Identificador da disciplina.                               |
| `tutor_id`                           | `Integer`    | Identificador do tutor.                                    |
| `median_forums_response_hours`       | `Float`      | Tempo mediano de resposta em fóruns, em horas.             |
| `mean_forums_response_hours`         | `Float`      | Tempo médio de resposta em fóruns, em horas.               |
| `total_response_forum`               | `Integer`    | Número total de respostas em fóruns.                       |
| `score_access`                       | `Float`      | Pontuação de acesso do tutor.                              |
| `mean_forums_response_hours_label`   | `String(32)` | Classificação do tempo médio de resposta.                  |
| `median_forums_response_hours_label` | `String(32)` | Classificação do tempo mediano de resposta.                |
| `score_access_label`                 | `String(32)` | Classificação da pontuação de acesso.                      |
| `label_forums_response`              | `String(32)` | Classificação geral das respostas em fóruns.               |
| `num_response_fast_forum`            | `Integer`    | Número de respostas rápidas.                               |
| `num_response_late_forum`            | `Integer`    | Número de respostas atrasadas.                             |
| `num_response_normal_forum`          | `Integer`    | Número de respostas normais.                               |
| `n_login`                            | `Integer`    | Número de logins realizados pelo tutor.                    |
| `n_login_subject`                    | `Integer`    | Número de acessos à disciplina.                            |
| `n_login_weekly`                     | `Integer`    | Frequência semanal de login.                               |
| `n_login_label`                      | `String(32)` | Classificação da frequência de login.                      |
| `maximum_inactivity_days`            | `Integer`    | Maior período de inatividade do tutor, em dias.            |
| `n_login_weekly_label`               | `String(32)` | Classificação da frequência semanal de login.              |
| `label_access`                       | `String(32)` | Classificação geral do acesso.                             |
| `maximum_inactivity_days_label`      | `String(32)` | Classificação do período máximo de inatividade.            |
| `n_corrections`                      | `Integer`    | Número de atividades avaliadas/corrigidas.                 |
| `n_corrections_with_feedback`        | `Integer`    | Número de atividades corrigidas com feedback.              |
| `percentage_feedback`                | `Float`      | Percentual de atividades avaliadas que receberam feedback. |
| `n_textual_feedback`                 | `Integer`    | Número de feedbacks textuais.                              |
| `n_feedback_pdf`                     | `Integer`    | Número de feedbacks fornecidos em arquivo/PDF.             |
| `n_corrections_label`                | `String(32)` | Classificação do número de correções.                      |
| `n_corrections_with_feedback_label`  | `String(32)` | Classificação das correções com feedback.                  |
| `percentage_feedback_label`          | `String(32)` | Classificação do percentual de feedback.                   |
| `n_textual_feedback_label`           | `String(32)` | Classificação do feedback textual.                         |
| `n_feedback_pdf_label`               | `String(32)` | Classificação do feedback em arquivo.                      |
| `label_feedback`                     | `String(32)` | Classificação geral do feedback.                           |

Chave primária composta:

```text
institution_id + version + subject_id + tutor_id
```

Essa tabela representa o nível local/individual dos tutores.

### Tabela `global_indicators_tutors`

A tabela `global_indicators_tutors` armazena os indicadores de tutores agregados no nível da disciplina.

| Coluna                  | Tipo         | Descrição                                     |
| ----------------------- | ------------ | --------------------------------------------- |
| `institution_id`        | `Integer`    | Identificador da instituição.                 |
| `version`               | `String(40)` | Versão do Moodle.                             |
| `subject_id`            | `Integer`    | Identificador da disciplina.                  |
| `score_global_forum`    | `Float`      | Pontuação global de respostas em fóruns.      |
| `label_global_forum`    | `String(32)` | Classificação global das respostas em fóruns. |
| `score_global_access`   | `Float`      | Pontuação global de acesso.                   |
| `label_global_access`   | `String(32)` | Classificação global do acesso.               |
| `score_global_feedback` | `Float`      | Pontuação global de feedback.                 |
| `label_global_feedback` | `String(32)` | Classificação global do feedback.             |


Chave primária composta:

```text
institution_id + version + subject_id
```

Os valores são obtidos a partir da agregação dos indicadores individuais dos tutores associados à disciplina.

### Tabela `scheduler_status`

A tabela `scheduler_status` armazena informações sobre a execução dos processos agendados do sistema.

| Coluna             | Tipo           | Descrição                                              |
| ------------------ | -------------- | ------------------------------------------------------ |
| `job_id`           | `String(100)`  | Identificador único do processo agendado.              |
| `channel`          | `String(50)`   | Canal associado ao processo.                           |
| `process_id`       | `Integer`      | Identificador do processo em execução.                 |
| `next_run_at`      | `DateTime`     | Data e hora previstas para a próxima execução.         |
| `heartbeat_at`     | `DateTime`     | Data e hora do último sinal de atividade do processo.  |
| `last_started_at`  | `DateTime`     | Data e hora do início da última execução.              |
| `last_finished_at` | `DateTime`     | Data e hora do término da última execução.             |
| `last_status`      | `String(20)`   | Status da última execução.                             |
| `last_error`       | `String(1000)` | Mensagem de erro da última execução, quando existente. |
| `updated_at`       | `DateTime`     | Data e hora da última atualização do registro.         |

### Relacionamento entre os dados

Os registros são organizados principalmente a partir da instituição, versão do Moodle e disciplina.

A estrutura de indicadores segue uma relação de agregação:

```text
Instituição
    │
    ├── Versão do Moodle
    │
    └── Disciplina
          │
          ├── Estudantes
          │      │
          │      └── local_indicators_students
          │
          ├── Indicadores agregados
          │      │
          │      └── global_indicators_students
          │
          └── Tutores
                 │
                 ├── local_indicators_tutors
                 │
                 └── global_indicators_tutors
```

Além das tabelas de indicadores, o banco mantém tabelas de controle responsáveis pelo acompanhamento do processamento:

```text
configs
    │
    └── Configuração da instituição

subjects_status
    │
    └── Status de processamento da disciplina

subject_indicator_status
    │
    └── Status de processamento por indicador

scheduler_status
    │
    └── Status dos processos agendados
```

### Níveis de armazenamento

Os indicadores são armazenados em dois níveis principais:

| Nível                   | Tabela                       | Unidade de análise                 |
| ----------------------- | ---------------------------- | ---------------------------------- |
| **Local — Estudante**   | `local_indicators_students`  | Estudante dentro de uma disciplina |
| **Global — Estudantes** | `global_indicators_students` | Disciplina                         |
| **Local — Tutor**       | `local_indicators_tutors`    | Tutor dentro de uma disciplina     |
| **Global — Tutores**    | `global_indicators_tutors`   | Disciplina                         |

Essa separação permite que o Prisma mantenha tanto os resultados individuais, utilizados para análises mais detalhadas, quanto os resultados agregados, utilizados na apresentação dos indicadores no nível da disciplina.

### Diagrama entidade-relacionamento

A estrutura conceitual do Banco de Dados Local pode ser representada pelo seguinte relacionamento:

<p align="center">
  <img src="docs/assets/DER_prisma.png" alt="Diagrama Entidade-Relacionamento" width="60%">
</p>

### Persistência dos indicadores

O fluxo de persistência dos indicadores pode ser resumido como:

```text
Banco de Dados Institucional
          │
          ▼
     Conector Moodle
          │
          ▼
   Sistema de Análise
          │
          ▼
 Cálculo das métricas
          │
          ▼
 Cálculo dos indicadores
          │
          ├───────────────────────┐
          ▼                       ▼
Indicadores locais          Agregação
          │                       │
          │                       ▼
          │              Indicadores globais
          │                       │
          └───────────┬───────────┘
                      ▼
             Banco de Dados Local
                      │
                      ▼
                     API
                      │
                      ▼
                  Front-End
```

Dessa forma, o Banco de Dados Local funciona como a camada de persistência dos resultados produzidos pelo Sistema de Análise, mantendo separados os dados individuais dos estudantes e tutores e os indicadores agregados no nível das disciplinas.

## Manutenção

Modificações futuras no Prisma devem considerar as dependências entre seus componentes.

Alterações na integração com o Moodle, por exemplo, podem afetar a extração dos dados, o cálculo dos indicadores, a persistência e as visualizações.

Os seguintes aspectos devem ser considerados durante a manutenção:

* Compatibilidade com as versões do Moodle.
* Conectores do Moodle.
* Mapeamento de versões do Moodle.
* Comportamento da API.
* Configuração do RabbitMQ.
* Processos dos Workers.
* Sistema de Análise.
* Cálculo dos indicadores.
* Estrutura e persistência do banco de dados.
* Visualizações do Front-End.
* Autenticação e regras de acesso.
* Internacionalização.
* Dependências externas.

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

O suporte a uma nova versão do Moodle é implementado principalmente na camada de mapeamento e conectores do Moodle.

```text
src/
└── analysis_lib/
    └── mapper/
        ├── map.py
        ├── moodle.py
        └── connectors/
            └── moodle3_1.py
```

Atualmente, o Prisma fornece um conector específico para o Moodle 3.1.3:

```text
src/analysis_lib/mapper/connectors/moodle3_1.py
```

O componente `map.py` é responsável por identificar a versão do Moodle e selecionar o conector correspondente.

O fluxo geral é:

```text
Conexão com o Banco de Dados do Moodle
          │
          ▼
        map.py
          │
          ├── get_moodle_version()
          │
          ▼
     Versão identificada
          │
          ▼
       get_moodle()
          │
          ├── 3.1.3 → Moodle31
          │
          └── nova versão → MoodleXX
                              │
                              ▼
                       Consultas específicas
                         da versão
```

### Identificar a versão atual do Moodle

A versão do Moodle é obtida diretamente do banco de dados institucional por meio da seguinte consulta:

```sql
SELECT name, value
FROM mdl_config
WHERE name = 'release'
```

Essa operação é realizada por:

```text
src/analysis_lib/mapper/map.py
└── Mapper.get_moodle_version()
```

O método recupera a versão de lançamento do Moodle, que posteriormente é utilizada para selecionar o conector apropriado.

### 2. Verificar como a versão é mapeada

O método `get_moodle()` em `map.py` associa as versões do Moodle suportadas aos seus respectivos conectores.

Por exemplo:

```python
def get_moodle(self, connector, version):
    match version:
        case '3.1.3':
            return Moodle31(connector)
        case _:
            raise ValueError("Unsupported Moodle version")
```

Ao adicionar uma nova versão, um novo `case` deve ser incluído no mapeamento de versões.

Por exemplo, para adicionar suporte ao Moodle `4.1.0`:

```python
case '4.1.0':
    return Moodle410(connector)
```

### 3. Criar o conector para a nova versão

Crie um novo arquivo de conector em:

```text
src/analysis_lib/mapper/connectors/
```

Por exemplo:

```text
src/analysis_lib/mapper/connectors/moodle4_1.py
```

O novo conector deve seguir a estrutura do conector específico da versão existente:

```python
from ..moodle import Moodle

class Moodle410(Moodle):
    ...
```

O conector é responsável por implementar ou adaptar as consultas necessárias ao Prisma para a versão do Moodle escolhida.

O conector existente pode ser utilizado como referência inicial:

```text
src/analysis_lib/mapper/connectors/moodle3_1.py
```

As consultas SQL existentes não devem ser consideradas automaticamente compatíveis com a nova versão. As tabelas, campos e relacionamentos do banco de dados do Moodle devem ser verificados antes de reutilizá-las.

### 4. Verificar os métodos utilizados pelo Mapper

O componente `map.py` contém métodos que encaminham as requisições para o conector do Moodle selecionado.

Os métodos atualmente utilizados pelo sistema incluem:

```text
get_general_query()
get_engagement_data()
get_all_students()
get_courses()
get_activity_weights()
get_grades_by_course()
get_foruns_non_required()
get_forum_data()
get_course_forum_viewed()
get_forum_post_created()
forum_reply_viewed()
get_assign_submission_status_viewed()
get_assign_assessable_submitted()
get_assign_feedback_viewed()
get_quizz_viewed()
get_quizz_attempt_submitted()
get_quizz_attempt_reviewd()
fetch_subject_info()
fetch_total_enrollment()
get_pct_usage_resource()
get_all_subjects()
get_daily_active_subjects()
get_week_active_subjects()
get_month_active_subjects()
fetch_student_summary()
fetch_student_grades()
fetch_subjects_summary()
fetch_institution_info()
fetch_responses_forums()
fetch_subjects_summary()
fetch_tutors_login_subject()
fetch_daily_events()
fetch_subject_info_tutors()
fetch_tutors_names()
fetch_tutors_names_by_ids()
fetch_forum_messages_counts()
fetch_tutor_summary()
fetch_institution_info_tutors()
fetch_tutors_feedback_subject()
fetch_tutors_access_days()
fetch_all_tutors()
fetch_subjects_summary_tutors()
```

Esses métodos devem ser comparados com os métodos disponíveis no novo conector.

A relação geral é:

```text
Mapper
   │
   ├── identifica a versão do Moodle
   │
   ├── seleciona o conector correspondente
   │
   ▼
Moodle410
   │
   ├── get_courses()
   ├── get_grades_by_course()
   ├── get_forum_data()
   ├── ...
   │
   ▼
Banco de Dados do Moodle
```

Os métodos do `Mapper` normalmente não precisam ser duplicados para cada versão do Moodle. Em vez disso, o comportamento específico de cada versão deve ser implementado no conector selecionado por `get_moodle()`.

### 5. Comparar as consultas SQL

O arquivo:

```text
src/analysis_lib/mapper/connectors/moodle3_1.py
```

contém as consultas SQL utilizadas pelo Prisma para recuperar dados do Moodle.

Ao adicionar uma nova versão do Moodle, cada consulta deve ser revisada para verificar se:

* as tabelas necessárias ainda existem;
* os campos necessários ainda existem;
* os nomes dos campos não foram alterados;
* os relacionamentos entre as tabelas permanecem válidos;
* os valores retornados possuem o formato esperado;
* as funções SQL utilizadas pelas consultas continuam disponíveis;
* as consultas ainda retornam todos os dados necessários para os indicadores.

Por exemplo, se o conector existente contém:

```sql
SELECT *
FROM mdl_course
```

a estrutura de `mdl_course` deve ser verificada na versão do Moodle de destino.

Consultas que dependem de estruturas específicas de uma versão do Moodle devem ser adaptadas no novo conector quando necessário.

### 6. Criar uma cópia inicial do conector

Uma abordagem recomendada é utilizar o conector existente como ponto de partida para a nova versão:

```text
moodle3_1.py
      │
      │ copiar e adaptar
      ▼
moodle4_1.py
```

O novo conector deve então ser revisado e modificado apenas nos pontos em que a versão de destino apresentar diferenças.

Manter as implementações específicas de cada versão em conectores separados evita a introdução de lógica condicional específica de versão em diversas consultas individuais.

### 7. Registrar o novo conector em `map.py`

Importe a nova classe do conector em `map.py`:

```python
from .connectors.moodle3_1 import Moodle31
from .connectors.moodle4_1 import Moodle410
```

Em seguida, adicione a nova versão ao método `get_moodle()`:

```python
def get_moodle(self, connector, version):
    match version:
        case '3.1.3':
            return Moodle31(connector)
        case '4.1.0':
            return Moodle410(connector)
        case _:
            raise ValueError("Unsupported Moodle version")
```

### 8. Testar a identificação da versão do Moodle

Antes de testar os indicadores, verifique se o Prisma identifica corretamente a nova versão do Moodle.

O fluxo esperado é:

```text
Banco de Dados do Moodle
     │
     ▼
mdl_config
     │
     ▼
get_moodle_version()
     │
     ▼
"4.1.0"
     │
     ▼
get_moodle()
     │
     ▼
Moodle410
```

A configuração da conexão com o Moodle também pode ser testada por meio das rotas administrativas do Back-End:

```text
/admin/moodle-config
/admin/moodle-config/test
```

Essas rotas utilizam:

```
pre_api/services/moodle_config_service.py
```

### 9. Testar as consultas individualmente

Antes de executar todo o pipeline de processamento dos indicadores, as consultas do novo conector devem ser testadas individualmente.

No mínimo, deve-se verificar:

* recuperação de cursos;
* recuperação de estudantes;
* recuperação de notas;
* recuperação de fóruns;
* recuperação de atividades;
* recuperação de informações dos cursos;
* recuperação de dados dos tutores;
* recuperação de eventos;
* dados necessários para os indicadores dos estudantes;
* dados necessários para os indicadores dos tutores.

O objetivo não é apenas verificar se as consultas são executadas com sucesso, mas também se seus resultados possuem a estrutura esperada pelo restante do sistema.

### 10. Executar o pipeline de processamento dos indicadores

Após validar o conector, execute o pipeline normal de processamento:

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
```

Verifique se todos os indicadores dependentes dos dados do Moodle continuam sendo calculados corretamente.

### 11. Validar os resultados no Front-End

Por fim, verifique se os dados processados são exibidos corretamente no Front-End.

A validação deve incluir:

* indicadores;
* rankings;
* gráficos;
* informações dos estudantes;
* informações dos cursos;
* informações dos tutores;
* outras visualizações dependentes dos dados do Moodle.

### Checklist para adicionar uma nova versão do Moodle

- [ ] Identificar a versão do Moodle.
- [ ] Verificar alterações na estrutura do banco de dados do Moodle.
- [ ] Comparar as tabelas e os campos utilizados pelo Prisma.
- [ ] Criar o novo conector em src/analysis_lib/mapper/connectors/.
- [ ] Adaptar as consultas SQL necessárias.
- [ ] Verificar todos os métodos utilizados pelo Mapper.
- [ ] Registrar o novo conector em map.py.
- [ ] Testar a identificação da versão do Moodle.
- [ ] Testar a conexão com o Moodle.
- [ ] Testar a recuperação dos dados.
- [ ] Executar o cálculo dos indicadores.
- [ ] Validar os dados armazenados no Banco de Dados Local.
- [ ] Validar as visualizações do Front-End.
- [ ] Adicionar a nova versão à tabela de versões suportadas.
- [ ] Documentar comportamentos específicos da versão.

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