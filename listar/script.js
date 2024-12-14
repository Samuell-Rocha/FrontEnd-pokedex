const audio = document.getElementById("audioPlayer");

// Função para listar os Pokémons
async function listarPokemons() {
  try {
    const response = await fetch("http://127.0.0.1:5000/pokemons");
    if (!response.ok) {
      throw new Error("Erro ao buscar Pokémons");
    }
    const data = await response.json();
    console.log(data);
    
    const pokemons = data.pokemons;

    if (Array.isArray(pokemons)) {
      const pokemonList = document.getElementById("pokemonList");
      pokemonList.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

      pokemons.forEach((pokemon) => {
        // Cria a div que vai conter o li e o ícone de delete
        const div = document.createElement("div");
        div.classList.add("pokemon-item"); // Adiciona uma classe para a div (opcional)

        // Cria o elemento li com o nome do Pokémon
        const li = document.createElement("li");
        li.textContent = pokemon.nome;
        li.style.cursor = "pointer"; // Indica que o nome é clicável

        // Adiciona o evento de clique para mostrar mais informações
        li.addEventListener("click", () => {
          const content = document.getElementById("lista");
          content.innerHTML = ""; // Limpa o conteúdo antes de mostrar os detalhes
          mostrarDetalhes(pokemon);
        });

        // Cria o ícone de delete (pode ser um link ou imagem)
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "./img/delete.png"; // Substitua com o caminho do seu ícone de delete
        deleteIcon.alt = "Delete";
        deleteIcon.classList.add("delete-icon"); 
        deleteIcon.style.cursor = "pointer"; // Indica que o ícone é clicável

        // Adiciona o evento de clique para deletar o Pokémon
        deleteIcon.addEventListener("click", () => {
          deletarPokemon(pokemon.nome); // Chama a função de deletar passando o nome do Pokémon
        });

        // Adiciona o li e o ícone de delete na div
        div.appendChild(li);
        div.appendChild(deleteIcon);

        // Adiciona a div à lista de pokémons
        pokemonList.appendChild(div);
      });
    } else {
      console.error("Os dados não são um array:", pokemons);
    }
  } catch (error) {
    console.error("Erro ao listar os Pokémons:", error);
  }
}

// Função de deletar o Pokémon
async function deletarPokemon(nome) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/pokemon?nome=${encodeURIComponent(nome)}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao deletar o Pokémon");
    }
    alert("Pokémon deletado com sucesso");
    console.log("Pokémon deletado com sucesso");
    listarPokemons(); // Atualiza a lista de pokémons após deletar
  } catch (error) {
    console.error("Erro ao deletar o Pokémon:", error);
  }
}

// Função para mostrar os detalhes do Pokémon
async function mostrarDetalhes(pokemon) {
  const detalhesDiv = document.getElementById("detalhes");

  // Verifique se o elemento existe
  if (detalhesDiv) {
    const response = await fetch(`http://127.0.0.1:5000/uploads/${pokemon.foto}`); // Corrigido a interpolação de string
    console.log(response);
    detalhesDiv.innerHTML = `
      <h2>${pokemon.nome}</h2>
      <img src="http://127.0.0.1:5000/uploads/${pokemon.foto}" alt="Imagem de ${pokemon.nome}" width="100"><br>
      <p><strong>Tipo:</strong> ${pokemon.tipo}</p>
      <p><strong>Nível:</strong> ${pokemon.nivel}</p>
      
      <!-- Usando um novo ID para o áudio -->
      <audio class="audioPlayer" src="http://127.0.0.1:5000/uploads/${pokemon.audio}" type="audio/mpeg" controls>
      </audio>
    `;
  } else {
    console.error("Elemento 'detalhes' não encontrado!");
  }
}

// Inicializa a lista ao carregar a página
listarPokemons();
