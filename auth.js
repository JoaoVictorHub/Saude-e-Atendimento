// Simula um "banco de dados" local (localStorage) para usuários
const USERS_STORAGE_KEY = 'sistema_usuarios';
// Armazena o nome do usuário logado, ou null se deslogado
const LOGGED_IN_KEY = 'sistema_usuario_logado'; 

/**
 * @returns {Array} Obtém a lista de usuários armazenada localmente
 */
function getUsuarios() {
    const usuariosJSON = localStorage.getItem(USERS_STORAGE_KEY);
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
}

/**
 * @returns {string|null} Obtém o nome do usuário atualmente logado
 */
function getUsuarioLogado() {
    return localStorage.getItem(LOGGED_IN_KEY);
}

// Redireciona o usuário para a página principal se estiver logado
function checarLogin() {
    const usuarioLogado = getUsuarioLogado();
    if (usuarioLogado) {
        // Redireciona para a página de atendimento se já estiver logado
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('cadastro.html')) {
            window.location.href = 'atendimento.html';
        }
    } else {
        // Redireciona para o login se não estiver logado e tentar acessar atendimento.html
        if (window.location.pathname.endsWith('atendimento.html')) {
            window.location.href = 'index.html';
        }
    }
}
// Executa a checagem de login em todas as páginas
document.addEventListener('DOMContentLoaded', checarLogin);

// Funções de Cadastro
function fazerCadastro() {
    const usuario = document.getElementById('cadastroUsuario').value.trim();
    const senha = document.getElementById('cadastroSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (usuario.length < 5 || senha.length < 8) {
        exibirFeedback('⚠️ Usuário deve ter no mínimo 5 caracteres e Senha 8 caracteres.', 'error', 'authResultado');
        return;
    }
    if (senha !== confirmarSenha) {
        exibirFeedback('⚠️ As senhas digitadas não coincidem.', 'error', 'authResultado');
        return;
    }
    const usuarios = getUsuarios();
    if (usuarios.find(u => u.usuario === usuario)) {
        exibirFeedback('⚠️ Usuário já existe. Tente um nome diferente.', 'error', 'authResultado');
        return;
    }

    // Hash da senha
    const novoUsuario = { usuario, senha: senha };
    usuarios.push(novoUsuario);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usuarios));
    exibirFeedback('✅ Cadastro realizado com sucesso! Redirecionando para o login...', 'success', 'authResultado');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Funções de Login
function fazerLogin() {
    const usuario = document.getElementById('loginUsuario').value.trim();
    const senha = document.getElementById('loginSenha').value;
    const usuarios = getUsuarios();

    // Busca o usuário e verifica a senha
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);
    if (usuarioEncontrado) {
        // Armazena o nome do usuário logado
        localStorage.setItem(LOGGED_IN_KEY, usuarioEncontrado.usuario);
        exibirFeedback('✅ Login bem-sucedido! Acessando o sistema...', 'success', 'authResultado');
        setTimeout(() => {
            window.location.href = 'atendimento.html';
        }, 1500);
    } else {
        exibirFeedback('❌ Usuário ou senha inválidos.', 'error', 'authResultado');
    }
}

// Desloga o usuário e o redireciona para a página de login
function deslogarUsuario() {
    localStorage.removeItem(LOGGED_IN_KEY);
    window.location.href = 'index.html';
}

/**
 * Altera a senha do usuário logado.
 * @param {string} novaSenha - A nova senha a ser salva.
 */
function alterarSenha(novaSenha) {
    const usuarioLogado = getUsuarioLogado();
    if (!usuarioLogado) {
        alert("Nenhum usuário logado.");
        return false;
    }

    const usuarios = getUsuarios();
    const usuarioIndex = usuarios.findIndex(u => u.usuario === usuarioLogado);

    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].senha = novaSenha; // Atualiza a senha
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usuarios));
        return true;
    }
    return false;
}

// Submissão por Enter
document.addEventListener('DOMContentLoaded', () => {
    // Formulário de Login
    const loginSenhaInput = document.getElementById('loginSenha');
    const loginButton = document.querySelector('.auth-container button[onclick="fazerLogin()"]');
    if (loginSenhaInput && loginButton) {
        loginSenhaInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                fazerLogin();
            }
        });
    }

    // Formulário de Cadastro
    const confirmarSenhaInput = document.getElementById('confirmarSenha');
    const cadastroButton = document.querySelector('.auth-container button[onclick="fazerCadastro()"]');
    if (confirmarSenhaInput && cadastroButton) {
        confirmarSenhaInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                fazerCadastro();
            }
        });
    }
});