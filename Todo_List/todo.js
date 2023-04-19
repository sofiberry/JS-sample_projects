      /*
      ?* MODEL SECTION :
      ** todo if the local storage has a todos  array, then use it.
      ** Otherwise use the default array.
      */
      
      let todos; 
      //Retrieve from local storage
      const savedTodos = JSON.parse(localStorage.getItem('todos'));
      //Check if it's an array
      if(Array.isArray(savedTodos)){
         todos = savedTodos;
      } else {
         todos = [{
            title: 'Get Started',
            dueDate: '2023-04-04',
            id: 'id1'
         }, { 
            title: 'Make dinner',
            dueDate: '2023-04-09',
            id: 'id2'
         }, {
            title: 'do laundry',
            dueDate: '2023-04-10',
            id: 'id3'
         }];
      }

      //CREATE A TODO:
      const createTodo = (title, dueDate) => {
         const id = '' + new Date().getTime();

         todos.push({
            title: title,
            dueDate: dueDate,
            id: id
         });

         saveTodos();
      }
      
      //DELETE A TODO:
      const removeTodo = idToDelete => {
         todos = todos.filter(function (todo) {
            //IF the id of this todo matches  idToDelete, return false
            //For everything else, return true
            if(todo.id == idToDelete) {
               return false;
            }
            else {
               return true; 
            }
         });

         saveTodos();
      }

      //SAVE A TODO:
      const saveTodos = () => {
         localStorage.setItem('todos', JSON.stringify(todos));
      }
      
      //CONTROLLER SECTION:
      const addTodo = () => {
         const input = document.getElementById('input');
         const title = input.value;

         const datePicker = document.getElementById('date-picker');
         const dueDate = datePicker.value;

         createTodo(title, dueDate);
         render();
      }

      const deleteTodo = event => {
         const deleteButton = event.target;
         const idToDelete = deleteButton.id;

         removeTodo(idToDelete);
         render();
      }

      // VIEW SECTION:
      const render = () => {
         //reset todo list
         document.getElementById('todo-list').innerHTML = '';

         todos.forEach(function (todo) {
            const element = document.createElement('div');
            element.innerText = todo.title + ': ' + todo.dueDate;

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.style = 'margin-left: 1em;';
            deleteButton.onclick = deleteTodo;
            deleteButton.id = todo.id;
            element.appendChild(deleteButton);

            const todoList = document.getElementById('todo-list');
            todoList.appendChild(element);
         });
      }

      render();
