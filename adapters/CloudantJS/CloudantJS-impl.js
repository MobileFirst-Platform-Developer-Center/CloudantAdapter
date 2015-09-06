//Database Name
var DATABASE_NAME = 'test';

function addEntry(entry){
	
	var input = {
		    method : 'post',
		    returnedContentType : 'json',
		    path : DATABASE_NAME + '/',
		    body: { 
	            contentType : 'application/json',         
	            content : entry
	        }
		};
	
	var response = WL.Server.invokeHttp(input);
	if(!response.id){
		response.isSuccessful = false;
	}
	return response;
	
}

function deleteEntry(entry){
	entry = JSON.parse(entry);
	var input = {
		    method : 'delete',
		    returnedContentType : 'json',
		    path : DATABASE_NAME + '/' + entry._id + '?rev=' + entry._rev
		};
	
	var response = WL.Server.invokeHttp(input);
	
	if(!response.id){
		response.isSuccessful = false;
	}
	return response;
}

function getAllEntries(){
	var path = DATABASE_NAME + '/_all_docs?include_docs=true';
	
	var input = {
		    method : 'get',
		    returnedContentType : 'json',
		    path : path,
		};
	
	var response = WL.Server.invokeHttp(input);
	
	if(!response.rows){
		response.isSuccessful = false;
		return response;
	}
	else{
		var results = [];
		
		for(var i=0; i < response.rows.length; i++){
			results.push(response.rows[i].doc);
		}
		return {'rows': results};
	}
	
}


