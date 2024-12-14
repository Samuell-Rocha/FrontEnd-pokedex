document.getElementById("cabecalho").addEventListener("click", () => {
  console.log("Botão clicado");
});

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audioPlayer");

    // Tentar reproduzir automaticamente
    audio.play().then(() => {
      console.log("Áudio reproduzido automaticamente.");
    }).catch((error) => {
      console.warn("Autoplay bloqueado. Aguardando interação do usuário.");
      // Exibir uma mensagem ou usar fallback (opcional)
    });
   
  });

  document.getElementById("adicionar-btn").addEventListener("click", (event) => {
    event.preventDefault(); // Impede o comportamento padrão (como redirecionamento ou recarregamento)
  
    const content = document.getElementById("main-content");
    console.log(content);
  
    // Carrega o conteúdo da página
    fetch("../adicionar/adicionar.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar a página.");
        }
        return response.text();
      })
      .then((html) => {
        content.innerHTML = html; // Substitui o conteúdo atual
  
        // Agora carregue o CSS
        const link = document.createElement("link");
        link.rel = "stylesheet"; // Relacionamento com o arquivo CSS
        link.href = "../adicionar/style.css"; // Caminho do seu arquivo CSS
        link.onload = () => {
          console.log("CSS carregado com sucesso.");
        };
        link.onerror = () => {
          console.error("Erro ao carregar o CSS.");
        };
  
        document.head.appendChild(link); // Adiciona o link do CSS ao head
  
        // Agora carregue o script JS necessário
        const script = document.createElement("script");
        script.src = "../adicionar/script.js"; // Caminho do seu script JS
        script.onload = () => {
          console.log("Script carregado e executado.");
        };
        script.onerror = () => {
          console.error("Erro ao carregar o script.");
        };
  
        document.body.appendChild(script); // Adiciona o script ao final do body
      })
      .catch((error) => {
        content.innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
        console.error(error);
      });
  });
  
  
  document.getElementById("listar-btn").addEventListener("click", (event) => {
    event.preventDefault(); // Impede o comportamento padrão (como redirecionamento ou recarregamento)
  
    const content = document.getElementById("main-content");
    console.log(content);
  
    // Carrega o conteúdo da página
    fetch("../listar/listar.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar a página.");
        }
        return response.text();
      })
      .then((html) => {
        content.innerHTML = html; // Substitui o conteúdo atual
  
        // Agora carregue o CSS
        const link = document.createElement("link");
        link.rel = "stylesheet"; // Relacionamento com o arquivo CSS
        link.href = "../listar/style.css"; // Caminho do seu arquivo CSS
        link.onload = () => {
          console.log("CSS carregado com sucesso.");
        };
        link.onerror = () => {
          console.error("Erro ao carregar o CSS.");
        };
  
        document.head.appendChild(link); // Adiciona o link do CSS ao head
  
        // Agora carregue o script JS necessário
        const script = document.createElement("script");
        script.src = "../listar/script.js"; // Caminho do seu script JS
        script.onload = () => {
          console.log("Script carregado e executado.");
        };
        script.onerror = () => {
          console.error("Erro ao carregar o script.");
        };
  
        document.body.appendChild(script); // Adiciona o script ao final do body
      })
      .catch((error) => {
        content.innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
        console.error(error);
      });
  });
  
  
  

  function voltarPagina() {
    // Navega para uma rota específica no servidor local
    window.location.href = "/index.html"; // Substitua por sua rota inicial
  }






async function deletarPokemon(id) {
  console.log(id);
  const response = await fetch(`http://127.0.0.1:5000/pokemon?id=${id}`, {
    method: 'DELETE'
  });

  const data = await response.json();
  alert(data.message);
  listarPokemons(); // Atualiza a lista
}