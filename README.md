# SIBI - Sistema de Gerenciamento de Biblioteca

O **SIBI** é um sistema administrativo desenvolvido para o gerenciamento completo de uma biblioteca de forma virtual. O objetivo é proporcionar facilidade, segurança e praticidade no dia a dia da gestão bibliotecária.

## Funcionalidades

O SIBI oferece uma ampla gama de funcionalidades para simplificar e otimizar a gestão da biblioteca:

- [ ] **Autenticação Completa**: Cadastro de usuários, controle de acesso e gerenciamento de permissões.
- [ ] **Gerenciamento Completo da Biblioteca**: Cadastro de livros, controle de empréstimos e gerenciamento de usuários.
- [ ] **Cadastro de Livros**: Registro de novos livros com informações detalhadas, como título, autor, gênero, quantidade em estoque e descrição, com validações de dados para garantir a integridade.
- [ ] **Cadastro de Equipamentos**: Adição de equipamentos com detalhes específicos (modelo, número de série, quantidade) e validações para evitar duplicidades.
- [ ] **Agendamentos de Equipamentos**: Sistema de agendamento que controla a disponibilidade, validando a quantidade para não exceder o número disponível e permitindo novos agendamentos apenas após a devolução do equipamento.
- [ ] **Empréstimos de Livros**: Gerenciamento de empréstimos, com controle de estoque e atualização automática ao realizar empréstimos e devoluções.
- [ ] **Controle de Empréstimos e Agendamentos**: Monitoramento de todas as transações ativas, com histórico de retiradas e devoluções, e notificações de pendências.
- [ ] **Gestão de Usuários**: Cadastro e autenticação de usuários, com níveis de permissão e histórico de atividades para rastreamento de transações.
- [ ] **Segurança Avançada**: Políticas de acesso para proteger dados sensíveis.
- [ ] **Interface Intuitiva e Responsiva**: Design que facilita o acesso às informações e a execução de tarefas.
- [ ] **Análise de Métricas**: Registro de métricas de desempenho para análise e otimização do sistema.

## Como Executar o Projeto

Para executar o projeto localmente, siga os seguintes passos:

### Backend

1. **Clonar o Repositório**:
   Utilize o comando:

   ```bash
   git clone https://github.com/kaykeeb3/sibi-2024.git
   ```

2. **Navegar até o Servidor**:

   ```bash
   cd apps/server
   ```

3. **Copiar o arquivo com os dados de conexão e demais variáveis de ambiente**:

   ```bash
   cp .env.example .env
   ```

4. **Subir o serviço do PostgreSQL via Docker** (caso não tenha o PostgreSQL instalado em seu computador):

   ```bash
   docker-compose up -d
   ```

5. **Rodar as migrations do Prisma**:

   ```bash
   npx prisma migrate dev
   ```

6. **Subir o servidor HTTP**:

   ```bash
   npm run dev
   ```

### Frontend

Para executar a interface web do SIBI, utilize um navegador. Certifique-se de que o backend esteja rodando antes de acessar a aplicação.

1. **Navegar até o diretório do Frontend**:

   ```bash
   cd apps/web
   ```

2. **Instalar as dependências**:

   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

4. **Acessar a aplicação**:
   Abra seu navegador e vá para `http://localhost:3000`.

## Tech Stack 💜

### Web

- React.js
- TypeScript
- Tailwind CSS
- Shadcn UI

### Server

- Node.js (REST)
- Prisma
- PostgreSQL
- TypeScript

## Funcionalidades do SIBI 🚀

Aqui estão as funcionalidades implementadas no SIBI:

1. **Cadastro de Livros**: Permite o registro completo de livros com informações como título, autor, gênero, descrição e quantidade disponível.
2. **Controle de Empréstimos**: Gerenciamento de empréstimos e devoluções de livros, com registro de usuário, data de início e data de devolução.
3. **Gerenciamento de Usuários**: Cadastro e controle de usuários da biblioteca, incluindo seus dados pessoais e histórico de empréstimos.
4. **Validação de Dados**: Implementação de validações robustas para garantir a integridade e a precisão dos dados inseridos no sistema.
5. **Monitoramento de Disponibilidade**: Verificação em tempo real da disponibilidade de livros para empréstimo.
6. **Notificações de Atraso**: Sistema de notificações para alertar sobre devoluções em atraso.
7. **Relatórios de Atividades**: Geração de relatórios detalhados sobre a utilização da biblioteca e as atividades dos usuários.

## Contribuições 🆘

Estamos muito felizes em ter você interessado em contribuir com nosso projeto. Para facilitar a interação, gostaríamos de lembrar alguns pontos importantes:

### Discussões

Utilize a aba de discussões para compartilhar ideias e sugestões para o projeto.

### Issues

Se encontrar problemas ou quiser sugerir novas tarefas, utilize a aba de issues.

### Pull Requests

Se desejar contribuir com código, faça um fork do repositório e envie um pull request após suas alterações.

**Dica**💡: Não tenha medo de fazer um Pull Request; utilize essa oportunidade para receber feedbacks construtivos.
