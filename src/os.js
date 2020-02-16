const os = require('os');

//获取当前系统的CPU数量
const cpus = os.cpus();
console.log(cpus.length)
//获取内存
const total = os.totalmem();
console.log(total)
//获取剩余内存
const free = os.freemem();
console.log(free)





var postData = {
	filters:[{
		value:[1,2,3]
	}]
}
var filters = postData.filters
var extra = [{
	value:[1]
}]
var newFilters = filters.concat(extra)
console.log(filters,newFilters,postData)