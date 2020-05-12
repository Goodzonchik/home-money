interface Receipt {
  id: string;
  shop: string;
  date: Date;
  purchases: Product[];
}

interface Product {
  id: string;
  receiptId: string;
  category: string;
  name: string;
}

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ receipts: [] }).write();

export default (req, res) => {
  db.get('receipts')
    .push({ ...req.body })
    .write();
  res.statusCode = 200;
  res.json({});
};
