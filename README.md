# Reinventar-se: O que te move?

Uma experiência digital interativa de autoconhecimento, adaptada do jogo de cartas "Combustível Interior". Este projeto convida o usuário a uma jornada de reflexão através de perguntas poderosas divididas em cinco categorias essenciais.

![Reinventar-se Preview](/src/assets/landing-logo.jpg)

## 🌟 Sobre o Projeto

"Reinventar-se" é uma aplicação web que digitaliza a experiência de um jogo de cartas terapêutico. O objetivo é proporcionar um momento de pausa e introspecção, onde o usuário pode explorar diferentes aspectos de sua vida através de perguntas aleatórias e citações inspiradoras.

### Categorias
O jogo é dividido em 5 pilares fundamentais, cada um com sua identidade visual:
- **Curiosidade** (Azul): O despertar dos sentidos e da atenção.
- **Propósito** (Laranja): O sentido da vida e legado.
- **Ação** (Vermelho): O movimento e a superação.
- **Realização** (Verde): A celebração das conquistas e aprendizados.
- **Reinvenção** (Roxo): O abrir espaço para o novo.

## ✨ Funcionalidades

- **Roda Interativa de Seleção**: Uma interface circular animada para escolha das categorias.
- **Slider Infinito de Cartas**: Navegação fluida para seleção das cartas dentro de cada categoria, com capas personalizadas.
- **Animações 3D**: Efeito realista de "virar" a carta (flip) para revelar a pergunta.
- **Design Responsivo**: Interface adaptada para funcionar bem em dispositivos móveis e desktop.
- **Persistência de Dados**: As reflexões do usuário são salvas localmente no navegador.
- **Identidade Visual Premium**: Paleta de cores harmoniosa, tipografia elegante e transições suaves.

## 🛠️ Tecnologias Utilizadas

- **Vite**: Build tool rápida e leve.
- **Vanilla JavaScript**: Lógica da aplicação sem dependência de frameworks pesados.
- **CSS3 Moderno**: Uso de variáveis CSS, Flexbox, Grid e animações (Keyframes, Transitions).
- **HTML5**: Estrutura semântica.

## 🚀 Como Executar

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório** (ou baixe os arquivos):
   ```bash
   git clone <url-do-repositorio>
   cd combustivel-interior
   ```

2. **Instale as dependências**:
   Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**:
   Abra seu navegador e vá para o endereço indicado no terminal (geralmente `http://localhost:5173`).

## 📂 Estrutura do Projeto

```
combustivel-interior/
├── index.html          # Ponto de entrada da aplicação
├── package.json        # Dependências e scripts
├── public/             # Arquivos estáticos públicos
├── src/
│   ├── assets/         # Imagens e recursos visuais
│   ├── data.js         # Base de dados das perguntas e categorias
│   ├── main.js         # Lógica principal da aplicação
│   ├── store.js        # Gerenciamento de estado (LocalStorage)
│   └── style.css       # Estilos globais e componentes
└── vite.config.js      # Configuração do Vite
```

## 🎨 Design System

O projeto utiliza uma paleta de cores específica para reforçar a identidade de cada categoria:

| Categoria    | Cor       | Hex     |
|--------------|-----------|---------|
| Curiosidade  | Azul      | #246CA0 |
| Propósito    | Laranja   | #F89D42 |
| Ação         | Vermelho  | #E74930 |
| Realização   | Verde     | #056D41 |
| Reinvenção   | Roxo      | #903B91 |

---

Desenvolvido com 💜 e código.
