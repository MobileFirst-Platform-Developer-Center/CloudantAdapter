var Cloudant = function(type){
	if(type == "javascript"){
		return new CloudantJS();
	}
	else{
		return new CloudantJava();
	}
}