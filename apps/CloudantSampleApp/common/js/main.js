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

/*globals WL, WLJQ, WL_*/

function wlCommonInit () {

(function (WL, jQuery, lodash) {

	'use strict';

	//Dependencies
	var $ = jQuery,
		_ = lodash;

	//CONSTANTS
	var PEOPLE_COLLECTION_NAME = 'people',
		KEY_VALUE_COLLECTION_NAME = 'keyvalue',
		INIT_FIRST_MSG = 'PERSISTENT_STORE_NOT_OPEN',
		NAME_FIELD_EMPTY_MSG = 'Name field is empty',
		AGE_FIELD_EMPTY_MSG = 'Age field is empty',
		ID_FIELD_EMPTY_MSG = 'Id field is empty',
		EMPTY_TABLE_MSG = 'No documents found',
		DESTROY_MSG = 'Database deleted',
		INIT_MSG = 'Database created',
		ADD_MSG = 'Data added to the collection',
		REPLACE_MSG = 'Document replaced succesfully, call find.',
		REMOVE_MSG = 'Documents removed: ',
		COUNT_MSG = 'Documents in the collection: ',
		REMOVE_COLLECTION_MSG = 'Removed all data in the collection',
		COUNT_QUERY_ERROR_MSG = 'FIND_BY_QUERY_EXPECTED_A_STRING',
		COUNT_QUERY_MSG = "Documents in the collection with name = ";

	// //Log messages to the console and status field
	// var _logMessage = function (msg, id) {
	// 	//Get reference to the status field
	// 	var status = _.isUndefined(id) ? $('div#status-field') : $(id);
	//
	// 	//Put message in the status div
	// 	status.text(msg);
	//
	// 	//Log message to the console
	// 	WL.Logger.info(msg);
	// };

	//Log messages to the console and status field
	var logMessage = function (msg, id) {
		//Get reference to the status field
		var status = _.isUndefined(id) ? $('div#console') : $(id);

		status.css("color", "#FFF");

		//Put message in the status div
		status.text(msg);

		//Log message to the console
		WL.Logger.info(msg);
	};

	WL.App.hideSplashScreen();

	//Show JSONStore document in a table
	var showResults = function (arr) {

		if (_.isArray(arr) && arr.length < 1) {
			return logMessage(EMPTY_TABLE_MSG);
		}

		//Log to the console
		WL.Logger.ctx({stringify: true, pretty: true}).info(arr);

		//Get reference to the status field
		var status = $('div#console');

		//list HTML template
		var template = '<h2>Results</h2>'
			+'<% _.each(people, function(person) { %>'
				+'<div><%= JSON.stringify(person, null, 2) %></div>'
			+'<% }); %>';

		status.css("color", "#FFF");

		//Put the generated HTML table into the DOM
		status.html(_.template(template, {people : arr}));
	};

	//Scroll to the top every time a button is clicked
	$('button').on('click', function () {
		$('html, body').animate({scrollTop: 0}, 'slow');
	});

	//init
	$('button#init').on('click', function () {


		var dbCreateSuccess = function (result) {
			if (result.invocationResult.statusCode != 201) {
				WL.Logger.info("DB Create failed due to status code: " + result.invocationResult.statusCode);
				if (result.invocationResult) {
					logMessage(result.invocationResult.reason);
				} else {
					logMessage("DB Create failed");
				}
			} else {
				WL.Logger.info("DB Create succeeded");

				var docCreateSuccess = function (result) {
					if (result.invocationResult.statusCode != 201) {
						if (result.invocationResult) {
							logMessage(result.invocationResult.reason);
						}
					} else {
						WL.Logger.info("DB Create succeeded");
					  logMessage(INIT_MSG);

					}
				};

				var docCreateFailure = function(result) {
					if (result.invocationResult) {
						logMessage(result.invocationResult.reason);
					}
				};

				createDesignDoc(PEOPLE_COLLECTION_NAME, docCreateSuccess, docCreateFailure);
			  logMessage(INIT_MSG);
			}
		};

		var dbCreateFailure = function(result) {
			WL.Logger.info("DB Create failed");
			if (result.invocationResult) {
				logMessage(result.invocationResult.reason);
			} else {
				logMessage("DB Create failed");
			}
			};

		createDB(PEOPLE_COLLECTION_NAME, dbCreateSuccess, dbCreateFailure);


	});

	//destroy
	$('button#destroy').on('click', function () {

		var dbDeleteSuccess = function (result) {
		if (result.invocationResult.statusCode != 200) {
			WL.Logger.info("DB Delete failed due to status code: " + result.invocationResult.statusCode);
			logMessage(result.invocationResult.reason);
		} else {
			WL.Logger.info("DB Delete succeeded");
			logMessage(DESTROY_MSG);
		}
	};

	var dbDeleteFailure = function(result) {
		WL.Logger.info("DB Delete failed");
		logMessage(result.invocationResult.reason);
	};

		//Create Cloudant DB
		deleteDB(PEOPLE_COLLECTION_NAME, dbDeleteSuccess, dbDeleteFailure);

	});

	//add
	$('button#add-data').on('click', function () {

		//Get references to the input fields DOM elements
		var nameField = $('input#add-name'),
			ageField = $('input#add-age');

		//Get values from the input fields
		var	name = nameField.val() || '',
			age = parseInt(ageField.val(), 10) || '';

		//Prepare the data object
		var data = {};

		//Check if a name was passed
		if (name.length > 0) {
			data.name = name;
		}

		//Check if an age was passed
		if(_.isNumber(age)) {
			data.age = age;
		}


			var addDataSuccess = function (result) {
				if (result.invocationResult.statusCode != 201) {
					WL.Logger.info("Add data failed due to status code: " + result.invocationResult.statusCode);
					logMessage(result.invocationResult.reason);
				} else {
					WL.Logger.info("Add data succeeded");
					logMessage(ADD_MSG);
				}
			};

			var addDataFailure = function(result) {
				WL.Logger.info("Add data failed");
				logMessage(result.invocationResult.reason);
			};

			createDoc(PEOPLE_COLLECTION_NAME, data, addDataSuccess, addDataFailure);


			//Clear the input fields
			nameField.val('');
			ageField.val('');


	});

	//find-name
	$('button#find-name').on('click', function () {

		//Get reference to the search field
		var searchFieldDOM = $('input#find-search'),
			limitField = $('input#find-limit'),
			offsetField =$('input#find-offset');

		//Get value from the search field
		var searchField = searchFieldDOM.val() || '',
			limit = parseInt(limitField.val(), 10) || '',
			offset = parseInt(offsetField.val(), 10) || '';

		//Create the query object
		var query = {};

		//Check if a name was passed
		if (searchField.length > 0) {
			query.name = searchField;
		}

		//Check if some value was passed
		if (_.isEmpty(query)) {
			return logMessage(NAME_FIELD_EMPTY_MSG);
		}

		//Create optional options object
		var options = {};

		//Check if limit was passed
		if (_.isNumber(limit)) {
			options.limit = limit;
		}

		//Check if offset was passed
		if (_.isNumber(offset)) {
			options.offset = offset;
		}

		var queryNameSuccess = function (result) {
			if (result.invocationResult.statusCode != 200) {
				WL.Logger.info("Find data failed due to status code: " + result.invocationResult.statusCode);
				logMessage(result.invocationResult.reason);
			} else {
				WL.Logger.info("Find data succeeded");
				if (result !== null && result.invocationResult !== null && result.invocationResult.total_rows !== null) {
					var output = [];
					if (result.invocationResult.total_rows > 0) {
						var rows = result.invocationResult.rows;
						for (var i=0;i<rows.length;i++) {
							var row = rows[i];
							var id = row.doc._id;
							var name = row.doc.name;
							var age = row.doc.age;
							var obj = {
									'_id': id,
									'json': {
										'name': name,
										'age': age
									}
							};
							output.push(obj);
						}
					}
					showResults(output);
				}
			}
		};

		var queryNameFailure = function(result) {
			WL.Logger.info("Find data failed");
			logMessage(result.invocationResult.reason);
		};

		queryName(PEOPLE_COLLECTION_NAME, query.name, options.limit, queryNameSuccess, queryNameFailure);

	});

	//find-age
	$('button#find-age').on('click', function () {

		//Get reference to the search field
		var searchFieldDOM = $('input#find-search'),
			limitField = $('input#find-limit'),
			offsetField =$('input#find-offset');

		//Get value from the search field
		var searchField = searchFieldDOM.val() || '',
			limit = parseInt(limitField.val(), 10) || '',
			offset = parseInt(offsetField.val(), 10) || '';

		//Create the query object
		var query = {};

		//Check if a name was passed
		if (searchField.length > 0) {
			query.age = searchField;
		}

		//Check if some value was passed
		if (_.isEmpty(query)) {
			return logMessage(AGE_FIELD_EMPTY_MSG);
		}

		//Optional options object to do exact match
		var options = {exact: true};

		//Check if limit was passed
		if (_.isNumber(limit)) {
			options.limit = limit;
		}

		//Check if offset was passed
		if (_.isNumber(offset)) {
			options.offset = offset;
		}



			var queryAgeSuccess = function (result) {
				if (result.invocationResult.statusCode != 200) {
					WL.Logger.info("Find data failed due to status code: " + result.invocationResult.statusCode);
					logMessage(result.invocationResult.reason);
				} else {
					WL.Logger.info("Find data succeeded");
					if (result !== null && result.invocationResult !== null && result.invocationResult.total_rows !== null) {
						var output = [];
						if (result.invocationResult.total_rows > 0) {
							var rows = result.invocationResult.rows;
							for (var i=0;i<rows.length;i++) {
								var row = rows[i];
								var id = row.doc._id;
								var name = row.doc.name;
								var age = row.doc.age;
								var obj = {
										'_id': id,
										'json': {
											'name': name,
											'age': age
										}
								};
								output.push(obj);
							}
						}
						showResults(output);
					}
				}
			};

			var queryAgeFailure = function(result) {
				WL.Logger.info("Find data failed");
				logMessage(result.invocationResult.reason);
			};

			queryAge(PEOPLE_COLLECTION_NAME, query.age, options.limit, queryAgeSuccess, queryAgeFailure);

			//Clear the input fields
			searchFieldDOM.val('');
			limitField.val('');
			offsetField.val('');


	});

	//find-all
	$('button#find-all').on('click', function () {

		//Get reference to the search field
		var limitField = $('input#find-limit'),
			offsetField =$('input#find-offset');

		//Get value from the search field
		var limit = parseInt(limitField.val(), 10) || '',
			offset = parseInt(offsetField.val(), 10) || '';

		//Create optional options object
		var options = {};

		//Check if limit was passed
		if (_.isNumber(limit)) {
			options.limit = limit;
		}

		//Check if offset was passed
		if (_.isNumber(offset)) {
			options.offset = offset;
		}

		var findAllSuccess = function (result) {
			if (result.invocationResult.statusCode != 200) {
				WL.Logger.info("Find data failed due to status code: " + result.invocationResult.statusCode);
				logMessage(result.invocationResult.reason);
			} else {
				WL.Logger.info("Find data succeeded");
				if (result !== null && result.invocationResult !== null && result.invocationResult.total_rows !== null) {
					var output = [];
					if (result.invocationResult.total_rows > 0) {
						var rows = result.invocationResult.rows;
						for (var i=0;i<rows.length;i++) {
							var row = rows[i];
							var id = row.doc._id;
							var name = row.doc.name;
							var age = row.doc.age;
							var obj = {
									'_id': id,
									'json': {
										'name': name,
										'age': age
									}
							};
							output.push(obj);
						}
					}
					showResults(output);
				}
			}
		};

		var findAllFailure = function(result) {
			WL.Logger.info("Find data failed");
			logMessage(result.invocationResult.reason);
		};


		getAllDocs(PEOPLE_COLLECTION_NAME, options.limit, findAllSuccess, findAllFailure);

			//Clear the input fields
			limitField.val('');
			offsetField.val('');


	});

	//find-by-id
	$('button#find-id-btn').on('click', function () {

		//Get reference to the id field
		var idField = $('input#find-id');

		//Get value from the search field
		var id = idField.val();

		//Check if an id was passed
		if (id == null || id == "") {
			return logMessage(ID_FIELD_EMPTY_MSG);
		}

		var getDocSuccess = function (result) {
			if (result.invocationResult.statusCode != 200) {
				WL.Logger.info("Get data failed due to status code: " + result.invocationResult.statusCode);
				logMessage(result.invocationResult.reason);
			} else {
				WL.Logger.info("Get data succeeded");
				if (result !== null && result.invocationResult !== null) {
					var output = [];
					var obj = {
							'_id': result.invocationResult._id,
							'json': {
								'name': result.invocationResult.name,
								'age': result.invocationResult.age
							}
					};

							output.push(obj);

					showResults(output);
				}
			}
		};

		var getDocFailure = function(result) {
			WL.Logger.info("Get doc failed");
			logMessage(result.invocationResult.reason);
		};


		getDoc(PEOPLE_COLLECTION_NAME, id, getDocSuccess, getDocFailure);

	});

	//count
	$('button#count').on('click', function () {


		var countDataSuccess = function (result) {
			if (result.invocationResult.statusCode != 200) {
				WL.Logger.info("Count data failed due to status code: " + result.invocationResult.statusCode);
				logMessage(result.invocationResult.reason);
			} else {
				WL.Logger.info("Count data succeeded");
				logMessage(COUNT_MSG + result.invocationResult.total_rows);
			}
		};

		var countDataFailure = function(result) {
			WL.Logger.info("Count data failed");
			logMessage(result.invocationResult.reason);
		};



			countAllDocs(PEOPLE_COLLECTION_NAME, countDataSuccess, countDataFailure);
	});





} (WL, WLJQ, WL_));

}//end wlCommonInit
