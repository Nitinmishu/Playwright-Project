const { Given, When, Then } = require('@cucumber/cucumber');
const { test,expect,playwright } = require('@playwright/test');
const { PageTodo } = require('../../Page/PageTodo');
const { chromium } = require('playwright'); 




  // Step Definition for adding a new Todo item
  When('I add a new todo {string}', async function (todoText) {
    await this.todopage.addTodo(todoText); // Add TODO to the list
    

  });


// Step Definition for verifying the added Todo item
  Then('I should see the todo {string}', async function (todoText) {
    // Verify the text using different methods
    await this.todopage.verifyTodos([todoText]);  
    
  });

  // Step Definition for deleting a Todo item
  When('I delete the todo {string}', async function (todoText) {
    await this.todopage.deleteTodos();
  });

    // Step Definition for verify empty Todo item
  Then('the todo list should be empty', async function () {
   // Verify the TODO list is empty
   expect(await this.todopage.getTodosEmptyCount()); // 0 active todos remaining

   
   
            
  });

   //Step to add multiple todos
    When('I add the following todos:', async function (dataTable) {
        const todos = dataTable.rows().map(row => row[0]); // Extract first column
        for (const todo of todos) {
            await this.todopage.addTodo(todo);
        }
    });
// Step to verify todos are displayed correctly
Then('I should see the following todos:', async function (dataTable) {
    const expectedTodos = dataTable.rows().map(row => row[0]); // Extract first column
    const actualTodos = await this.todopage.getTodos(); // Get todos from UI

   expect(actualTodos).toEqual(expectedTodos);

});

// Step to verify the active todo count
Then('The active todo count should be {int}', async function (expectedCount) {
    const actualCount = await this.todopage.getActiveTodoCount();
    expect(actualCount).toBe(expectedCount);
});
 


// Step tp mark Todo as Complete
When('I mark the todo {string} as complete', async function (todoItem) {
    await this.todopage.completeTodo(0);
    
});
//Step tp active count of todos
Then('the active todo count should be {int}', async function (expectedCount) {
    const actualCount = await this.todopage.getActiveTodoCount();
    expect(actualCount).toBe(expectedCount);
});
// steps to delete all the Todo Items
When('I delete all todos', async function () {
    await this.todopage.deleteTodos();
});


When('I clear completed todos', async function () {
    await this.todopage.clearCompletedItem();

});











