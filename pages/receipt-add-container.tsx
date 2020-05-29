import ReceiptAdd from '../components/ReceiptAdd';

export default function ReceiptAddContainer({ categories, units }) {
  return <ReceiptAdd categories={categories} units={units}></ReceiptAdd>;
}

export async function getServerSideProps() {
  const low = require('lowdb');
  const FileSync = require('lowdb/adapters/FileSync');
  const adapter = new FileSync('db.json');
  const db = low(adapter);

  const categories = db.get('categories').value() || [];
  const units = db.get('units').value() || [];
  return {
    props: { categories, units },
  };
}
