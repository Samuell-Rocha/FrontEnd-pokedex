document
  .getElementById("pokemonForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Formulário enviado");
    const formData = new FormData();
    formData.append("nome", document.getElementById("nome").value);
    formData.append("tipo", document.getElementById("tipo").value);
    formData.append("nivel", document.getElementById("nivel").value);
    formData.append("foto", document.getElementById("foto").files[0]); // Imagem
    formData.append("audio", document.getElementById("audio").files[0]);

    console.log(formData);

    try {
      const response = await fetch("http://127.0.0.1:5000/pokemon", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data)
      alert("Pokemon Adicionado com Sucesso");
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  });
