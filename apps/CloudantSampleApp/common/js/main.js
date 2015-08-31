function wlCommonInit(){
	getList();
	
}
var busyIndicator = new WL.BusyIndicator( null, {text : 'Loading...'});
var list = [];

function getList(){
	busyIndicator.show();
	var resourceRequest = new WLResourceRequest("/adapters/CloudantJS/getAllEntries", WLResourceRequest.GET, 30000);
	resourceRequest.send().then(
		function(results){
			list = results.responseJSON.rows;
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
	
	var resourceRequest = new WLResourceRequest("/adapters/CloudantJS/addEntry", WLResourceRequest.POST, 30000);
	resourceRequest.setQueryParameter("params", "['" + JSON.stringify(entry) + "']");
	resourceRequest.send().then(
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
	var resourceRequest = new WLResourceRequest("/adapters/CloudantJS/deleteEntry", WLResourceRequest.POST, 30000);
	resourceRequest.setQueryParameter("params", "['" + JSON.stringify($(this).data().document) + "']");
	resourceRequest.send().then(
		function(results){
			getList();
		},
		function(results){
			alert("error in delete");
		}
	);
});