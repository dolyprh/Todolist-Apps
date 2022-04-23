document.addEventListener("DOMContentLoaded", function(){
    
    const Forms = document.getElementById("form");

    Forms.addEventListener("submit", function(event){
        event.preventDefault();
        addTodo();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data Berhasil Disaimpan");
})

document.addEventListener("ondataloaded", () => {
    refreshDataFromTodos();
});