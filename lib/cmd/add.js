'use strict'
const co = require('co')
const prompt = require('co-prompt')
const fs = require('fs')

const tip = require('../tip')
const table = require('../table')
const tpls = require('../../template');

module.exports = ()=>{
	co(function *(){
		const tplName = yield prompt('模版名字:');
		const gitUrl = yield prompt('git url:');
		const branch = yield prompt('git 分支:');
		const description = yield prompt('描述:');
		return new Promise((resolve,reject)=>{
			resolve({
				tplName,
				gitUrl,
				branch,
				description
			});
		});
	}).then(resolve)
}

const resolve = (result)=>{
	const {tplName,gitUrl,branch,description} = result;
	if(!tpls[tplName]){
		tpls[tplName] = {};
		tpls[tplName]['gitUrl'] = gitUrl.replace(/[\u0000-\u0019]/g, ''); //过滤unicode字符
		tpls[tplName]['branch'] = branch;
		tpls[tplName]['description'] = description;
	}else{
		tip.fail('模版已经存在');
		process.exit();
	}
	fs.writeFile(__dirname + '/../../template.json',JSON.stringify(tpls),'utf-8',writeFile)
}
const writeFile = (err)=>{
	if(err){
		console.log(err);
		tip.fail('发生错误');
		process.exit();
	}
	table(tpls);
	tip.success('添加模版成功');
	process.exit();
};
















