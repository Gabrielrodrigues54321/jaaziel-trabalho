
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const lista = document.getElementById('listaCompras');

    let compras = JSON.parse(localStorage.getItem('compras')) || [
      "Arroz", "Feijão", "Leite", "Queijo", "Feijoada", "Pão",
      "Manteiga", "Tomate", "Cebola", "Macarrão", "Carne",
      "Frango", "Salada", "Ovos", "Frutas"
    ];

    function renderizarLista(filtro = "") {
      lista.innerHTML = "";
      compras
        .filter(item => item.toLowerCase().includes(filtro.toLowerCase()))
        .forEach((item, index) => {
          const li = document.createElement("li");
          li.textContent = item;

          const btnExcluir = document.createElement("button");
          btnExcluir.textContent = "Excluir";
          btnExcluir.addEventListener("click", () => excluirItem(index));

          li.appendChild(btnExcluir);
          lista.appendChild(li);
        });
    }

    function excluirItem(index) {
      if (confirm("Deseja realmente excluir este item da lista?")) {
        compras.splice(index, 1);
        localStorage.setItem("compras", JSON.stringify(compras));
        renderizarLista(searchInput.value);
      }
    }

    function filtrarLista() {
      renderizarLista(searchInput.value);
    }

    searchBtn.addEventListener('click', filtrarLista);
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') filtrarLista();
    });

    renderizarLista();
 