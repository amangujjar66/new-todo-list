#! /usr/bin/env node

import inquirer from "inquirer";

let todo: string[] = [];
let condition = true;

interface taskupdate {
    idx: number;
    updatedTask: string;
}

let main = async () => {
    while (condition){
     let options = await inquirer.prompt({
        name: "option",
        type: "list",
        message: "please select tha relevant option",
        choices: ["Add Task", "Delete Task", "Update Task","View Task","Exit"],
     });

     if (options.option === "Add Task"){
        await addTask();
     }else if (options.option === "Delete Task"){
      await viewTask();
      let deleteoption =await inquirer.prompt({
        name :"opt",
        type :"number",
        message :"Enter index number of tha task you want to delete:",
      });
       deleteTask(deleteoption.opt);
     } else if (options.option === "Update Task"){
        await updateTask();
     } else if (options.option === "View Task"){
        await viewTask();
     } else if (options.option === "Exit") {
        condition = false
     };
   }
};

//Function to add a new task 
let addTask = async () => {
    let newTask = await inquirer.prompt({
        name : "Task",
        type : "input",
        message : "Enter your new task:",
    });
    todo.push(newTask.Task);
    console.log(`${newTask.Task} added successfully into tha list. `);
};

// Function to delete a task .
let viewTask = async () => {
    console.log("Current  Task:");
    todo.forEach ((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
    console.log(""); // Add a blonk line for separtion
};

//Function to delete a task
let deleteTask = (index: number) => {
    if (index < 1 || index > todo.length) {
        console.log("invalid index. please enter avalid index.");
        return;
    }

     let deleteTask = todo.splice(index - 1, 1)[0]; // Remove task at specifide index.
      console.log(`${deleteTask} deleted successfully.`);
};

//Function to update a task 
let updateTask = async () => {
    await viewTask();
    let updateTaskIndex = await inquirer.prompt<taskupdate> ([
        {
            name : "idx",
            type : "number",
            message : "please enter tha index number (1-based) to update task:",
        },
        {
            name : "updateTask",
            type : "input",
            message : "Enter tha new task name:",
        },
    ]);

    let indexToUpdate = updateTaskIndex.idx - 1; // convert 1-based index to zero-based index
    if (indexToUpdate < 0 || indexToUpdate >= todo.length){
        console.log("Invalid index, please enter avalid index.");
        return;
    }

    todo[indexToUpdate] = updateTaskIndex.updatedTask;
    console.log(`Task at index ${updateTaskIndex.idx} updated successfuly.`);
};

main();
