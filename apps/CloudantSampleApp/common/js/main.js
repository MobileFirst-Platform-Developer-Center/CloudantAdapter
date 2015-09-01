//Set the value either to "java" for a java adapter or "js" for a javascript adapter
var cloudantInstance = new Cloudant("java");

function wlCommonInit(){
	getList();
	
}
var busyIndicator = new WL.BusyIndicator( null, {text : 'Loading...'});
var list = [];

function getList(){
	busyIndicator.show();
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
	busyIndicator.hide();
}

$('#refresh').on('click',function(){
	getList();
});

$('#add').on('click',function(){
	busyIndicator.show();
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
});

$('#list').on('click','button.delete',function(){
	busyIndicator.show();
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