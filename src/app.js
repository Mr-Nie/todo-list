const express = require('express');
const app = express();
const memberRouter = require('./pages/member');
const orderRouter = require('./pages/order');
const models = require('../models');
const bodyParser = require('body-parser');
/*
 express提供的内置中间件有三种：static，json，urlencoded
*/
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('static',{
	extensions:['html','htm'] //请求静态资源时，若没有后缀，增加默认后缀
}))
app.use(bodyParser.urlencoded({extended:true}));


// 获取任务列表
app.get('/list',async (req,res,next)=>{
	try{
		// 查询并且汇总数
		let {status,page,limit} = req.query;
		let offset = limit*(page-1);
		let where = {};
		if(status>0){
			where.status = status
		}
		let list = await models.Todo.findAndCountAll({
			where,
			offset,
			limit: +limit
		})
		res.json({
			list
		})
	}catch(err){
		next(err);
	}
})

// 创建任务
app.post('/create',async (req,res,next)=>{
	try{
		let {name,deadline,content} = req.body;
		let todo = await models.Todo.create({
			name,
			deadline,
			content
		})
		res.json({
			message:'创建任务成功',
			todo
		})
	}catch(err){
		next(err);
	}
})

// 修改任务
app.post('/update',async (req,res,next)=>{
	try{
		let {name,deadline,content,id} = req.body;
		let todo = await models.Todo.findOne({
			where:{
				id
			}
		})
		if(todo){
			todo = await todo.update({
				name,
				deadline,
				content
			})
		}
		res.json({
			message:'修改成功',
			todo
		})
	}catch(err){
		next(err);
	}
})

// 修改任务状态
app.post('/status',async (req,res,next)=>{
	try{
		let {status,id} = req.body;
		let todo = await models.Todo.findOne({
			where:{
				id
			}
		})
		if(todo){
			todo = await todo.update({
				status
			})
		}
		res.json({
			message:'修改成功',
			todo
		})
	}catch(err){
		next(err);
	}
})

// 注册路由
// app.use('/member',memberRouter)
// app.use('/order',orderRouter)

// 404处理中间件，对express来说，404不是error
function handleNotFoundMidWare(req,res,next){
	res.json({
		message:'api不存在'
	})
}
// 自定义一个处理异常的中间件
function handleErrMidWare(err,req,res,next){
	if(err){
		let {message} = err;
		res.status(500).json({
			message
		})
	}
}
// 404和异常处理的中间件放到最后面
app.use(handleNotFoundMidWare);
app.use(handleErrMidWare);

app.listen(8888,()=>{
	console.log('server启动成功');
})