
var express = require('express');
var http = require('http');
var request = require('request');

const app = express();

const port = 4002;
var posts = [
		{'title':'How we cope','description':'We do all we can','body':'We do all we can'},
		{'title':'How we cope1','description':'We do all we can','body':'We do all we can'},
		{'title':'How we cope2','description':'We do all we can','body':'We do all we can'},
		{'title':'How we cope3','description':'We do all we can','body':'We do all we can'},
		{'title':'How we cope4','description':'We do all we can','body':'We do all we can'},
		{'title':'How we cope5','description':'We do all we can','body':'We do all we can'},
		];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
	console.log('HOME PAGE');
	res.json({'status':'SUCCESS','message':'HOME PAGE'});
});

app.get('/address/:address',function(req,res){
	let address = req.params.address;
	let url = 'http://blockchain.info/rawaddr/'+address;
	console.log(address);
	let data = '';
	let response = request({
		uri: url
	});
	console.log(response);
	// http.get(url,function(response){
	// 	response.on('data',function(d){
	// 		data += d; 
	// 		console.log(d);
	// 	});
	// 	response.on('end',function(){
	// 		try{
	// 			let newData = JSON.parse(data);
	// 			console.log(newData);
	// 		}catch(e){
	// 			let error = e;
	// 			console.log('error');
	// 			console.log(e.message);
	// 		}
	// 	});
	// 	console.log(data);
	// });
	res.json({'status':'SUCCESS','message':'HOME PAGE'});
});

app.get('/test',function(req,res){
	console.log('TEST PAGE');
	res.json({'status':'SUCCESS','message':'Hippie, Our API just passed the test'});
});

app.get('/posts',function(req,res){
	console.log('TEST PAGE');
	res.json({'status':'SUCCESS','message':'HOME PAGE','data':posts});
});

app.get('/post/:key',function(req,res){
	console.log('POST PAGE');
	let key = req.params.key;
	res.json({'status':'SUCCESS','message':'HOME PAGE','data':posts[key]});
});

// START SERVER

http.createServer(app).listen(port);