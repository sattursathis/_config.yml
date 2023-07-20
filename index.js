const addButton = document.getElementById('addBtn');
const inputBox = document.getElementById('inputBox');
const taskContainer = document.getElementById('taskContainer');
const taskArr=[];
const x=document.getElementById('console');

inputBox.focus();

x.addEventListener('click',()=>{
    console.log(taskArr)
})

function handleClick(){
    this.classList.toggle('completed');
    // const taskValue=this.innerText;
    const taskId=this.id.toString();

    for(let i=0;i<taskArr.length;i++){
       let taskObj=taskArr[i];
       if(taskObj.id.toString() === taskId){
        taskObj.isComplted = !taskObj.isComplted;
       }
    }
    setTask()
}

function handleRemove(){
    // const taskValue = this.innerText;
    const taskId=this.id.toString();

    for(let i =0; i< taskArr.length;i++){
        let taskObj = taskArr[i];
        if(taskObj.id.toString() === taskId){
            taskArr.splice(i,1)
        }
    }
    setTask();
  this.remove();
}



function setTask(){
    localStorage.setItem('tasks',JSON.stringify(taskArr))
}

function getTask(){
    let tasks = localStorage.getItem('tasks');
    if(!tasks){
        return;
    }
    tasks = JSON.parse(tasks);
    for(index in tasks){
        createTask ( tasks[index].value, tasks[index].isComplted , tasks[index].id );
        taskArr.push(tasks[index]);
    }
}

getTask()

function createTask(userInput,isComplted,taskId){
    const newElement = document.createElement('div');
    newElement.innerText = userInput;
    newElement.setAttribute('id',taskId);
    if(isComplted)
    newElement.setAttribute('class','task completed');
    else
    newElement.setAttribute('class','task');

    newElement.addEventListener('click',handleClick);
    newElement.addEventListener('dblclick',handleRemove);
    taskContainer.append(newElement);
}

function addTask(){
    const userInput = inputBox.value;
    if(userInput.length === 0) 
    {return alert("Enter the Task...")};

    // if(userInput.replace(/[\s+]/g,'').length === 0){
    //     return alert('Enter Valid Task')
    // }
     let count = 0;
    const inputLength = userInput.length;
    for(let i =0;i<inputLength;i++){
        if(userInput[i] === ' '){
        count = count + 1;
    }
    }

    if(inputLength === count) return alert ('Enter Valid Task')
     
    let taskId = Math.random();
    // let taskId = taskArr.length + 1;

    let taskObj={};
     taskObj.value=userInput;
     taskObj.isComplted = false;
     taskObj.id= taskId;
    taskArr.push(taskObj);
    
    setTask();
    createTask(userInput,false,taskId);

    inputBox.value = '';
    inputBox.focus();
}

function handleEnter(e){
    if(e.keyCode === 13){ 
        addTask()
    }
}

addButton.addEventListener('click',addTask);
inputBox.addEventListener('keyup',handleEnter);

