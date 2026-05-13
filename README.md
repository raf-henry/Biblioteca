# 📚 BibliotecaSystem - Gestão de Biblioteca (Projeto Full-Stack Premium)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Uma solução full-stack moderna e sofisticada para gerenciamento de bibliotecas, projetada com foco em experiência do usuário (**UX**) e uma estética **Premium Minimalista** inspirada em grandes sistemas de design modernos.

---

## ✨ Funcionalidades Principais

- **📊 Dashboard Inteligente**: Visualize métricas em tempo real (Total de Livros, Exemplares Disponíveis, Empréstimos Ativos e Atrasos).
- **📖 Inventário de Livros**: Gestão completa de acervo com metadados estendidos (Ano, Gênero, ISBN) e controle dinâmico de estoque.
- **🤝 Sistema de Empréstimos**: 
  - Fluxo de retirada e devolução simplificado com alinhamento visual preciso.
  - **Cálculo de Multas Automático**: R$ 2,00 por dia de atraso.
  - Verificação automática de disponibilidade de estoque.
- **👤 Gestão de Autores**: Cadastro organizado de autores e suas nacionalidades.
- **🎨 Design Premium & Dinâmico**: Interface baseada em alto contraste, grids de 8px, formas em pílula e animações de entrada fluidas.
- **📈 Gráficos Modernos**: Visualização de livros mais emprestados com barras em degradê.
- **🚀 Performance**: Implementado com **Angular Signals** e modo **Zoneless** para máxima reatividade.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Angular 19+**: Componentes Standalone e Signals API.
- **CSS3**: Design System proprietário baseado em estética Retail Premium.
- **Zoneless**: Gerenciamento de mudanças de alto desempenho.

### Backend
- **Java 17 / Spring Boot 3.4**: API REST robusta e escalável.
- **Spring Data JPA**: Abstração de dados e persistência.
- **PostgreSQL**: Banco de dados relacional robusto.
- **Lombok**: Redução de boilerplate code.
- **Spring Security**: Configurações de CORS e proteção básica.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- **Java 17** ou superior instalado.
- **Node.js 20+** e **npm** instalados.
- **PostgreSQL** rodando localmente.

### 1. Configuração do Banco de Dados
1. Crie um banco de dados no PostgreSQL chamado `Projeto02`.
2. O sistema criará automaticamente as tabelas ao iniciar pela primeira vez (DDL auto-update).

### 2. Configuração do Backend
No arquivo `src/main/resources/application.properties`, ajuste as credenciais se necessário:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/Projeto02
spring.datasource.username=postgres
spring.datasource.password=sua_senha
```

### 3. Rodando a Aplicação
Você pode rodar ambos os projetos simultaneamente usando o script raiz:

```bash
# Na pasta raiz do projeto
npm install
npm run dev
```

Ou separadamente:

**Backend:**
```bash
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

A aplicação estará disponível em `http://localhost:4200`.

---

## 📂 Estrutura do Projeto

```
Biblioteca/
├── src/main/java/.../        # Backend Spring Boot (API)
├── frontend/                 # Frontend Angular
│   ├── src/app/components/   # Componentes da UI (Dashboard, Books, etc)
│   ├── src/app/services/     # Integração com API
│   └── src/app/models/       # Interfaces de dados
└── README.md
```

---

## 👨‍💻 Autor
Desenvolvido como projeto de portfólio para demonstrar habilidades em **Full-Stack Development**, **Arquitetura de Software** e **Design de Interface Moderno**.

---
*Este projeto utiliza Hibernate para mapeamento objeto-relacional e Angular Signals para uma experiência de usuário sem engasgos.*
