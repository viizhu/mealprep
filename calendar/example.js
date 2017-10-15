angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);
angular
  .module('mwl.calendar.docs')
  .controller('DraggableExternalEventsCtrl', function(moment, alert, calendarConfig, recipeService) {

    var vm = this;

    vm.events = [];

    vm.externalEvents = [];
    getRecipes();
    function getRecipes() {
      recipeService.getRecipes().then(function (resp) {
        vm.externalEvents = resp.data.recipes;
      }, function (resp) {
        console.error(resp);
      });
    }

    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();
    vm.cellIsOpen = false;

    vm.eventDropped = function(event, start) {
      var externalIndex = vm.externalEvents.indexOf(event);
      if (externalIndex > -1) {
        vm.externalEvents.splice(externalIndex, 1);
        vm.events.push(event);
      }
      event.startsAt = start;
      
      vm.viewDate = start;
      event.allDay = true;
      event.startsAt = vm.viewDate;
      event.endsAt =  new Date(vm.viewDate.getTime() + (event.numberServings-1)*24*60*60*1000);
      vm.cellIsOpen = false;
    };

    vm.eventClicked = function(event) {
          alert.show('Clicked', event);
        };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }

    };

     vm.cellModifier = function(cell) {
      console.log(cell);
    };

}) ;
