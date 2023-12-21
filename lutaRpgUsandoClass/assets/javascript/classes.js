class Personagem {
    _life = 1
    maxLife = 1
    attack = 0
    defense = 0

    constructor(name) {
        this.name = name
    }

    get life() {
        return this._life
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife
    }
}

class Cavaleiro extends Personagem {
    constructor(name) {
        super(name)
        this.life = 100
        this.attack = 10
        this.defense = 7
        this.maxLife = this.life
    }
}

class Arqueiro extends Personagem {
    constructor(name) {
        super(name)
        this.life = 120
        this.attack = 9
        this.defense = 8
        this.maxLife = this.life
    }
}

class Mago extends Personagem {
    constructor(name) {
        super(name)
        this.life = 80
        this.attack = 12
        this.defense = 8
        this.maxLife = this.life
    }
}

class Barbaro extends Personagem {
    constructor(name) {
        super(name)
        this.life = 120
        this.attack = 14
        this.defense = 2
        this.maxLife = this.life
    }
}

class FlorestaMonstro extends Personagem {
    constructor() {
        super("Monstro da Floresta")
        this.life = 170
        this.attack = 15
        this.defense = 5
        this.maxLife = this.life
    }
}

class MasmorraMonstro extends Personagem {
    constructor() {
        super("Monstro da Masmorra")
        this.life = 200
        this.attack = 20
        this.defense = 7
        this.maxLife = this.life
    }
}


class Stage {
    constructor(lutador1, lutador2, lutador1El, lutador2El, logObj) {
        this.lutador1 = lutador1
        this.lutador2 = lutador2
        this.lutador1El = lutador1El
        this.lutador2El = lutador2El
        this.log = logObj
    }

    start() {
        this.update()
        this.lutador1El.querySelector(".botaoAtaque").addEventListener("click", () => {
            this.atacar(this.lutador1, this.lutador2)
        })
        this.lutador2El.querySelector(".botaoAtaque").addEventListener("click", () => {
            this.atacar(this.lutador2, this.lutador1)
        })
    }

    update() {
        // Herói
        this.lutador1El.querySelector("p").innerHTML = `${this.lutador1.name} - ${this.lutador1.life.toFixed(2)} HP`
        let f1Pct = (this.lutador1.life / this.lutador1.maxLife) * 100
        this.lutador1El.querySelector(".bar").style.width = `${f1Pct}%`

        // Monstro
        this.lutador2El.querySelector("p").innerHTML = `${this.lutador2.name} - ${this.lutador2.life.toFixed(2)} HP`
        let f2Pct = (this.lutador2.life / this.lutador2.maxLife) * 100
        this.lutador2El.querySelector(".bar").style.width = `${f2Pct}%`
    }

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


        let fatorAtaque = (Math.random() * 2).toFixed(2)
        let fatorDefesa = (Math.random() * 2).toFixed(2)
        let ataqueTotal = ((estaAtacando.attack * fatorAtaque) - (sendoAtacado.defense * fatorDefesa)).toFixed(2)
        if (ataqueTotal > 0) {
            sendoAtacado.life -= ataqueTotal
            this.log.addMessage(`${estaAtacando.name} casou ${ataqueTotal} de dano em ${sendoAtacado.name}.`)
        } else {
            this.log.addMessage(`${sendoAtacado.name} conseguiu se defender.`)
        }
        this.update()
    }

    atualizarPersonagens(lutador1, lutador2) {
        this.lutador1 = lutador1
        this.lutador2 = lutador2
        this.update()
    }
}

class Log {
    list = []

    constructor(listEl) {
        this.listEl = listEl
    }

    addMessage(msg) {
        this.list.push(msg)
        this.render()
    }

    render() {
        this.listEl.innerHTML = ''
        for (let i of this.list) {
            this.listEl.innerHTML += `<li>${i}</li>`
        }
    }

    setEmpty() {
        this.list.length = 0
        this.render()
    }
}