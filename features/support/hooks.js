const { setDefaultTimeout,Before,After } = require('@cucumber/cucumber');
const { test,expect } = require('@playwright/test');
const { PageTodo } = require('../../Page/PageTodo');
const { chromium,firefox } = require('playwright'); 



setDefaultTimeout(30000); // Set global timeout to 30 seconds
// Select the browser type from an environment variable (default to Chromium)
const browserType = process.env.BROWSER === 'firefox' ? firefox : chromium;


Before(async function () {
    try
    {
    this.browser = await browserType.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.todopage = new PageTodo(this.page);
    await this.todopage.goto(); // Open the Todo app before each test
    await this.page.waitForLoadState('load'); // Ensure page is fully loaded
    await expect(this.page).toHaveTitle("TodoMVC: React");
    // Run tests for this browser before launching the next
    
   
    console.log(`✅ ${browserType.name()} Browser launched, Todo Test loaded successfully.`);
    
    

}
    catch (error) {
        console.error(`❌ Error in Before hook: ${error.message}`);
        throw new Error(`🚨 Test setup failed! Could not launch browser. Reason: ${error.message}`);
    }
});

After(async function () {
    // Close the browser after each test case
    try {
        
        if (this.page) await this.page.close();
        if (this.context) await this.context.close();
        if (this.browser) await this.browser.close();
        console.log(`✅ ${browserType.name()} Browser closed Succesfully`);
    } catch (error) {
        console.error(`❌ Error in After hook: ${error.message}`);
        throw new Error(`🚨 Test setup failed! Could not launch browser. Reason: ${error.message}`);
    }
  });

