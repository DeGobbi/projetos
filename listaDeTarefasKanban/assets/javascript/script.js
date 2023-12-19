let tarefas = []
let input = document.querySelector("input")
let ul = document.querySelector("#lista-tarefas")

function carregarPagina() {
    tarefas = JSON.parse(localStorage.getItem('tarefas'))
    tarefas.map((value) => {
    let newLi = document.createElement("li")

    let div = document.createElement("div")
    div.setAttribute('class', 'draggable')
    div.setAttribute('id', `item${tarefas.indexOf(value)}`)
    div.setAttribute('draggable', 'true')
    div.setAttribute('ondragstart', 'dragStart(event)')
    div.setAttribute('ondragenter', 'dragEnter(event)')
    div.setAttribute('ondragleave', 'dragLeave(event)')
    div.setAttribute('ondragend', 'dragEnd(event)')



    let buttonDelete = document.createElement("button")
    buttonDelete.innerText = "Excluir"
    buttonDelete.setAttribute('onclick', 'excluir(event)')
    buttonDelete.setAttribute('class', 'btn btn-danger')
    let buttonEdit = document.createElement("button")
    buttonEdit.innerText = "Editar"
    buttonEdit.setAttribute('onclick', 'editar(event)')
    buttonEdit.setAttribute('class', 'btn btn-primary')
    newLi.innerHTML = `${value}`
    ul.append(div)
    div.append(newLi, buttonDelete, buttonEdit)
    })
}

function adicionar() {
    if (!input.value) return
    let newLi = document.createElement("li")
    let div = document.createElement("div")
    div.setAttribute('class', 'draggable')
    div.setAttribute('draggable', 'true')
    div.setAttribute('ondragstart', 'dragStart(event)')
    div.setAttribute('ondragenter', 'dragEnter(event)')
    div.setAttribute('ondragleave', 'dragLeave(event)')
    div.setAttribute('ondragend', 'dragEnd(event)')



    let buttonDelete = document.createElement("button")
    buttonDelete.innerText = "Excluir"
    buttonDelete.setAttribute('onclick', 'excluir(event)')
    buttonDelete.setAttribute('class', 'btn btn-danger')
    let buttonEdit = document.createElement("button")
    buttonEdit.innerText = "Editar"
    buttonEdit.setAttribute('onclick', 'editar(event)')
    buttonEdit.setAttribute('class', 'btn btn-primary')
    newLi.innerHTML = `${input.value}`
    ul.append(div)
    div.append(newLi, buttonDelete, buttonEdit)
    tarefas.push(input.value)
    div.setAttribute('id', `item${tarefas.length - 1}`)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    input.value = ""
}

function enviar(e) {
    console.log(e.shiftKey)
    if(e.keyCode === 13) {
        if (!input.value) return
        adicionar()
    }
}

function excluir(event) {
    const e = event.currentTarget.parentNode
    e.remove()
    input.focus()
    let indice = tarefas.indexOf(e.querySelector("li").innerText)
    tarefas.splice(indice, 1)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function editar(event) {
    const e = event.currentTarget.parentNode
    const text = e.querySelector("li").innerText
    e.querySelector("li").innerHTML = `<input type="text" id="${text}" value="${text}" />`
    e.querySelector(".btn-primary").setAttribute('onclick', 'editarPronto(event)')
    e.querySelector(".btn-primary").innerText = "Edição concluida"
}

function editarPronto(event) {
    const e = event.currentTarget.parentNode
    let indice = tarefas.indexOf(e.querySelector("input").getAttribute("id"))
    tarefas.splice(indice, 1, e.querySelector("input").value)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    e.querySelector("li").innerText = e.querySelector("input").value
    e.querySelector(".btn-primary").setAttribute('onclick', 'editar(event)')
    e.querySelector(".btn-primary").innerText = "Editar"
}




function allowDrop(event) {
    event.preventDefault();
}

function dragStart(event) {
    event.target.classList.add("dragging");
    event.dataTransfer.setData("text", event.target.id);
}

function dragEnter(event) {
    event.target.classList.add("dragover");
}

function dragLeave(event) {
    event.target.classList.remove("dragover");
}

function dragEnd(event) {
    event.target.classList.remove("dragging");
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var dropZone = event.target;
    draggedElement.classList.remove("dragging");

    if (dropZone.id === "drop-zone-1" || dropZone.id === "drop-zone-2" || dropZone.id === "drop-zone-3") {
        dropZone.append(draggedElement);
    }
    dropZone.classList.remove("dragover");
}