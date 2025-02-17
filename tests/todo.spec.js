const { test, expect } = require('@playwright/test');
const { PageTodo } = require('../Page/PageTodo');

test.describe('TodoMVC Tests', () => {
        let todopage;
        
        test.beforeEach('Goto the site',async ({ page }) => {
            todopage = new PageTodo(page);
            await todopage.goto(); // Open the Todo app before each test
            await expect(page).toHaveTitle("TodoMVC: React");

        });

        test('Enter the new TODO and Verify added and deleted',async ({ page }) => {
            //const todopage = new PageTodo(page);
            await todopage.addTodo('Meeting John at 3:30 GMT'); // Add TODO to the list
            // Verify the text using different methods
            await expect(page.locator("label[data-testid='todo-item-label']")).toHaveText('Meeting John at 3:30 GMT');
            await page.hover("label[data-testid='todo-item-label']");
            await page.locator('.destroy').click();
            

        });

        test('Verify list of Item getting added for TODO and displayed',async ({ page }) => {

           const TODO_ITEMS = ['save the world', 'go back in time', 'learn C'];
           //const todopage = new PageTodo(page);
           for (const todo of TODO_ITEMS) {
            await todopage.addTodo(todo);
           }
            const todolist = await todopage.getTodos();
            console.log(todolist);
            // Verify that the list contains the correct todos
           await todopage.verifyTodos(TODO_ITEMS);   
           await page.screenshot({ path: 'screenshots/todo_Added.png', fullPage: true });

           const activeTodoCount = await todopage.getActiveTodoCount();
           expect(activeTodoCount).toBe(3); // 3 active todos remaining

        
        });

        
        test('Verify that a todo can be marked as complete and deleted.', async ({ page }) => {
            const todopage = new PageTodo(page);
            await todopage.addTodo('Read a book');
            await todopage.completeTodo(0);

            const activeTodoCount = await todopage.getActiveTodoCount();
           expect(activeTodoCount).toBe(0); // 0 active todos remaining
            

        // Take a screenshot after marking the todo as completed
        await page.screenshot({ path: 'screenshots/todo_completed.png', fullPage: true });

        await todopage.deleteTodos();

        // Assert that the todo list is empty after deleting
        const todoCount = await page.locator('.todo-list li').count();
        expect(todoCount).toBe(0); // The list should be empty after deletion

        await page.screenshot({ path: 'screenshots/todo_completedanddeleted.png', fullPage: true });


            
        });


        test('Verify the list of TODOS added are deleted one by one', async ({ page }) => {
            const todopage = new PageTodo(page);
            await todopage.addTodo('Buy groceries');
            await todopage.addTodo('Walk the dog');
            await todopage.addTodo('Read a book');
            // Verify the count
           // Get the count of active todos
             const activeTodoCount = await todopage.getActiveTodoCount();
           expect(activeTodoCount).toBe(3); // 3 active todos remaining
            // Delete all todos one by one
           await todopage.deleteTodos();
           expect(todopage.getTodosEmptyCount) === 0;
            await page.screenshot({ path: 'screenshots/todo_deletedonebyone.png', fullPage: true });
        });
        test.only('should clear completed todos', async ({ page }) => {
            const todopage = new PageTodo(page);
            await todopage.addTodo('Walk the dog');
            await todopage.completeTodo(0);
            await todopage.clearCompletedItem();
            expect(todopage.getTodosEmptyCount) === 0;
        });

        

            
    




    });
