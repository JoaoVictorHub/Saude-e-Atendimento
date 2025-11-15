`Acesse o site por aqui`: https://saude-e-atendimento.vercel.app/

<h1 align="center"> 🏥 Saúde e Atendimento </h1>

## 🚧 O que é esse projeto?

Este é um Sistema Web de Atendimento de Pacientes que simula o fluxo de trabalho de uma clínica ou posto de saúde, desde o registro do paciente até a finalização do atendimento e emissão de relatórios gerenciais.

## 📁 Como funciona?

O sistema opera com um fluxo simples e eficiente, priorizando a usabilidade e as regras de negócio de saúde:

* **Autenticação e Segurança:** O acesso é protegido por login e senha. Cada usuário possui sua própria sessão (com um menu dedicado para alterar sua senha ou deslogar do sistema) e seus dados de pacientes são isolados dos demais.
* **Registro de Pacientes:** Permite cadastrar novos pacientes, calculando automaticamente a idade e a categoria (Criança, Adolescente, Adulto, Idoso).
* **Priorização Algorítmica (Ordenação):** A lista de espera é exibida com base em um algoritmo de ordenação interna que garante que pacientes idosos (60+ anos) sejam sempre mostrados no topo da fila, respeitando a prioridade legal e médica.
* **Atendimento e Avaliação:** Após o atendimento, o paciente é removido da fila e movido para a lista de atendidos. O sistema solicita o registro de uma avaliação sobre o tempo de espera e a nota do serviço.
* **Relatórios:** Permite a impressão de um Comprovante Individual de Atendimento e um Relatório Geral que inclui o nome do usuário que gerou o documento, reforçando a rastreabilidade.

## 🛠️ Tecnologias Utilizadas:

* **HTML:** Estrutura semântica e base de todos os formulários e interfaces.
* **CSS:** Estilização responsiva, seguindo boas práticas de organização de código.
* **JavaScript:** Contém toda a lógica de aplicação (manipulação do DOM, persistência de dados (localStorage), autenticação e algoritmos de ordenação/priorização).

## 🔎 Observações:

* **Persistência de Dados:** Os dados de pacientes, usuários e sessões são armazenados no **`localStorage`** do navegador. Isso significa que os dados são mantidos entre as sessões do mesmo usuário, mas **não são compartilhados** em tempo real entre diferentes dispositivos ou navegadores.
* **Separação de Dados:** A chave de armazenamento de pacientes é vinculada ao nome do usuário logado, garantindo que um usuário só veja os pacientes que ele registrou, e o outro usuário só veja os pacientes que ele registrou.
* **Algoritmos de Prioridade:** A funcionalidade central da fila se baseia na **Ordenação Interna** para aplicar a regra de prioridade de idade.
