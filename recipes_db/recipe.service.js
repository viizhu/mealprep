
angular.module('mwl.calendar.docs').service('recipeService', recipeService);

recipeService.$inject = ['$q', '$http'];
function recipeService($q, $http){
    this.getRecipes = function getRecipes(params, successCallback, errorCallback) {
        var deferred = $q.defer();
        $http.get('https://viizhu.github.io/mealprep/recipes_db/recipes_db.json', {
            headers: {},
            params: {
                file: 'recipes'
            }
        }).then(_handleResponse, _handleError)
        return deferred.promise;

        function _handleResponse(data) {
            if (!!successCallback) {
                successCallback(data);
            }
            deferred.resolve(data);
        }

        function _handleError(data) {
            if (!!errorCallback) {
                errorCallback(data);
            }
            deferred.reject(data);
        }
    }
}