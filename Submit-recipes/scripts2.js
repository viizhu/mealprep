$(document).ready(()=>{
	

	// $('#form-control').submit((event)=>{
	// 	event.preventDefault();
		var groceryList = [];

		$('.add').click(function(event){
			var userIngredient = $('.form-control').val()
  			groceryList.push(userIngredient);
  			console.log(groceryList);
  			

		});

		

})//end doc ready