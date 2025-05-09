let biblioteca = [];
let livroParaAlterar = null;

function mostrarSecao(secao) {
  document.getElementById("cadastro").classList.add("hidden");
  document.getElementById("consulta").classList.add("hidden");
  document.getElementById("alterar").classList.add("hidden");
  document.getElementById("emprestimo").classList.add("hidden");

  document.getElementById(secao).classList.remove("hidden");
}

function adicionarLivro() {
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const ano = parseInt(document.getElementById("ano").value);

  if (titulo && autor && ano) {
    biblioteca.push({ titulo, autor, ano, emprestado: false });
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("ano").value = "";
    atualizarLista();
    alert("Livro adicionado com sucesso!");
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

function buscarLivro() {
  const busca = document.getElementById("busca").value.toLowerCase();
  const resultados = biblioteca.filter((livro) =>
    livro.titulo.toLowerCase().includes(busca)
  );
  atualizarLista(resultados);
}

function buscarLivroParaAlterar() {
  const busca = document.getElementById("busca-alterar").value.toLowerCase();
  livroParaAlterar = biblioteca.find((livro) =>
    livro.titulo.toLowerCase().includes(busca)
  );

  if (!livroParaAlterar) {
    alert("Livro não encontrado.");
    return;
  }

  document.getElementById("form-alterar").classList.remove("hidden");
  document.getElementById("novo-titulo").value = livroParaAlterar.titulo;
  document.getElementById("novo-autor").value = livroParaAlterar.autor;
  document.getElementById("novo-ano").value = livroParaAlterar.ano;
}

function alterarLivro() {
  if (livroParaAlterar) {
    const novoTitulo = document.getElementById("novo-titulo").value;
    const novoAutor = document.getElementById("novo-autor").value;
    const novoAno = parseInt(document.getElementById("novo-ano").value);

    if (novoTitulo && novoAutor && novoAno) {
      livroParaAlterar.titulo = novoTitulo;
      livroParaAlterar.autor = novoAutor;
      livroParaAlterar.ano = novoAno;

      atualizarLista();
      alert("Livro alterado com sucesso!");
      document.getElementById("form-alterar").classList.add("hidden");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }
}

function emprestarLivro() {
  const tituloEmprestimo = document.getElementById("titulo-emprestimo").value.toLowerCase();
  const livro = biblioteca.find(l => l.titulo.toLowerCase() === tituloEmprestimo);

  if (!livro) {
    alert("Livro não encontrado.");
    return;
  }

  if (livro.emprestado) {
    alert("Esse livro já está emprestado.");
  } else {
    livro.emprestado = true;
    atualizarLista();
    alert("Livro emprestado com sucesso!");
  }

  document.getElementById("titulo-emprestimo").value = "";
}

function atualizarLista(lista = biblioteca) {
  const tabela = document.getElementById("lista-livros");
  tabela.innerHTML = "";

  lista.forEach((livro) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${livro.titulo}</td>
      <td>${livro.autor}</td>
      <td>${livro.ano}</td>
      <td class="${livro.emprestado ? "emprestado" : "disponivel"}">
        ${livro.emprestado ? "Emprestado" : "Disponível"}
      </td>
    `;
    tabela.appendChild(linha);
  });
}

function alternarTema() {
  document.body.classList.toggle("dark-mode");
}
