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

var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};






//Set the value either to "java" for a java adapter or "javascript" for a javascript adapter
var cloudantType = "java";
var cloudantInstance = new Cloudant(cloudantType);

var message = 'Loading...';
var list = [];


// Called automatically after MFP framework initialization by WL.Client.init(wlInitOptions).
function wlCommonInit(){

// ========
    $('#list').on('click','button.delete',function(){
        SpinnerDialog.show(null, [message]);
        var entry = $(this).data().document;
        cloudantInstance.deleteEntry(entry).then(
            function(results){
                getList();
            },
            function(results){
                alert("error in delete");
            }
        );
    });

    $('#refresh').on('click',function(){
    	getList();
    });

    $('#add').on('click',function(){
    	if($('#name').val() && $('#age').val()){
    		SpinnerDialog.show(null, [message]);
    		var entry = {'name': $('#name').val(), 'age': $('#age').val()};

    		cloudantInstance.addEntry(entry).then(
    			function(results){
    				$('#name').val('');
    				$('#age').val('');
    				getList();
    			},
    			function(results){
    				alert("error in add");
    			}
    		);
    	}
    	else{
    		alert("Please enter name and age");
    	}
    });

    $('#switchType').on('click',function(){
    	if(cloudantType == "java"){
    		cloudantType = "javascript";
    	}
    	else{
    		cloudantType = "java";
    	}

    	$("#currentType").html(cloudantType);
    	cloudantInstance = new Cloudant(cloudantType);
    	//getList();
    });


//===========

    $("#currentType").html(cloudantType);
    //getList();
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, 'app.receivedEvent(...);' must be explicitly called.
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update the DOM on a received event.
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
    }
};

app.initialize();


function getList(){
	SpinnerDialog.show(null, [message])
	cloudantInstance.getAllEntries().then(
		function(results){
			list = results;
			displayList();
		},
		function(results){
			alert("error in getList");
		}
	);
}

function displayList(){
	$('#list').empty();
	jQuery.each(list, function(index, value){
		var row = $('<tr>');
		row.append($('<td>').text(value.name));
		row.append($('<td>').text(value.age));

		var del = $('<button>').addClass('delete').text('Delete');
		del.data('document',value);
		row.append($('<td>').append(del));

		$('#list').append(row);
	});
	SpinnerDialog.hide();
}
