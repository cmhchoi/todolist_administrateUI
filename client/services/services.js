angular.module('todo.services', [])
  .factory('todoStorage', function ($http, $injector) {
    return $injector.get('localStorage');
  })
  .factory('localStorage', function ($q) {

    const STORAGE_ID = 'todos-angularjs';

    const store = {
      todos: [],

      _getFromLocalStorage: () => JSON.parse(localStorage.getItem(STORAGE_ID) || '[]'),

      _saveToLocalStorage: (todos) => {
        localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
      },

      delete: (todo) => {
        const deferred = $q.defer();

        store.todos.splice(store.todos.indexOf(todo), 1);
        store._saveToLocalStorage(store.todos);
        deferred.resolve(store.todos);

        return deferred.promise;
      },

      get: () => {
        const deferred = $q.defer();

        angular.copy(store._getFromLocalStorage(), store.todos);
        deferred.resolve(store.todos);

        return deferred.promise;
      },

      insert: (todo) => {
        const deferred = $q.defer();

        store.todos.push(todo);
        store._saveToLocalStorage(store.todos);
        deferred.resolve(store.todos);

        return deferred.promise;
      },

      put: (todo, index) => {
        const deferred = $q.defer();

        store.todos[index] = todo;
        store._saveToLocalStorage(store.todos);
        deferred.resolve(store.todos);

        return deferred.promise;
      },
    };

    return store;
  });