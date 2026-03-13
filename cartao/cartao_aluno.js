const api = "https://script.google.com/macros/s/AKfycbylHDEcNJbnmwBXzots0Lx_CEqbIkfY1DoFgTWbDCHJO9c8OUOCUDKALYtfKgNSZtMv/exec";

let dadosAlunos = [];

async function carregarAlunos() {
    const res = await fetch(api + "?tipo=respostas");
    dadosAlunos = await res.json();

    const select = document.getElementById("aluno_select");
    dadosAlunos.forEach(d => {
        const opt = document.createElement("option");
        opt.value = d.nome;
        opt.textContent = d.nome;
        select.appendChild(opt);
    });
}

function exibirAluno() {
    const nomeSelecionado = document.getElementById("aluno_select").value;
    if(!nomeSelecionado) return alert("Selecione um aluno!");

    const aluno = dadosAlunos.find(d => d.nome === nomeSelecionado);
    if(!aluno) return alert("Aluno não encontrado!");

    document.getElementById("tela_cartao").style.display = "block";

    document.getElementById("c_nome").innerText = aluno.nome;
    document.getElementById("c_area").innerText = aluno.area_profissional;
    document.getElementById("c_estilo").innerText = aluno.estilo_vida;
    document.getElementById("c_moradia").innerText = aluno.moradia;
    document.getElementById("c_formacao").innerText = aluno.formacao;
    document.getElementById("c_familia").innerText = aluno.familia;
    document.getElementById("c_hobbies").innerText = aluno.hobbies;
    document.getElementById("c_valores").innerText = aluno.valores;
    document.getElementById("c_impacto").innerText = aluno.impacto_coletivo;
    document.getElementById("c_influencias").innerText = aluno.influencias;
    document.getElementById("c_palavras").innerText = aluno.palavras_futuro;
    document.getElementById("c_narrativa").innerText = aluno.narrativa;
}

document.getElementById("exibir_aluno").addEventListener("click", exibirAluno);

carregarAlunos();