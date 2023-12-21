let log = textLog(document.querySelector("ul"))
let stage = null

function cenario() {
    let heroi = null
    let monstro = null

    let cenarioImg = document.querySelector("body")
    let cenarioValue = document.querySelector("#cenario").value
    let heroiImg = document.querySelector("#heroi")
    let heroiValue = document.querySelector("#personagem").value
    let monstroImg = document.querySelector("#monstro")
    let input = document.querySelector("input").value


    if (input === '') input = '(sem nome)'
    if (heroiValue === 'cavaleiro') heroi = criarCavaleiro(input)
    if (heroiValue === 'arqueiro') heroi = criarArqueiro(input)
    if (heroiValue === 'mago') heroi = criarMago(input)
    if (heroiValue === 'barbaro') heroi = criarBarbaro(input)


    if (cenarioValue === 'floresta') monstro = criarFlorestaMonstro()
    if (cenarioValue === 'masmorra') monstro = criarMasmorraMonstro()


    monstroImg.setAttribute('src', `assets/images/${cenarioValue}Monstro.png`)
    cenarioImg.style.backgroundImage = `url('assets/images/${cenarioValue}.jpg')`
    heroiImg.setAttribute('src', `assets/images/${heroiValue}.png`)

    log.setEmpty()
    if (!stage) {
        stage = estagio(
            heroi,
            monstro,
            document.querySelector("#heroiDiv"),
            document.querySelector("#monstroDiv"),
            log
        )
        stage.start()
    } else {
        stage.atualizarPersonagens(heroi, monstro)
    }
}