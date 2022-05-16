const inputButton = document.getElementById('inputButton')
const inputField = document.getElementById('taskInput')
var listArray = []

function listItemOBJ(content){
    this.content = ''
} 

inputButton.onclick = () => {
    const content = inputField.value
    if(content == ''){
        console.log('leeg')
        return
    }
    addToList(content)
    inputField.value = ''
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
    for (let i = 0; i < listArray.length; i++) {
        if(listArray[i].content == content) {
            listArray.splice(i, 1)
            refreshLocal()
            break
        }
        
    }
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