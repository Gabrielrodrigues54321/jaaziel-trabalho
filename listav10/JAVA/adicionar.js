
const form = document.getElementById('formAdicionar');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome-item').value.trim();
  const quantidade = document.getElementById('quantidade').value.trim();
  const observacoes = document.getElementById('observacoes').value.trim();
  const MES = document.getElementById('MES').value.trim();

  if (!nome) {
    alert('Por favor, preencha o nome do item.');
    return;
  }

  const dados = {
    nome: nome,
    quantidade: quantidade,
    observacoes: observacoes,
    mes: MES
  }

  let compras = JSON.parse(localStorage.getItem('compras')) || [];

  compras.unshift(dados);


  localStorage.setItem('compras', JSON.stringify(compras));

  form.reset();
  alert('Item adicionado com sucesso!');
});
