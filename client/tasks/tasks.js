angular.module('todo.tasks', [])
  .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, store) {

    const todos = $scope.todos = store.todos;

    $scope.newTodo = '';
    $scope.editedTodo = null;
    $scope.added = null;
    $scope.edited = null;
    $scope.hideAdd = true;
    $scope.hideEdit = true;
    $scope.reverse = true;
    $scope.propertyName = 'title';

    $scope.addTodo = () => {
      const dateObj = new Date();
      const month = dateObj.getUTCMonth() + 1;
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      const date = day + "/" + month + "/" + year;
      const newTodo = {
        title: $scope.newTodo.trim(),
        completed: false,
        date,
      };

      if (!newTodo.title) {
        return;
      }

      $scope.saving = true;
      store.insert(newTodo)
        .then(() => {
          $scope.newTodo = '';
        })
        .finally(() => {
          $scope.saving = false;
        });

      $scope.added = "Succesfully Added Task";
      $scope.hideAdd = false;
    };

    $scope.getTodo = () => {
      todos.forEach((todo) => {
        if(todo.$$hashKey === $routeParams.todo_id) {
          $scope.todo = todo;
        }
      })
    };

    $scope.saveEdits = (todo, event) => {
      if (event === 'blur' && $scope.saveEvent === 'submit') {
        $scope.saveEvent = null;
        return;
      }

      $scope.saveEvent = event;

      if ($scope.reverted) {
        $scope.reverted = null;
        return;
      }

      todo.title = todo.title.trim();

      store[todo.title ? 'put' : 'delete'](todo)
        .then(() => {})
        .catch(() => {
          todo.title = $scope.originalTodo.title;
        })
        .finally(() => {
          $scope.editedTodo = null;
        });

      $scope.edited = 'Succesfully Edited Task';
      $scope.hideEdit = false;
    };

    $scope.removeTodo = (todo) => {
      store.delete(todo);
    };

    $scope.saveTodo = (todo) => {
      store.put(todo);
    };

    $scope.sortBy = (propertyName) => {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };
  });