const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const lista = document.getElementById("listaCompras");
const modal = document.querySelector(".modal");

let compras = JSON.parse(localStorage.getItem("compras")) || [];


compras = compras.map((item) => {
  if (typeof item === "string") {
    return {
      nome: item,
      quantidade: "-",
      observacoes: "-",
      mes: "-", 
    };
  }
  return item;
});

localStorage.setItem("compras", JSON.stringify(compras));


function renderizarLista(filtro = "") {
  lista.innerHTML = "";


  const filtrados = compras.filter((item) =>
    item.nome.toLowerCase().includes(filtro.toLowerCase())
  );


  const grupos = {};

  filtrados.forEach((item) => {
    const data = new Date(item.mes);
    let nomeMes = "Sem Data";

    if (!isNaN(data)) {
      nomeMes = data.toLocaleString("pt-BR", { month: "long" });
    }

    if (!grupos[nomeMes]) grupos[nomeMes] = [];
    grupos[nomeMes].push(item);
  });

 
  for (const mes in grupos) {
    
    const titulo = document.createElement("li");
    titulo.textContent = mes.toUpperCase();
    titulo.style.fontWeight = "bold";
    titulo.style.fontSize = "20px";
    titulo.style.marginTop = "18px";
    lista.appendChild(titulo);


    grupos[mes].forEach((compra, indexReal) => {
      const indexOriginal = compras.indexOf(compra);

      const li = document.createElement("li");
      li.classList.add("item-grupo");

      li.textContent = compra.nome;

      const div = document.createElement("div");

      const btnMostrar = document.createElement("button");
      btnMostrar.textContent = "Mostrar";
      btnMostrar.classList.add("mostrar");
      btnMostrar.addEventListener("click", () =>
        mostrarInformacoesItem(
          compra.nome,
          compra.quantidade,
          compra.observacoes,
          compra.mes
        )
      );

      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.classList.add("excluir");
      btnExcluir.addEventListener("click", () =>
        excluirItem(indexOriginal)
      );

      div.appendChild(btnMostrar);
      div.appendChild(btnExcluir);

      li.appendChild(div);
      lista.appendChild(li);
    });
  }
}


function excluirItem(index) {
  if (confirm("Deseja realmente excluir este item da lista?")) {
    compras.splice(index, 1);
    localStorage.setItem("compras", JSON.stringify(compras));
    renderizarLista(searchInput.value);
  }
}



function mostrarInformacoesItem(nome, quantidade, observacoes, mes) {
  document.querySelector(".nome span").textContent = nome;
  document.querySelector(".quantidade span").textContent = quantidade;
  document.querySelector(".observacao span").textContent = observacoes;
  document.querySelector(".data span").textContent = mes;

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
