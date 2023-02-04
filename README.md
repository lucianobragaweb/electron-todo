# Desafio Front-End - Solarwish Games

### Introdução

Seu desafio é criar um aplicativo Web que tenha **integração entre Electron e ReactJS**. Para adiantar seu trabalho, já inicializamos **dois projetos** para que você os utilize como **base**.

### Requisitos

- O aplicativo deve possibilitar o **cadastro, a visualização e edição de tarefas** "To-do". 
- O aplicativo deve ser acessado através da **aplicação Desktop** exibindo a **página web gerada pelo ReactJS**.
- O aplicativo deve possuir uma **API integrada com o Electron** para **persistir os dados** no computador do usuário. **Não é permitido utilizar os cookies do navegador.**
- O aplicativo deve permitir que os usuários **marquem e desmarquem tarefas como concluídas.**
- Um **design responsivo e moderno** afetará positivamente a sua pontuação.

### Instruções

1. Clone esse repositório para o seu computador
2. Execute a instalação dos pacotes (**npm install**) em ambas pastas (web e electron).
3. Utilize o próprio **ambiente de desenvolvimento Web do React** para visualizar sua aplicação no Electron.
4. Se possível, grave toda a sua tela durante o processo de desenvolvimento. **Não é necessário a gravação do seu microfone** e também **não é proibido a utilização de consultas** no meio do teste.
5. Para entregar o seu projeto, crie um repositório e compartilhe o link no **Formulário que enviamos na Reunião da Entrevista.**

### Persistência dos Dados

Você pode armazenar os dados localmente de qualquer forma. Nosso único pedido é que utilize esse modelo abaixo:

###### electron/src/preload.js 
	Utilize para tornar a API do Electron acessível ao React.<br>
    Por padrão, esse script define o objeto global "app" disponível e testável através do Console do Electron.
###### electron/src/ipc.js
	Esse arquivo gerencia os eventos que serão ouvidos após a invocação dos métodos no aplicativo React.<br>Utilize-o para chamar métodos responsáveis pelo armazenamento de dados.
###### electron/src/storage.js **(opcional)**
	Esse arquivo é opcional e pode ser usado para armazenar os métodos que gerenciarão o armazenamento de dados da aplicação Desktop.