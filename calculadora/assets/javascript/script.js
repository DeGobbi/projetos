function clicou(e) {
    let visor = document.querySelector("h1")
    visor.innerText += e.target.innerText
}

function apagar() {
    let visor = document.querySelector("h1")
    visor.innerText = ''
}

function apagarRecente() {
    let visor = document.querySelector("h1")
    visor.innerText = visor.innerText.substring(0, visor.innerText.length - 1)
}

function enviar() {
    let visor = document.querySelector("h1")
    if(visor.innerText === "") return false
    try {
        let conta = eval(visor.innerText)
        visor.innerText = conta
    } catch (error) {
        alert("Operação inválida! Tente novamente.")
        visor.innerText = ''
    }
}