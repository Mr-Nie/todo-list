const express = require('express');
const router = express.Router();
const models = require('../../models');

router.get('/create',async (req,res)=>{
	let {name} = req.query;
	let user = await models.User.create({
		name
	})
	res.json({
		message:'创建成功',
		user
	})
})

router.get('/list',async (req,res)=>{
	let list = await models.User.findAll();
	res.json({
		list
	})
})
router.get('/detail/:id',async (req,res)=>{
	let {id} = req.params;
	let user = await models.User.findOne({
		where:{
			id
		}
	})
	res.json({
		user
	})
})

function validNameMidWare(req,res,next){
	let {name} = req.query;
	if(!name){
		res.json({
			message:'缺少name参数'
		})
	}else{
		next();
	}
}
router.all('*',validNameMidWare);
router.get('/info',(req,res)=>{
	throw new Error('异常功能测试')
	let {name} = req.query;
	res.json({
		list:[{
			name,
			age:18
		}]
	})
})

module.exports = router