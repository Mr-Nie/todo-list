let http = require('http');
let url = require('url');
let fs = require('fs');
let querystring = require('querystring');

var users = {
	keith:{
		pwd:123,
		age:28,
		score:99
	},
	annie:{
		pwd:456,
		age:18,
		score:98
	}
}

http.createServer((req,res)=>{
	// 获取数据
	let path,get,post
	if(req.method=='GET'){
		let {pathname,query} = url.parse(req.url,true)
		path = pathname;
		get = query;
		complete()
	}else if (req.method=='POST') {
		let arr = []
		path = req.url;
		req.on('data',buffer=>{
			arr.push(buffer);
		})
		req.on('end',()=>{
			post = querystring.parse(Buffer.concat(arr).toString());
			complete();
		})
	}
	function complete(){
		if (path == '/login') {
			console.log('登录')
			res.writeHead(200,{
				"Content-Type":'text/plain;chartset=utf-8'
			})
			let {username,password} = post;
			if(!users[username]){
				res.end(JSON.stringify({
					status:2,
					statusMsg:'用户名不存在！'
				}))
			}else if(password != users[username].pwd){
				res.end(JSON.stringify({
					status:2,
					statusMsg:'密码错误！'
				}))
			}else{
				res.end(JSON.stringify({
					status:1,
					statusMsg:'登录成功！'
				}))
			}
		}else if (path == '/info') {
			res.writeHead(200,{
				"Content-Type":'text/plain;chartset=utf-8'
			})
			let {username} = get;
			if(!users[username]){
				res.end(JSON.stringify({
					status:2,
					statusMsg:'用户名错误！'
				}))
			}else{
				res.end(JSON.stringify({
					status:1,
					statusMsg:'获取信息成功！',
					data:{
						age:users[username].age,
						score:users[username].score
					}
				}))
			}
		}else{
			fs.readFile(`./${path}`,(err,data)=>{
				if(err){
					res.end('404');
				}else{
					res.end(data);
				}
			})
		}
	}
}).listen(8080)