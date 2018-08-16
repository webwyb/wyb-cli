'use strict'
const co = require('co')
const prompt = require('co-prompt')
const fs = require('fs')

const table = require('../table')
const tip = require('../tip')
const tpls = require('../../template')

const resolve = (tplName)=>{
	if(tpls[tplName]){
		delete tpls[tplName];
	}else{
		tip.fail('模版不存在')
		process.exit()
	}
	fs.writeFile(__dirname + "/../../template.json",JSON.stringify(tpls),'utf-8',writeFile)
};
const writeFile = (err) =>{
	if(err){
		console.log(err)
		tip.fail('删除模版发生错误，请重试');
		process.exit();
	}
	tip.success('模版删除成功')
	if(JSON.stringify(tpls) !== {}){
		table(tpls);
	}else {
		tip.info('暂无模版')
	}
	process.exit();
}

module.exports = ()=>{
	co(function *(){
		const tplName = yield prompt('模版名字:');
		// todo 删除模版二次确认
		return new Promise((resolve,reject)=>{
			resolve(tplName);
		});
	}).then(resolve);
}