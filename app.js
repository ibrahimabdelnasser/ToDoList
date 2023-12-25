//#region region Intial Data Source
let todosList = [
    {title:"Play Tennis" , status: "Not started"},
    {title:"Deliver JS Assignment" , status: "Not started"},
    {title:"Learn New Techs" , status: "Not started"}
];

//#endregion

//#region Creat Todos Li
let creatTodosLi = (todo) =>
`<li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div class="col-md-5">
            <span class="todoName">${todo.title}</span>
          </div>

          <div class="col-md-7 d-flex justify-content-start">
                <span class="badge bg-danger currentStatus mx-1">${ todo.status}</span>
                <select class="form-control statusSelect mx-1">
                  <option value="0" selected disabled>Status</option>
                  <option value="1">Not started</option>
                  <option value="2">In progress</option>
                  <option value="3">Done</option>
                </select>
                <i class="far fa-trash-alt delete py-2 mx-1"></i>
          </div>
        </li>`;

//#endregion

//#region Binding Todos Li
let bindTodosLi = (list) => todosUL.innerHTML = list.map(creatTodosLi).join("");

//#endregion

//#region Binding Single Todo
let bindSingleTodo = (todo) => todosUL.innerHTML += creatTodosLi(todo);
//#endregion

//#region Function Calls
bindTodosLi(todosList);
//#endregion

//#region Search Todo 
let searchTodo = (searchtext, list) =>{
let filteredTodo = list.filter((todo) =>
 todo.title.toUpperCase().includes(searchtext.toUpperCase())
 );
 bindTodosLi(filteredTodo)

};

//#endregion

//#region get status 
let getStatus = (currentstatus)=>
currentstatus === "1"?
`<option value="0" selected disabled>Status</option>
<option value="2">In progress</option>
<option value="3">Done</option>`:
currentstatus === "2"?
`<option value="0" selected disabled>Status</option>
<option value="1">Not started</option>
<option value="3">Done</option>`:
`<option value="0" selected disabled>Status</option>
<option value="1">Not started</option>
<option value="2">In progress</option>`
//#endregion

//#region badge function 
let changeBadge = (statusCode) =>
statusCode === "1"?
{status: "Not started", color: "bg-danger"}:
statusCode === "2"?
{status: "In progress", color: "bg-primary"}:
{status: "Done", color: "bg-success"};

//#endregion

//#region Events Handlers
window.addEventListener("DOMContentLoaded", () => {
const todosUL = document.getElementById("todosUL");
const searchForm = document.getElementById("searchForm");
const searchText = document.getElementById("searchText");
const addForm = document.getElementById("addForm");
const addText = document.getElementById("addText");

if(searchForm){
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let searchedText = searchText.value;
        searchTodo(searchedText, todosList);
        });
};
if(addForm){
    addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let text = addText.value;
        if(text.trim().length > 0){
            let newTodo = {title:text, status:"Not started"};
            todosList.push(newTodo);
            bindSingleTodo(newTodo);
        }
        addText.value = "";
    });
};
if(todosUL){
    todosUL.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            let todoToBeDeleted = e.target.parentElement.previousElementSibling.firstElementChild.innerHTML;
            e.target.parentElement.parentElement.remove();
            let indexTodoToBeDeleted = todosList.findIndex((todo) => todo.title === todoToBeDeleted );
            todosList.splice(indexTodoToBeDeleted,1);
        }
        
    });
};
todosUL.addEventListener("change",(e) => {
    if (e.target.classList.contains("statusSelect")){
        let selectedStatus = e.target.value ;
        e.target.innerHTML = getStatus(selectedStatus);
        let newBadge = changeBadge(selectedStatus);
        e.target.previousElementSibling.innerHTML=newBadge.status;
        e.target.previousElementSibling.className = `badge ${newBadge.color} currentStatus mx-1`;
    }

})




});


//#endregion

