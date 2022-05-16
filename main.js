const inputButton = document.getElementById('inputButton')
var listArray = []

function listItemOBJ(content){
    this.content = ''
} 

inputButton.onclick = () => {
    const content = document.getElementById('taskInput').value
    if(content == ''){
        console.log('leeg')
        return
    }
    addToList(content)
}

function createTaskDom(content){
    let taskDiv = document.createElement("div")
    taskDiv.setAttribute('class', 'task')

    taskDiv.innerHTML = `<div class="taskText"><p>${content}</p></div>`
    let button = document.createElement('button')
    button.textContent = 'X'
    button.setAttribute('class', 'taskButton')

    button.onclick = () => {
        removeFromList(content)
        taskDiv.remove()
    }

    taskDiv.appendChild(button)

    document.body.appendChild(taskDiv)
}

function addToList(content){
    var newItem = new listItemOBJ()
    newItem.content = content
    listArray.push(newItem)

    refreshLocal()

    createTaskDom(content)
}

function removeFromList(content) {
    listArray.forEach((item, index) => {
        if(item.content == content) {
            listArray.splice(index)
        }
    })
    refreshLocal()
}

function refreshLocal(){
    var todos = listArray
    localStorage.removeItem('todoList')
    localStorage.setItem('todoList', JSON.stringify(todos))
}

window.onload = () => {
    var list = localStorage.getItem('todoList')

    if (list != null) {
        todos = JSON.parse(list)
        listArray = todos

        for (let i = 0; i < listArray.length; i++) {
            let content = listArray[i].content
            
            createTaskDom(content)
        }
    }
}