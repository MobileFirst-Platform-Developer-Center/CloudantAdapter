/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var CloudantJS = function(){

};

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
