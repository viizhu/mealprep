$(document).ready(function(){
  
  	$('#contact-form').submit((event)=>{

  		event.preventDefault();

  		$('.add').click(function(){
  			console.log("user clicked button")
  			var userIngredient = $('.form-control').val()
  			console.log(userIngredient);
  		})

  		$('[data-toggle="tooltip"]').tooltip(); 
		
		$(".req-input input, .req-input textarea").on("click input", function(){
			validate($(this).closest("[data-form-container]"));
		});
	    
		//This is for the on blur, if the form fields are all empty but the target was one of the fields do not reset to defaul state
		var currentlySelected;
		$(document).mousedown(function(e) {
	        currentlySelected = $(e.target);
	    });
		
		//Reset to form to the default state of the none of the fields were filled out
		$(".req-input input,  .req-input textarea").on("blur", function(e){
			var Parent = $(this).closest("[data-form-container]");
			//if the target that was clicked is inside this form then do nothing
			if(typeof currentlySelected != "undefined" && currentlySelected.parent().hasClass("req-input") && Parent.attr("id") == currentlySelected.closest(".form-container").attr("id"))
				return;
			
			var length = 0;
			Parent.find("input").each(function(){
				length += $(this).val().length;
			});
			Parent.find("textarea").each(function(){
				length += $(this).val().length;
			});
			if(length == 0){
				var container = $(this).closest(".form-container");
				resetForm(container);
			}
		});
		
		$(".create-account").on('click', function(){
			if($(".confirm-password").is(":visible")){
				$(this).text("Create an Account");
				$(this).closest("[data-form-container]").find(".submit-form").text("Login");
				$(".confirm-password").parent().slideUp(function(){
					validate($(this).closest("[data-form-container]"));
				});
			} else {
				$(this).closest("[data-form-container]").find(".submit-form").text("Create Account");
				$(this).text("Already Have an Account");
				$(".confirm-password").parent().slideDown(function(){
					validate($(this).closest("[data-form-container]"));
				});
			}
			
		});
		
		$("[data-toggle='tooltip']").on("mouseover", function(){
			console.log($(this).parent().attr("class"));
			if($(this).parent().hasClass("invalid")){
				$(".tooltip").addClass("tooltip-invalid").removeClass("tooltip-valid");
			} else if($(this).parent().hasClass("valid")){
				$(".tooltip").addClass("tooltip-valid").removeClass("tooltip-invalid");
			} else {
				$(".tooltip").removeClass("tooltip-invalid tooltip-valid");
			}
		});
	});	
});///end doc ready		




//   	})
//     $('[data-toggle="tooltip"]').tooltip(); 
	
// 	$(".req-input input, .req-input textarea").on("click input", function(){
// 		validate($(this).closest("[data-form-container]"));
// 	});
    
// 	//This is for the on blur, if the form fields are all empty but the target was one of the fields do not reset to defaul state
// 	var currentlySelected;
// 	$(document).mousedown(function(e) {
//         currentlySelected = $(e.target);
//     });
	
// 	//Reset to form to the default state of the none of the fields were filled out
// 	$(".req-input input,  .req-input textarea").on("blur", function(e){
// 		var Parent = $(this).closest("[data-form-container]");
// 		//if the target that was clicked is inside this form then do nothing
// 		if(typeof currentlySelected != "undefined" && currentlySelected.parent().hasClass("req-input") && Parent.attr("id") == currentlySelected.closest(".form-container").attr("id"))
// 			return;
		
// 		var length = 0;
// 		Parent.find("input").each(function(){
// 			length += $(this).val().length;
// 		});
// 		Parent.find("textarea").each(function(){
// 			length += $(this).val().length;
// 		});
// 		if(length == 0){
// 			var container = $(this).closest(".form-container");
// 			resetForm(container);
// 		}
// 	});
	
// 	$(".create-account").on('click', function(){
// 		if($(".confirm-password").is(":visible")){
// 			$(this).text("Create an Account");
// 			$(this).closest("[data-form-container]").find(".submit-form").text("Login");
// 			$(".confirm-password").parent().slideUp(function(){
// 				validate($(this).closest("[data-form-container]"));
// 			});
// 		} else {
// 			$(this).closest("[data-form-container]").find(".submit-form").text("Create Account");
// 			$(this).text("Already Have an Account");
// 			$(".confirm-password").parent().slideDown(function(){
// 				validate($(this).closest("[data-form-container]"));
// 			});
// 		}
		
// 	});
	
// 	$("[data-toggle='tooltip']").on("mouseover", function(){
// 		console.log($(this).parent().attr("class"));
// 		if($(this).parent().hasClass("invalid")){
// 			$(".tooltip").addClass("tooltip-invalid").removeClass("tooltip-valid");
// 		} else if($(this).parent().hasClass("valid")){
// 			$(".tooltip").addClass("tooltip-valid").removeClass("tooltip-invalid");
// 		} else {
// 			$(".tooltip").removeClass("tooltip-invalid tooltip-valid");
// 		}
// 	});
	
// })

// function resetForm(target){
// 	var container = target;
// 	container.find(".valid, .invalid").removeClass("valid invalid")
// 	container.css("background", "");
// 	container.css("color", "");
// }

// function setRow(valid, Parent){
// 	var error = 0;
// 	if(valid){
// 		Parent.addClass("valid");
// 		Parent.removeClass("invalid");
// 	} else {
// 		error = 1;
// 		Parent.addClass("invalid");
// 		Parent.removeClass("valid");
// 	}
// 	return error;
// }

// function validate(target){
// 	var error = 0;
// 	target.find(".req-input input, .req-input textarea, .req-input select").each(function(){
// 		var type = $(this).attr("type");
		
// 		if($(this).parent().hasClass("confirm-password") && type == "password"){
// 			var type = "confirm-password"; 
// 		}
		
// 		var Parent = $(this).parent();
// 		var val = $(this).val();
		
// 		if($(this).is(":visible") == false)
// 			return true; //skip iteration
		
// 		switch(type) {
// 			case "confirm-password":
// 				var initialPassword = $(".input-password input").val();
// 				error += setRow(initialPassword  == val && initialPassword.length > 0, Parent);
// 				break;
// 			case "password":
// 			case "textarea":
// 			case "text":
// 				var minLength = $(this).data("min-length");
// 				if(typeof minLength == "undefined")
// 					minLength = 0;
// 				error += setRow(val.length >= minLength, Parent);
// 				break; 
// 			case "email":
// 				error += setRow(validateEmail(val), Parent);
// 				break;
// 			case "tel":
// 				error += setRow(phonenumber(val), Parent);
// 				break;			
// 		}	
// 	});
	
// 	var submitForm = target.find(".submit-form");
// 	var formContainer = target;
// 	var formTitle = target.find(".form-title");
// 	if(error == 0){
// 		formContainer.css("background", "#C8E6C9");
// 		formContainer.css("color", "#2E7D32");
// 		submitForm.addClass("valid");
// 		submitForm.removeClass("invalid");
//         return true;
// 	} else {		
// 		formContainer.css("background", "#FFCDD2");
// 		formContainer.css("color", "#C62828");
// 		submitForm.addClass("invalid");
// 		submitForm.removeClass("valid");
//         return false;
// 	}
// }
// function phonenumber(inputtxt) {  
// 	if(typeof inputtxt == "undefined")
// 		return;
// 	var phoneno = /^\d{10}$/;  
// 	if((inputtxt.match(phoneno))) {  
// 		return true;  
// 	}  
// 	else {  
// 		return false;  
// 	}  
// }  

// function validateEmail(email) {
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
// }