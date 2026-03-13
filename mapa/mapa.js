const api = "https://script.google.com/macros/s/AKfycbylHDEcNJbnmwBXzots0Lx_CEqbIkfY1DoFgTWbDCHJO9c8OUOCUDKALYtfKgNSZtMv/exec";

async function carregarMapa() {
    const res = await fetch(api + "?tipo=respostas");
    const dados = await res.json();

    const areas = contar(dados, "area_profissional");
    const valores = contarLista(dados, "valores");
    const impacto = contarLista(dados, "impacto_coletivo");
    const influencias = contarLista(dados, "influencias");
    const palavras = contarLista(dados, "palavras_futuro");

    renderBarras(areas, "areas", "areas");
    renderBarras(valores, "valores", "valores");
    renderBarras(impacto, "impacto", "impacto");
    renderBarras(influencias, "influencias", "influencias");
    renderNuvem(palavras);
    gerarArquetipos(dados);
    gerarInsights(dados, areas, valores, impacto);
}

function contar(lista, campo) {
    let contagem = {};
    lista.forEach(i => {
        let v = i[campo];
        if (!v) return;
        contagem[v] = (contagem[v] || 0) + 1;
    });
    return contagem;
}

function contarLista(lista, campo) {
    let contagem = {};
    lista.forEach(i => {
        if (!i[campo]) return;
        let itens = i[campo].split(",");
        itens.forEach(v => {
            v = v.trim();
            contagem[v] = (contagem[v] || 0) + 1;
        });
    });
    return contagem;
}

// BARRAS PREMIUM
function renderBarras(contagem, id, cor) {
    const container = document.getElementById(id);
    container.innerHTML = "";
    const max = Math.max(...Object.values(contagem));

    Object.entries(contagem)
        .sort((a, b) => b[1] - a[1])
        .forEach(([nome, valor]) => {
            const div = document.createElement("div");
            div.className = "mapa_item";
            div.innerHTML = `
                <div class="mapa_label">${nome} (${valor})</div>
                <div class="barra">
                    <div class="barra_valor" data-cor="${cor}" style="width:${(valor / max) * 100}%"></div>
                </div>
            `;
            container.appendChild(div);
        });
}

// NUVEM PREMIUM
function renderNuvem(contagem) {
    const container = document.getElementById("palavras");
    container.innerHTML = "";
    const max = Math.max(...Object.values(contagem));

    Object.entries(contagem)
        .sort((a, b) => b[1] - a[1])
        .forEach(([palavra, valor]) => {
            const span = document.createElement("span");
            span.textContent = palavra;
            const size = 14 + (valor / max) * 30; // 14px a 44px
            span.style.fontSize = size + "px";
            span.style.order = Math.floor(Math.random() * 1000); // randomizar posição
            span.style.transform = `rotate(${Math.random() * 10 - 5}deg)`; // leve rotação
            container.appendChild(span);
        });
}

function gerarArquetipos(lista) {
    let contagem = {};
    lista.forEach(i => {
        if (!i.area_profissional || !i.valores) return;
        let valor = i.valores.split(",")[0].trim();
        let chave = i.area_profissional + " + " + valor;
        contagem[chave] = (contagem[chave] || 0) + 1;
    });
    renderBarras(contagem, "arquetipos", "arquetipos");
}

// INSIGHTS PREMIUM
function gerarInsights(dados, areas, valores, impacto) {
    const total = dados.length;
    const topAreas = Object.entries(areas).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const topValores = Object.entries(valores).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const topImpacto = Object.entries(impacto).sort((a, b) => b[1] - a[1]).slice(0, 3);

    const container = document.getElementById("insights");
    container.innerHTML = `
        <div class="insight">A turma registrou <b>${total}</b> futuros possíveis.</div>
        <div class="insight">Áreas profissionais mais escolhidas: <b>${topAreas.map(a => a[0]).join(", ")}</b>.</div>
        <div class="insight">Valores mais citados: <b>${topValores.map(a => a[0]).join(", ")}</b>.</div>
        <div class="insight">Áreas de maior impacto coletivo: <b>${topImpacto.map(a => a[0]).join(", ")}</b>.</div>
    `;
}

carregarMapa();