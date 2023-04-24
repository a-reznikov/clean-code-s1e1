//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

  var listItem=document.createElement("div");

  //input (checkbox)
  var checkBox=document.createElement("input");//checkbx
  //taskName
  var taskName=document.createElement("p");//taskName
  //input (text)
  var editInput=document.createElement("input");//text
  //button.edit
  var editButton=document.createElement("button");//edit button

  //.section__button_delete
  var deleteButton=document.createElement("button");//delete button
  var deleteButtonImg=document.createElement("img");//delete button image

  listItem.className="section__task-wrapper";

  taskName.innerText=taskString;
  taskName.className="section__task-name";

  //Each elements, needs appending
  checkBox.type="checkbox";
  checkBox.className="section__task-check";
  editInput.className="task-input section__input";
  editInput.type="text";

  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editButton.className="button section__button_edit";

  deleteButton.className="button section__button_delete";
  deleteButtonImg.className="button__icon_delete";
  deleteButtonImg.src="./remove.svg";
  deleteButtonImg.alt="delete button";
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(taskName);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log(`Change "edit" to "save"`);


  var listItem=this.parentNode;

  var editInput=listItem.querySelector(".section__input");
  var taskName=listItem.querySelector(".section__task-name");
  var editBtn=listItem.querySelector(".section__button_edit");
  var containsClass=listItem.classList.contains("section__task-wrapper_edit");
  //If class of the parent is .section__task-wrapper_edit
  if(containsClass){

    //switch to .section__task-wrapper_edit
    //taskName becomes the inputs value.
    taskName.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=taskName.innerText;
    editBtn.innerText="Save";
  }

  //toggle .section__task-wrapper_edit on the parent.
  listItem.classList.toggle("section__task-wrapper_edit");
  taskName.classList.toggle("section__task-name_edit");
  editInput.classList.toggle("section__input_edit");
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var div=listItem.parentNode;
  //Remove the parent list item from the ul.
  div.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem=this.parentNode;
  var taskName=listItem.querySelector(".section__task-name");

  taskName.classList.add("section__task-name_completed");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  var listItem=this.parentNode;
  var taskName=listItem.querySelector(".section__task-name");

  taskName.classList.remove("section__task-name_completed");
  completedTasksHolder.appendChild(listItem);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  var checkBox=taskListItem.querySelector(".section__task-check");
  var editButton=taskListItem.querySelector(".section__button_edit");
  var deleteButton=taskListItem.querySelector(".section__button_delete");


  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.