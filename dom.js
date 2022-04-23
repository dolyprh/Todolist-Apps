const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ITEMID = "itemId"; //Kode ini berfungsi sebagai object key yang akan digunakan untuk menyimpan id task HTML

function addTodo(){
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);

    const textTodo = document.getElementById("title").value;
    const dateTodo = document.getElementById("date").value;
    console.log("title " + textTodo);
    console.log("date " + dateTodo);

    const todo = makeTodo(textTodo, dateTodo);
    const todoObject = composeTodoObject(textTodo, dateTodo, false);//menyimpan objek task yang kita buat ke dalam variabel todos yang telah dibuat sebelumnya

    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);

    uncompletedTODOList.append(todo);
    updateDataToStorage();
}

function makeTodo(data, time, isCompleted){
    const textTitle = document.createElement("h2");//berfungsi untuk membuat element html
    textTitle.innerText = data;

    const textTime = document.createElement("p");  //berfungsi untuk membuat element html
    textTime.innerText = time;

    const textContainer = document.createElement("div");  
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textTime); //buat container pembungkus untuk membungkus textTitle dan textTimestamp dengan tag <div>

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if(isCompleted){
        container.append(
            createUndoButton(),
            createTrashButton()
            );
    }else{
        container.append(createCheckButton());
    }
    return container;
}

function createButton(buttonTypeClass, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event){
        eventListener(event);
    });
    return button;
}


function addTaskToCompleted(taskElement){
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTime = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTime, true);
    
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    const todo = findTodo(taskElement[TODO_ITEMID]); //memperbarui status (isCompleted) dari masing-masing objek TODO. Pertama, kita mencari objek TODO yang akan di-update pada array todos yang telah dideklarasikan sebelumnya dengan menggunakan fungsi findTodo().
    todo.isCompleted = true;//ubah property isCompleted menjadi true supaya TODO ini ditandai ‘selesai’,
    newTodo[TODO_ITEMID] = todo.id;

    listCompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

function undoTaskFromElementFromCompleted(taskElement){
    const listUnCompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTime = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTime, false);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;

    listUnCompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskElementFromCompleted(taskElement){
    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]); //menghapus data dari array TODO berdasarkan posisi data pada array yang diperoleh dari findTodoIndex().
    todos.splice(todoPosition, 1); /*menghapus objek yang ada pada suatu array sesuai dengan index yang didefinisikan pada argumen pertama dari fungsi
    Karena kita hanya butuh untuk menghapus satu objek saja, maka pada argumen kedua kita definisikan ke 1 (satu).*/

    taskElement.remove();
    updateDataToStorage();
}

function createUndoButton(){
    return createButton("undo-button", function(event){
        undoTaskFromElementFromCompleted(event.target.parentElement);
    });
}
function createTrashButton(){
    return createButton("trash-button", function(event){
        removeTaskElementFromCompleted(event.target.parentElement);
    });
}
function createCheckButton(){
    return createButton("check-button", function(event){
        addTaskToCompleted(event.target.parentElement);
    });
}