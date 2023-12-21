const personagemDefault = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0,
}

const criarCavaleiro = (name) => {
    return {
        ...personagemDefault,
        name,
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 8
    }
}

const criarArqueiro = (name) => {
    return {
        ...personagemDefault,
        name,
        life: 120,
        maxLife: 120,
        attack: 8,
        defense: 12
    }
}
const criarMago = (name) => {
    return {
        ...personagemDefault,
        name,
        life: 80,
        maxLife: 80,
        attack: 12,
        defense: 10
    }
}
const criarBarbaro = (name) => {
    return {
        ...personagemDefault,
        name,
        life: 140,
        maxLife: 140,
        attack: 14,
        defense: 4
    }
}

const criarFlorestaMonstro = () => {
    return {
        ...personagemDefault,
        name: "Monstro da Floresta",
        life: 170,
        maxLife: 170,
        attack: 16,
        defense: 8
    }
}

const criarMasmorraMonstro = () => {
    return {
        ...personagemDefault,
        name: "Monstro da Masmorra",
        life: 200,
        maxLife: 200,
        attack: 18,
        defense: 10
    }
}

const estagio = (lutador1, lutador2, lutador1El, lutador2El, log) => {
    return {
        lutador1,
        lutador2,
        lutador1El,
        lutador2El,
        log,

        start() {
            this.update()

            this.lutador1El.querySelector(".botaoAtaque").addEventListener("click", () => {
                this.atacar(this.lutador1, this.lutador2)
            })

            this.lutador2El.querySelector(".botaoAtaque").addEventListener("click", () => {
                this.atacar(this.lutador2, this.lutador1)
            })
        },

        update() {
            //HEROI
            this.lutador1El.querySelector(".heroiName").innerHTML = `${this.lutador1.name} - ${this.lutador1.life.toFixed(2)} HP`
            let pct1 = (this.lutador1.life / this.lutador1.maxLife) * 100
            this.lutador1El.querySelector(".bar").style.width = `${pct1}%`

            //HEROI
            this.lutador2El.querySelector(".monstroName").innerHTML = `${this.lutador2.name} - ${this.lutador2.life.toFixed(2)} HP`
            let pct2 = (this.lutador2.life / this.lutador2.maxLife) * 100
            this.lutador2El.querySelector(".bar").style.width = `${pct2}%`
        },

        atacar(estaAtacando, sendoAtacado) {
            if (estaAtacando.life <= 0 || sendoAtacado.life <= 0) {
                if (estaAtacando.life <= 0) alert(`${estaAtacando.name} foi derrotado.`)
                else alert(`${sendoAtacado.name} foi derrotado.`)
                estaAtacando.life = estaAtacando.maxLife
                sendoAtacado.life = sendoAtacado.maxLife
                this.log.setEmpty()
                this.update()
                return
            }
            let fatorAttack = (Math.random() * 2).toFixed(2)
            let fatorDefense = (Math.random() * 2).toFixed(2)
            let totalAttack = (estaAtacando.attack * fatorAttack) - (sendoAtacado.defense * fatorDefense)

            if (totalAttack > 0) {
                sendoAtacado.life -= totalAttack
                sendoAtacado.life = sendoAtacado.life < 0 ? 0 : sendoAtacado.life
                this.log.addMessage(`${estaAtacando.name} fez ${totalAttack} de dano em ${sendoAtacado.name}.`)
            } else {
                this.log.addMessage(`${sendoAtacado.name} conseguiu defender.`)
            }
            this.update()
        },

        atualizarPersonagens(heroi, monstro) {
            this.lutador1 = heroi
            this.lutador2 = monstro
            this.update()
        }
    }
}

const textLog = (log) => {
    return {
        logList: [],
        log,
        addMessage(msg) {
            this.logList.push(msg)
            this.render()
        },
        render() {
            this.log.innerHTML = ''
            for (let i of this.logList) {
                this.log.innerHTML += `<li>${i}</li>`
            }
        },
        setEmpty() {
            this.logList = []
            this.render()
        }
    }
}