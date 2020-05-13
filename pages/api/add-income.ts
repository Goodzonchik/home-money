const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ receipts: [] }).write();

export default (req, res) => {
  db.get('income')
    .push({ ...req.body })
    .write();
  res.statusCode = 200;
  res.json({});
};
