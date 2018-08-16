const Table = require('cli-table');

const tip = require('./tip');

const table = new Table({
  head: ['index','name', 'description','Git Url','branch'],
  style: {
    head: ['white'],
    border: ['white','bold'],
  }
});


module.exports = (config) => {
  const keys = Object.keys(config);

  if(keys.length) {
    keys.forEach((key,index) => {
      table.push(
        [index+1,`${key}`, config[key].description,config[key].gitUrl,config[key].branch]
      );
    });
    const list = table.toString();
    if (list) {
      tip.info('模板列表是: ')
      console.log(`${list}\n`);
    } else {
      tip.fail('模板不存在!');
    }
  } else {
    tip.fail('模板不存在!');
  }
};
