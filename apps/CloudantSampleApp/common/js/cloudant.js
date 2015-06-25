/*
 *
    COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
    these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
    application programs conforming to the application programming interface for the operating platform for which the sample code is written.
    Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
    IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.

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
	