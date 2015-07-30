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

//Database Methods



function createDB(name) {
	var method = "createDB";
	var msg = "method: <" + method + "> called.";
	WL.Logger.info(msg);
	var input = {
		    method : 'put',
		    returnedContentType : 'json',
		    path : name
		};
	
	return WL.Server.invokeHttp(input);
}

function deleteDB(name) {
	var method = "deleteDB";
	var msg = "method: <" + method + "> called.";
	WL.Logger.info(msg);
	var input = {
		    method : 'delete',
		    returnedContentType : 'json',
		    path : name
		};
	
	return WL.Server.invokeHttp(input);
}

function getAllDocs(name, limit, include_docs) {
	var method = "getAllDocs";
	var msg = "method: <" + method + "> called.";
	WL.Logger.info(msg);
	
	var path = name + '/_all_docs?include_docs=' + include_docs;
	if ((limit !== null) && (!isNaN(limit))) {
		path = path + "&limit=" + limit;
	}
	
	WL.Logger.info("Path: " + path);
	var input = {
		    method : 'get',
		    returnedContentType : 'json',
		    path : path,
		};
	
	return WL.Server.invokeHttp(input);
}

function updateDocs(name, updates) {
	var input = {
		    method : 'post',
		    returnedContentType : 'json',
		    path : name + '/_bulk_docs',
		    body: { 
                contentType : 'application/json',         
                content : createJsonObject('docs', updates)
            }
		};
	
	return WL.Server.invokeHttp(input);
}

// Document Methods
function createDoc(name, doc) {
	
	var input = {
		    method : 'post',
		    returnedContentType : 'json',
		    path : name + '/',
		    body: { 
	            contentType : 'application/json',         
	            content : JSON.stringify(doc)
	        }
		};
	
	return WL.Server.invokeHttp(input);
}

function getDoc(name, docID) {
	var path = name + '/' + docID;
	WL.Logger.info("Path: " + path);
	var input = {
		    method : 'get',
		    returnedContentType : 'json',
		    path : path
		};
	
	return WL.Server.invokeHttp(input);
}

function updateDoc(name, doc) {
	var input = {
		    method : 'put',
		    returnedContentType : 'json',
		    path : name,
		    body: { 
                contentType : 'application/json',         
                content : doc
            }
		};
	
	return WL.Server.invokeHttp(input);
}

function deleteDoc(name, docID, docRev) {
	var input = {
		    method : 'delete',
		    returnedContentType : 'json',
		    path : name + '/' + docID + '?rev=' + docRev
		};
	
	return WL.Server.invokeHttp(input);
}

function createDesignDoc(name, docName, designDoc) {
	var input = {
		    method : 'put',
		    returnedContentType : 'json',
		    path : name + '/_design/' + docName,
		    body: { 
                contentType : 'application/json',         
                content : designDoc
            }
		};
	
	return WL.Server.invokeHttp(input);
}

function search(name, designDocName, viewName, limit, include_docs, query) {
	
	var path = name + '/_design/' + designDocName + '/_search/' + viewName + '?q=' + query + '&include_docs=' + include_docs;
	
	if ((limit !== null) && (!isNaN(limit))) {
		path = path + "&limit=" + limit;
	}
	
	var input = {
		    method : 'get',
		    returnedContentType : 'json',
		    path : path
		};
	
	return WL.Server.invokeHttp(input);
}

function getView(name, designDocName, viewName, group) {
	
	var path = name + '/_design/' + designDocName + '/_view/' + viewName + '?group=' + group;
	
	var input = {
		    method : 'get',
		    returnedContentType : 'json',
		    path : path
		};
	
	return WL.Server.invokeHttp(input);
}

