import { db } from '../../utils/db';

db.defaults({ receipts: [] }).write();

export default (req, res) => {
  db.get('income')
    .push({ ...req.body })
    .write();
  res.statusCode = 200;
  res.json({});
};
