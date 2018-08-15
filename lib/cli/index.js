#!/usr/bin/env node

const program = require('commander');
const packageInfo = require('../../package.json');

program
	.version(packageInfo.version);

program
	.command('init')
	.description('项目初始化')
	.alias('i')
	.action(()=>{
		require('../cmd/init')();
	});

program
	.command('add')
	.description('增加一个模版')
	.alias('a')
	.action(()=>{
		require('../cmd/add')();
	});

program
	.command('delete')
	.description('删除一个模版')
	.alias('d')
	.action(()=>{
		require('../cmd/delete')();
	});

program
	.command('list')
	.description('列出已有模版')
	.alias('l')
	.action(()=>{
		require('../cmd/list')()
	});

program.parse(process.argv);

if(!program.args.length){
	program.help()
}