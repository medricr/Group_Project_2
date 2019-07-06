$(document).ready(()=>{
	console.log("ready boi")


	$.get("/api/user/test",function(data){
		console.log(data);
	})
})