Playwright + Cucumber Todo App Test

🛠 Setup & Installation

1. Clone the Repository

git clone - https://github.com/Nitinmishu/Playwright-Project.git


2. Install Dependencies

npm install

Run the following command to install Playwright, Cucumber, and related tools:

npm init -y  # Initialize package.json if not done

npm install --save-dev @playwright/test @cucumber/cucumber playwright chai


3. Run Tests

Run tests in Chromium (default)

npm run test


4. Run tests in Firefox

BROWSER=firefox npm run test

🚀 Test Execution

The tests will:

Launch the specified browser (Chromium by default, or Firefox if specified).

Open the Todo site 

Perform test actions (add/delete todos, verify functionality).


Close the browser after execution.



📦 Project Root
 ┣ 📂 features                # Cucumber feature files
 ┃ ┣ 📜 Todo.feature          # Scenarios for Todo app
 ┣ 📂 features/support        # Hooks
 ┣  📂features/Set_Definations # step definitions
 ┃ ┣ 📜 hooks.js              # Playwright setup (Before/After hooks)
 ┃ ┣ 📜 steps.js              # Step definitions for Cucumber
 ┣ 📂 Page                    # Page Object Model
 ┃ ┣ 📜 PageTodo.js           # Todo Page class
 ┣ 📜 package.json            # Project dependencies & scripts
 ┣ 📜 README.md               # Documentation (You're reading this!)



 🔧 Configuration

You can modify browser settings in features/support/hooks.js:

const browserType = process.env.BROWSER === 'firefox' ? firefox : chromium;

Change headless: false to headless: true to run tests in headless mode.

Increase setDefaultTimeout(30000) if tests timeout frequently.

