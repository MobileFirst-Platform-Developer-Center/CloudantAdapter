var CloudantJS = function(){

}

CloudantJS.prototype.getAllEntries = function(){
	var resourceRequest = new WLResourceRequest("/adapters/CloudantJS/getAllEntries", WLResourceRequest.GET, 30000);
	return resourceRequest.send().then(function(response){
		return response.responseJSON.rows;
	});
};

CloudantJS.prototype.addEntry = function(entry){
	var resourceRequest = new WLResourceRequest("/adapters/CloudantJS/addEntry", WLResourceRequest.POST, 30000);
	resourceRequest.setQueryParameter("params", "['" + JSON.stringify(entry) + "']");
	return resourceRequest.send();
};

CloudantJS.prototype.deleteEntry = function(entry){
	var resourceRequest = new WLResourceRequest("/adapters/CloudantJS/deleteEntry", WLResourceRequest.POST, 30000);
	resourceRequest.setQueryParameter("params", "['" + JSON.stringify(entry) + "']");
	return resourceRequest.send();
};