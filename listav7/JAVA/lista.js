const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const lista = document.getElementById("listaCompras");
const modal = document.querySelector(".modal");

let compras = JSON.parse(localStorage.getItem("compras")) || [
  "Arroz",
  "Feijão",
  "Leite",
  "Queijo",
  "Feijoada",
  "Pão",
  "Manteiga",
  "Tomate",
  "Cebola",
  "Macarrão",
  "Carne",
  "Frango",
  "Salada",
  "Ovos",
  "Frutas",
];

function renderizarLista(filtro = "") {
  lista.innerHTML = "";

  for (let i in compras) {
    const compra = compras[i];
    const nomeCompra = compra["nome"];
    const quantidadeCompra = compra["quantidade"];
    const observacoesCompra = compra["observacoes"];
    const mesCompra = compra["mes"];

    const li = document.createElement("li");
    const div = document.createElement("div");
    li.textContent = `${nomeCompra}`;

    const btnMostrar = document.createElement("button");
    btnMostrar.textContent = "Mostrar";
    btnMostrar.classList.add("mostrar");
    btnMostrar.addEventListener("click", () =>
      mostrarInformacoesItem(
        nomeCompra,
        quantidadeCompra,
        observacoesCompra,
        mesCompra
      )
    );

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("excluir");
    btnExcluir.addEventListener("click", () => excluirItem(i));

    div.appendChild(btnMostrar);
    div.appendChild(btnExcluir);
    li.appendChild(div);
    lista.appendChild(li);
  }
}

function excluirItem(index) {
  if (confirm("Deseja realmente excluir este item da lista?")) {
    compras.splice(index, 1);
    localStorage.setItem("compras", JSON.stringify(compras));
    renderizarLista(searchInput.value);
  }
}

function mostrarInformacoesItem(
  nomeCompra,
  quantidadeCompra,
  observacoesCompra,
  mesCompra
) {
  const nomeElemento = document.querySelector(".nome span");
  const quantidadeElemento = document.querySelector(".quantidade span");
  const observacaoElemento = document.querySelector(".observacao span");
  const dataElemento = document.querySelector(".data span");

  nomeElemento.textContent = nomeCompra;
  quantidadeElemento.textContent = quantidadeCompra;
  observacaoElemento.textContent = observacoesCompra;
  dataElemento.textContent = mesCompra;

  modal.showModal();
}

function fecharInformacoesItem() {
  modal.close();
}

function filtrarLista() {
  renderizarLista(searchInput.value);
}

searchBtn.addEventListener("click", filtrarLista);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") filtrarLista();
});

renderizarLista();
