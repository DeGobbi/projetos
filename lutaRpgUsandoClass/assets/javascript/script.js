let log = new Log(document.querySelector("ul"))
let heroi = null
let monstro = null
let stage = null

function cenario() {

    let cenarioImg = document.querySelector("body")
    let cenarioValue = document.querySelector("#cenario").value
    let heroiImg = document.querySelector("#heroi")
    let heroiValue = document.querySelector("#personagem").value
    let monstroImg = document.querySelector("#monstro")
    let input = document.querySelector("input").value


    if (input === '') input = '(sem nome)'
    if (heroiValue === 'cavaleiro') heroi = new Cavaleiro(input)
    if (heroiValue === 'arqueiro') heroi = new Arqueiro(input)
    if (heroiValue === 'mago') heroi = new Mago(input)
    if (heroiValue === 'barbaro') heroi = new Barbaro(input)


    if (cenarioValue === 'floresta') monstro = new FlorestaMonstro()
    if (cenarioValue === 'masmorra') monstro = new MasmorraMonstro()


    monstroImg.setAttribute('src', `assets/images/${cenarioValue}Monstro.png`)
    cenarioImg.style.backgroundImage = `url('assets/images/${cenarioValue}.jpg')`
    heroiImg.setAttribute('src', `assets/images/${heroiValue}.png`)

    log.setEmpty()
    if (!stage) {
        stage = new Stage(
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