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

document.getElementById("enviar").onclick = async () => {

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

    await fetch(api, {

        method: "POST",
        body: JSON.stringify(dados)

    })

    alert("Futuro registrado 🚀")

}

carregarOpcoes()