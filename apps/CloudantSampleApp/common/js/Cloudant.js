var Cloudant = function(type){
	if(type == "js"){
		return new CloudantJS();
	}
	else{
		return new CloudantJava();
	}
}