const api = "https://script.google.com/macros/s/AKfycbyCwJrhARpRGB5vcoja0fR2dW0H5llSc3otxwQrljh8qIHzvMJTac7Z3rcK7204g73A/exec"

async function carregarOpcoes() {

    const res = await fetch(api)
    const dados = await res.json()

    preencherSelect("area_profissional", dados.area_profissional)
    preencherSelect("estilo_vida", dados.estilo_vida)
    preencherSelect("moradia", dados.moradia)
    preencherSelect("formacao", dados.formacao)
    preencherSelect("familia", dados.familia)
    preencherSelect("impacto_coletivo", dados.impacto_coletivo)

    criarChips("hobbies", dados.hobbies, 3)
    criarChips("valores", dados.valores, 3)
    criarChips("influencias", dados.influencias, 3)

    document.getElementById("loading").style.display = "none"
}

function preencherSelect(id, lista) {

    const el = document.getElementById(id)

    const placeholder = document.createElement("option")

    placeholder.value = ""
    placeholder.textContent = "Selecione..."
    placeholder.disabled = true
    placeholder.selected = true

    el.appendChild(placeholder)

    lista.forEach(item => {

        const opt = document.createElement("option")

        opt.value = item
        opt.textContent = item

        el.appendChild(opt)

    })

}

function criarChips(id, lista, max) {

    const container = document.getElementById(id)

    lista.forEach(item => {

        const chip = document.createElement("div")

        chip.classList.add("chip")
        chip.textContent = item

        chip.onclick = () => {

            chip.classList.toggle("selected")

            const selecionados = container.querySelectorAll(".selected")

            if (selecionados.length > max) {

                chip.classList.remove("selected")

                alert("Escolha até " + max)

            }

        }

        container.appendChild(chip)

    })
}

function pegarChips(id) {

    return [...document.querySelectorAll(`#${id} .selected`)]
        .map(el => el.textContent)
        .join(", ")
}

function mostrarConfirmacao() {

    const box = document.getElementById("confirmacao")

    if (!box) return

    box.style.display = "block"

    setTimeout(() => {
        box.style.display = "none"
    }, 4000)

}

document.getElementById("enviar").onclick = async () => {

    const botao = document.getElementById("enviar")

    botao.disabled = true
    botao.innerText = "Enviando..."

    const dados = {

        nome: document.getElementById("nome").value,

        area_profissional: document.getElementById("area_profissional").value,

        estilo_vida: document.getElementById("estilo_vida").value,

        moradia: document.getElementById("moradia").value,

        formacao: document.getElementById("formacao").value,

        familia: document.getElementById("familia").value,

        hobbies: pegarChips("hobbies"),

        valores: pegarChips("valores"),

        impacto_coletivo: document.getElementById("impacto_coletivo").value,

        influencias: pegarChips("influencias"),

        palavras_futuro: document.getElementById("palavras_futuro").value,

        narrativa: document.getElementById("narrativa").value

    }

    try {

        await fetch(api, {
            method: "POST",
            body: JSON.stringify(dados)
        })

        botao.innerText = "Enviado ✅"

        mostrarConfirmacao()

        gerarCartao(dados)

    } catch (e) {

        alert("Erro ao enviar. Tente novamente.")

        botao.disabled = false
        botao.innerText = "Enviar meu futuro 🚀"

    }

}

function gerarCartao(d) {

    document.getElementById("tela_formulario").style.display = "none"

    document.querySelector(".topo").style.display = "none"

    document.getElementById("tela_cartao").style.display = "block"

    document.getElementById("c_nome").innerText = d.nome

    document.getElementById("c_area").innerText = d.area_profissional

    document.getElementById("c_estilo").innerText = d.estilo_vida

    document.getElementById("c_moradia").innerText = d.moradia

    document.getElementById("c_valores").innerText = d.valores

    document.getElementById("c_impacto").innerText = d.impacto_coletivo

    document.getElementById("c_narrativa").innerText = d.narrativa

}

carregarOpcoes()

document.getElementById("baixar_cartao").onclick = async () => {

    const cartao = document.querySelector(".cartao-futuro")

    const canvas = await html2canvas(cartao, {

        backgroundColor: null,
        scale: 2

    })

    const link = document.createElement("a")

    link.download = "meu_futuro.png"

    link.href = canvas.toDataURL("image/png")

    link.click()

}