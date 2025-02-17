const { expect } = require('@playwright/test');
class PageTodo {
    constructor(page) {
        this.page = page;
        this.todoInput = page.locator('.new-todo');
        this.todoList = page.locator('.todo-list li');
        this.todoLabel = page.locator('.todo-list li label');
        this.todoDestroy = page.locator('.todo-list li .destroy');
        this.todoCount = page.locator('.todo-count');
        this.clearCompleted = page.locator('.clear-completed');
        //this.filterAll = 'text=All';
        //this.filterActive = 'text=Active';
       // this.filterCompleted = 'text=Completed';
    }

    async goto() {
        await this.page.goto('https://todomvc.com/examples/react/dist/');
    }

    async addTodo(todoText) {
        await this.todoInput.fill(todoText); // Add new task
        await this.todoInput.press('Enter'); // Press Enter to submit the task
   }
    
   
   async getTodos() {
    return await this.todoList.allTextContents();  // Returns all todo text as an array
}

async getTodosEmptyCount() {
   // Assert that the todo list is empty after deleting
   const todoCount = await this.todoList.count(); // Returns empty item
    expect(todoCount).toBe(0); // The list should be empty after deletion   
}

async verifyTodos(expectedTodos) {
    const actualTodos = await this.getTodos();
    expect(actualTodos).toEqual(expectedTodos);  // Compare actual todos with expected
}


async completeTodo(index) {
    
const todoItem = this.todoList.nth(index)    // Locate the todo item at the specified index
const toggle = todoItem.locator('.toggle'); // Locate the toggle checkbox inside the todo item
await toggle.check(); // Check the toggle to mark as completed


}

 // Get the count of active todos
 async getActiveTodoCount() {
    const countText = await this.todoCount.innerText(); // Get the text inside the <strong> tag
    return parseInt(countText, 10); // Convert the text to a number
}

 // Delete all todos one by one
 async deleteTodos() {
    const count = await this.todoList.count(); // Get the number of todos

    // Loop through each todo and delete it
    for (let i = 0; i < count; i++) {
        // Always delete the first item because the list updates after deletion
        const todoItem = this.todoList.first();

        // Hover over the todo item to make the destroy button visible
        await todoItem.hover();

        // Click the destroy button
        await todoItem.locator('.destroy').click();

        // Wait for the todo item to be removed
        await this.page.waitForTimeout(500); // Optional: Add a small delay for stability
    }
}
async clearCompletedItem() {
    await this.clearCompleted.click();
}

}
module.exports = { PageTodo };