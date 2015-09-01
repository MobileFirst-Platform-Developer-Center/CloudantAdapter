var CloudantJava = function(){

}

CloudantJava.prototype.getAllEntries = function(){
	var resourceRequest = new WLResourceRequest("/adapters/CloudantJava/", WLResourceRequest.GET, 30000);
	return resourceRequest.send().then(function(response){
		return response.responseJSON;
	});
};

CloudantJava.prototype.addEntry = function(entry){
	var resourceRequest = new WLResourceRequest("/adapters/CloudantJava/", WLResourceRequest.POST, 30000);
	resourceRequest.setHeader("Content-Type","application/json");
	return resourceRequest.send(entry);
};

CloudantJava.prototype.deleteEntry = function(entry){
	var resourceRequest = new WLResourceRequest("/adapters/CloudantJava/"+entry._id, WLResourceRequest.DELETE, 30000);
	resourceRequest.setHeader("Content-Type","application/json");
	return resourceRequest.send(entry)
};