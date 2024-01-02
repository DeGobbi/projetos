async function carregarPosts() {
    const postsArea = document.querySelector(".posts")
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const json = await response.json()
        postsArea.innerHTML = ``
        if (json.length > 0) {
            json.map((item) => {
                postsArea.innerHTML += `
            <div id="${item.id}" class="post">
                <h1>${item.title}</h1>
                <p>${item.body}</p>
            </div>
            `
            })
        } else {
            postsArea.innerHTML = `Nenhum post para exibir`
        }

    } catch (err) {
        console.error(err)
    }
}

async function criarPost() {
    let input = document.querySelector(".title")
    let textarea = document.querySelector(".body")
    if (!input.value || !textarea.value) return alert("Preencha os campos!")
    try {
        console.log(await fetch("https://jsonplaceholder.typicode.com/posts",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: input.value,
                    body: textarea.value,
                    userId: 2
                })
            }))
    } catch (err) {
        console.error(err)
    }
    input.value = ''
    textarea.value = '';

    carregarPosts()
}

carregarPosts()