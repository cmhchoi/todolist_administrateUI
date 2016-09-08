angular.module('todo', ['ngRoute', 'todo.services', 'todo.tasks'])
  .config(($routeProvider) => {

    const configuration = (templateUrl) => {
      return {
        controller: 'TodoCtrl',
        templateUrl,
        resolve: { store: todoStorage => todoStorage },
      }
    };

    $routeProvider
      .when('/', configuration('tasks/tasks.html'))
      .when('/new', configuration('tasks/new.html'))
      .when('/edit/:todo_id', configuration('tasks/edit.html'))
      .otherwise({
        redirectTo: '/',
      });
      
  });