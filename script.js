window.onload = function() {
	document.getElementById("FoodSubmit").addEventListener("click", async function(event) {
		event.preventDefault();
		
		const value = document.getElementById("FoodInput").value;
		if (value === "")
		return;
		
		console.log(value);
		
		try {
		var type = $(this).attr("data-type");
		var queryURL = "https://api.edamam.com/search?q=" + value + "&app_id=e01c42d8&app_key=19a34826099c7e0c9666127afe12981b";
		console.log(queryURL);

		// Grabbing our API results
		var n=0;
		$.ajax({
			url: queryURL,
			method: "GET",
		  })
			.then (function(response) {
			  $(".title").text("Recipe: " + response.hits[n].recipe.label);
			  $(".img").attr("src", response.hits[n].recipe.image);
			  
			  var info = "";
			  info += "From: " + '<a target="_blank"  href="' + response.hits[n].recipe.url + '">' + response.hits[n].recipe.source + '</a><br/>';
			  info += "Calories: " + response.hits[n].recipe.calories + "<br/>";
			  info += "Diet Labels: ";
			  for (let i=0; i < response.hits[n].recipe.dietLabels.length; i++) {
					info += response.hits[n].recipe.dietLabels[i];
				  if (i < (response.hits[n].recipe.dietLabels.length - 1) ) {
					info += ", ";
				  }
				  else {
					  info += " ";
				  }
			  }
			  info += "<br/>Health Labels: ";
			  for (let i=0; i < response.hits[n].recipe.healthLabels.length; i++) {
					info += response.hits[n].recipe.healthLabels[i];
				  if (i < (response.hits[n].recipe.healthLabels.length - 1) ) {
					info += ",  ";
				  }
			  }
			  document.getElementById("foodInfo").innerHTML = "<p> " + info + "</p>";
			  
			  var rec = "";
			  for (let i=0; i < response.hits[n].recipe.ingredients.length; i++) {
					rec += "- " + response.hits[n].recipe.ingredients[i].text + "<br/>";
			  }
			  document.getElementById("ingredientList").innerHTML = "<p> " + rec + "</p>";
		  });
			
			}catch(err) {
			console.log(err);
		}
	});
}