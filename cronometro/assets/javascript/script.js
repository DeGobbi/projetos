let principalBtn = document.querySelector(".principalBtn")
let secundarioBtn = document.querySelector(".secundarioBtn")
let listaDeVoltas = document.querySelector("tbody")
let cronometroSecundario = document.querySelector("p")

let tempo = document.querySelector(".tempo")
tempo.innerHTML = `00:00:00`
let a = -75600000
let b = -75600000
let data = new Date(a)
let data2 = new Date(b)
let contagem
let contagem2
let contagemDeVoltas = 1

function iniciar() {
    principalBtn.setAttribute("onclick", "parar()")
    principalBtn.innerHTML = "Parar"
    principalBtn.style = "background-color: #df3636;"

    if(secundarioBtn.getAttribute("onclick") === "zerar()") secundarioBtn.setAttribute("onclick", "zerarCronometro()")
    if(contagemDeVoltas === 1) secundarioBtn.setAttribute("onclick", "volta()")
    secundarioBtn.innerHTML = "Volta"
    secundarioBtn.style = `
    cursor: pointer;
    background-color: #c7c7c7;
    color: #000;
    `

    contagem = setInterval(showTime, 10)
    if(contagemDeVoltas > 1) contagem2 = setInterval(showTimeSecond, 10)
}

function parar() {
    principalBtn.setAttribute("onclick", "iniciar()")
    principalBtn.innerHTML = "Retomar"
    principalBtn.style = "background-color: #564caf;"

    secundarioBtn.setAttribute("onclick", "zerar()")
    secundarioBtn.innerHTML = "Zerar"

    clearInterval(contagem)
    clearInterval(contagem2)
}

function zerar() {
    principalBtn.setAttribute("onclick", "iniciar()")
    principalBtn.innerHTML = "Iniciar"
    principalBtn.style = "background-color: #4caf50;"

    secundarioBtn.removeAttribute("onclick")
    secundarioBtn.innerHTML = "Volta"
    secundarioBtn.style = `
    background-color: #dadada;
    color: #424242;
    `

    a = -75600000
    data = new Date(a)
    tempo.innerHTML = `00:00:00`

    b = -75600000
    data2 = new Date(b)
    cronometroSecundario.innerHTML = ``
    contagemDeVoltas = 1

    listaDeVoltas.innerHTML = ""
}

function volta() {
    secundarioBtn.setAttribute("onclick", "zerarCronometro()")
    zerarCronometro()
    contagem2 = setInterval(showTimeSecond, 10)
}

function showTime(param) {
    let ms = data.getMilliseconds().toString()
    let s = data.getSeconds().toString().padStart(2, "0")
    let m = data.getMinutes().toString().padStart(2, "0")
    if (param === 1) return `${m}:${s}:${ms}`
    a += 10
    data = new Date(a)
    tempo.innerHTML = `${m}:${s}:${ms}`
}

function showTimeSecond() {
    let ms = data2.getMilliseconds().toString()
    let s = data2.getSeconds().toString().padStart(2, "0")
    let m = data2.getMinutes().toString().padStart(2, "0")
    b += 10
    data2 = new Date(b)
    cronometroSecundario.innerHTML = `${m}:${s}:${ms}`
}

function zerarCronometro() {
    let txt = contagemDeVoltas === 1 ? showTime(1) : cronometroSecundario.innerHTML
    listaDeVoltas.innerHTML += (`
    <tr>
        <td>${contagemDeVoltas++}</td>
        <td>${txt}</td>
        <td>${showTime(1)}</td>
    </tr>
    `)
    b = -75600000
}