
//This jQuery statement defines a self-invoking, anonymous function that runs after the document is loaded in the browser
//-- in other words, when the DOM is ready.
$(function(){
	var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '180px' });
	//showError();
	//showInfo();
	client.get('ticket.requester.id').then(
		function(data) {
      console.log('data: ', data);
			var user_id = data['ticket.requester.id'];
			console.log('Requester id is ' + user_id);
			requestUserInfo(client, user_id);
		}
	);

  client.get('currentUser').then(function(data){
    console.log('-------->',data);
  });

});

// function showInfo() {
  // var requester_data = {
    // 'name': 'Jane Doe',
    // 'tags': ['tag1', 'tag2'],
    // 'created_at': 'November 20, 2014',
    // 'last_login_at': 'June 27, 2016'
  // };

  // var source = $("#requester-template").html();
  // var template = Handlebars.compile(source);
  // var html = template(requester_data);
  // $("#content").html(html);
// }
// function showError() {
  // var error_data = {
    // 'status': 404,
    // 'statusText': 'Not found'
  // };
  // var source = $("#error-template").html();
  // var template = Handlebars.compile(source);
  // var html = template(error_data);
  // $("#content").html(html);
// }

// chamada para a API
function requestUserInfo(client, id){
	var settings = {
		url: '/api/v2/users/' + id + '.json',
		type: 'GET',
		dataType: 'json'
	};

	client.request(settings).then(
		function(data){ // If the request is successful, the app displays the data
			console.log(data);
			console.log('url: '+data.user.url);
			showInfo(data);
		},
		function(response){ // If the request is not successful, the app displays the response
			console.log(response);
			showError(response);
		}
	);
}

function showInfo(data) {
  var requester_data = {
    'name': data.user.name,
    'email': data.user.email,
    'telefone': data.user.phone,
    'cpf': data.user.user_fields.cpf,
    'tags': data.user.tags,		
		'userClass': data.user.user_fields.funo,
    'created_at': formatDate(data.user.created_at),
    'last_login_at': formatDate(data.user.last_login_at)
  };

  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}

function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}

function formatDate(date){
	var cdate = new Date(date);
	var options = {
		year: "numeric",
		month: "short",
		day: "numeric"
	};

	date = cdate.toLocaleDateString("pt-br", options);
	return date;
}
