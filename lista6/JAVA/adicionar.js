
    const form = document.getElementById('formAdicionar');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nome = document.getElementById('nome-item').value.trim();
      const quantidade = document.getElementById('quantidade').value.trim();
      const observacoes = document.getElementById('observacoes').value.trim();

      if (!nome) {
        alert('Por favor, preencha o nome do item.');
        return;
      }

      let textoItem = nome;
      if (quantidade) textoItem += ` - ${quantidade}`;
      if (observacoes) textoItem += ` (${observacoes})`;

     
      let compras = JSON.parse(localStorage.getItem('compras')) || [];

      compras.unshift(textoItem);

    
      localStorage.setItem('compras', JSON.stringify(compras));

      form.reset();
      alert('Item adicionado com sucesso!');
    });
