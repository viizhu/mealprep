angular.module('mwl.calendar.docs')
  .config(['calendarConfig', function(calendarConfig) {

    // View all available config
    console.log(calendarConfig);

    // Change the month view template globally to a custom template
    calendarConfig.templates.calendarMonthCell = './calendarMonthCellTemplate.html'; 

  }]);