'use strict'
const co = require('co')
const prompt = require('co-prompt')
const fs = require('fs')
const inquirer = require('inquirer')

const tip = require('../tip')
const table = require('../table')
const tpls = require('../../template');

module.exports = () => {
  co(function* () {
    const tplName = yield prompt('模版名字:');
    const gitUrl = yield prompt('Git Url:');
    const branch = yield prompt('Git 分支:');
    const description = yield prompt('模版描述:');
    return new Promise((resolve, reject) => {
      resolve({
        tplName,
        gitUrl,
        branch,
        description
      });
    });
  }).then(resolve)
}

const resolve = (result) => {
  const {tplName, gitUrl, branch, description} = result;
  if (!tpls[tplName]) {
    tpls[tplName] = {};
    tpls[tplName]['gitUrl'] = gitUrl.replace(/[\u0000-\u0019]/g, ''); //过滤unicode字符
    tpls[tplName]['branch'] = branch;
    tpls[tplName]['description'] = description;
    fs.writeFile(__dirname + '/../../template.json', JSON.stringify(tpls), 'utf-8', writeFile)
  } else {
    // 如果有模版是否覆盖
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'change',
        message: '该模版已经存在,是否替换已有模版？',
        default: false
      }
    ]).then((answer) => {
      // 如果替换,删除原有，添加新模版
      if (answer.change) {
        delete tpls[tplName];
        tpls[tplName] = {};
        tpls[tplName]['gitUrl'] = gitUrl.replace(/[\u0000-\u0019]/g, ''); //过滤unicode字符
        tpls[tplName]['branch'] = branch;
        tpls[tplName]['description'] = description;
        fs.writeFile(__dirname + '/../../template.json', JSON.stringify(tpls), 'utf-8', writeFile)
      } else {
        table(tpls);
        process.exit();
      }
    })
  }
}
const writeFile = (err) => {
  if (err) {
    console.log(err);
    tip.fail('添加模版发生错误，请重试');
    process.exit();
  }
  table(tpls);
  tip.success('添加模版成功');
  process.exit();
};
















