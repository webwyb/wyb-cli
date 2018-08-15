'use strict'
const exec = require('child_process').exec;
const co = require('co');
const ora = require('ora')
const prompt = require('co-prompt')

const tip = require('../tip')
const tpls = require('../../template')

const spinner = ora('正在下载模版中...')

const resolve = (result)=>{
	const {tplName,gitUrl,branch,projectName} = result;
	const cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`
	spinner.start();

	exec(cmdStr,(err)=>{
		download(err,projectName);
	});
};

const download = (err,projectName)=>{
	if(err){
		console.log(err);
		tip.fail('运行错误');
		process.exit();
	}
	exec(`cd ${projectName} && rm -rf .git`,(err,out)=>{
		execRm(err,projectName);
	});
}

const execRm = (err,projectName)=>{
	spinner.stop();
	if(err){
		console.log(err);
		tip.fail('发生错误');
		process.exit();
	}
	tip.success('初始化成功');
	tip.info(`cd ${projectName} && npm install`);
	process.exit();
}

module.exports = ()=>{
	co(function *(){
		const tplName = yield prompt('模版名字:');
		const projectName = yield prompt('项目名字:')

		if(!tpls[tplName]){
			tip.fail('模版不存在');
			process.exit();
		}

		return new Promise((resolce,reject)=>{
			resolve({
				tplName,
				projectName,
				...tpls[tplName]
			});
		});
	}).then(resolve);
}