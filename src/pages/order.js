const express = require('express');
const router = express.Router();

router.get('/list',(req,res)=>{
	res.json({
		list:[{
			id:1,
			name:'iPhone'
		}]
	})
})

function validIdMidWare(req,res,next){
	let {id} = req.query;
	if(!id){
		res.json({
			message:'缺少id'
		})
	}else{
		req.param = {
			id
		}
		next();
	}
}

router.get('/detail',[validIdMidWare/*数组中可添加多个中间件*/],(req,res)=>{
	let {param} = req;
	res.json({
		param,
		name:'火车票'
	})
})

module.exports = router