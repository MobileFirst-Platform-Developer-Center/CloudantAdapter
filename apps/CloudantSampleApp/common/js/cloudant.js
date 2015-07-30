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

	var createDB = function(db, success, failure) {
		var method = "createDB";
		var msg = "method: <" + method + "> called.";
		WL.Logger.debug(msg);
	    var invocationData = {
	            adapter : 'CloudantAdapter',
	            procedure : method,
	            parameters : [db]
	    };

	    var options = {
	            onSuccess : success,
	            onFailure : failure
	    };

	    WL.Client.invokeProcedure(invocationData, options);
	};
	
	var createDesignDoc = function(db, success, failure) {
		var method = "createDesignDoc";
		var msg = "method: <" + method + "> called.";
		
		var body = JSON.stringify({
			  "indexes": {
			    "people": {
			      "analyzer": "standard",
			      "index": "function(doc){\n  if(doc.name){\n    index(\"name\", doc.name, {\"store\": \"yes\"});\n  } if(doc.age){\n    index(\"age\", doc.age, {\"store\": \"yes\"});\n  }\n}"
			    }
			  }
			});
		WL.Logger.debug(msg);
	    var invocationData = {
	            adapter : 'CloudantAdapter',
	            procedure : method,
	            parameters : [db, 'indexes', body]
	    };

	    var options = {
	            onSuccess : success,
	            onFailure : failure
	    };

	    WL.Client.invokeProcedure(invocationData, options);
	};
	

	var deleteDB = function(db, success, failure) {
		var method = "deleteDB";
		var msg = "method: <" + method + "> called.";
		WL.Logger.debug(msg);
	    var invocationData = {
	            adapter : 'CloudantAdapter',
	            procedure : method,
	            parameters : [db]
	    };

	    var options = {
	            onSuccess : success,
	            onFailure : failure
	    };

	    WL.Client.invokeProcedure(invocationData, options);
	};
	

	var createDoc = function(db, data, success, failure) {
		var method = "createDoc";
		var msg = "method: <" + method + "> called.";
		WL.Logger.debug(msg);
	    var invocationData = {
	            adapter : 'CloudantAdapter',
	            procedure : method,
	            parameters : [db, data]
	    };

	    var options = {
	            onSuccess : success,
	            onFailure : failure
	    };

	    WL.Client.invokeProcedure(invocationData, options);
	};

	
	var getAllDocs = function(db, limit, success, failure) {
		var method = "getAllDocs";
		var msg = "method: <" + method + "> called.";
		WL.Logger.debug(msg);
		var include_docs = 'true';
	    var invocationData = {
	            adapter : 'CloudantAdapter',
	            procedure : method,
	            parameters : [db, limit, include_docs]
	    };

	    var options = {
	            onSuccess : success,
	            onFailure : failure
	    };

	    WL.Client.invokeProcedure(invocationData, options);
	};

	var countAllDocs = function(db, success, failure) {
		var method = "countAllDocs";
		var msg = "method: <" + method + "> called.";
		WL.Logger.debug(msg);
		var include_docs = 'false';
	    var invocationData = {
	            adapter : 'CloudantAdapter',
	            procedure : "getAllDocs",
	            parameters : [db, null, include_docs]
	    };

	    var options = {
	            onSuccess : success,
	            onFailure : failure
	    };

	    WL.Client.invokeProcedure(invocationData, options);
	};
	
	var queryName = function(db, name, limit, success, failure) {
		var method = "search";
		var msg = "method: <" + method + "> called.";
		WL.Logger.debug(msg);
	    var invocationData = {
	            adapter : 'CloudantAdapter',
	            procedure : method,
	            parameters : [db, 'indexes', 'people', limit, 'true', 'name:' + name + '~']
	    };

	    var options = {
	            onSuccess : success,
	            onFailure : failure
	    };

	    WL.Client.invokeProcedure(invocationData, options);
	};
	
	var queryAge = function(db, age, limit, success, failure) {
		var method = "search";
		var msg = "method: <" + method + "> called.";
		WL.Logger.debug(msg);
	    var invocationData = {
	            adapter : 'CloudantAdapter',
	            procedure : method,
	        parameters : [db, 'indexes', 'people', limit, 'true', 'age:' + age]
	    };

	    var options = {
	            onSuccess : success,
	            onFailure : failure
	    };

	    WL.Client.invokeProcedure(invocationData, options);
	};
	
	var getDoc = function(db, id, success, failure) {
		var method = "getDoc";
		var msg = "method: <" + method + "> called.";
		WL.Logger.debug("getDoc: " + id);
		WL.Logger.debug(msg);
	    var invocationData = {
	            adapter : 'CloudantAdapter',
	            procedure : method,
	            parameters : [db, id]
	    };

	    var options = {
	            onSuccess : success,
	            onFailure : failure
	    };

	    WL.Client.invokeProcedure(invocationData, options);
	};
	