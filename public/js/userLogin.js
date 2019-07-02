$(document).ready(function(){

	// Grab the username and password from the form
	var username = $("input#username_field");
	var password = $("input#pword_field");

	// When the user clicks on the login button...
	$("#login_btn").on("click", function(event){
		event.preventDefault();
		var user_data = {
			username: username.val().trim(),
			password: password.val().trim()
		};

		// If either field is empty, exit
		if(!user_data.username || !user_data.password){
			return;
		}
		// Else, proceed to log the user in
		userLogin(user_data.username, user_data.password);
	})

	// When the user clicks on the signup button...
	$("#signup_btn").on("click", function(event){
		
		event.preventDefault();
		var user_data = {
			username: username.val().trim(),
			password: password.val().trim()
		};
		// If either field is blank, exit
		if(!user_data.username || !user_data.password){
			return;
		}
		// Else, proceed to sign the user up
		userSignup(user_data.username, user_data.password);

	});

	function userLogin(username, password){

		$.post("/api/login", {
			username: username,
			password: password
		}).then(function(data) {
			// If everything checks out, send the user to the homepage logged into their profile
			window.location.replace("/")
		}).catch(handleLoginErr);
	}

	function userSignup(username, password)
	{
		// Call the signup route to create a new profile
		$.post("/api/signup", {
			username: username,
			password: password
		}).then(function(data){
			console.log(data)
		})

	}

	// Function for handling login errors
	function handleLoginErr(err) {
		$("#alert .msg").text(err.responseJSON);
		$("#alert").fadeIn(500);
  	}
});