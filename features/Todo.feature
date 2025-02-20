Feature: Todo Site

  Scenario: Add a new TODO and verify it is added and deleted
    When I add a new todo "Meeting John at 3:30 GMT"
    Then I should see the todo "Meeting John at 3:30 GMT"
    When I delete the todo "Meeting John at 3:30 GMT"
    Then the todo list should be empty



    Scenario: Add multiple todos and verify they are displayed
   
    When I add the following todos:
      | Todo Item                              |
      | start learning Java                    |
      | Makes Presentation for the Review      |
      | Add the new Scenario before tomorrow   |
    Then I should see the following todos:
      | Todo Item                              |
      | start learning Java                    |
      | Makes Presentation for the Review      |
      | Add the new Scenario before tomorrow   |
    And The active todo count should be 3


    Scenario: Mark a todo as complete and delete it
    When I add a new todo "Start reading a new Book"
    And I mark the todo "Start reading a new Book" as complete
    Then the active todo count should be 0
    When I delete all todos
    Then the todo list should be empty


     Scenario: Delete todos one by one
    When I add the following todos:
      | Todo Item                              |
      | start learning Java                    |
      | Makes Presentation for the Review      |
      | Add the new Scenario before tomorrow   |
    Then the active todo count should be 3
    When I delete all todos
    Then the todo list should be empty


    Scenario Outline: Clear completed todos
    When I add a new todo "<Todo Item>"
    And I mark the todo "<Todo Item>" as complete
    When I clear completed todos
    Then the todo list should be empty

    Examples:
        | Todo Item |
        | Add the new Scenario before tomorrow|

