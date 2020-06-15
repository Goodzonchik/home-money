import ReceiptAdd from '../components/ReceiptAdd';
import { db } from '../utils/db';

export default function ReceiptAddContainer({ categories, units }) {
  return <ReceiptAdd categories={categories} units={units}></ReceiptAdd>;
}

export async function getServerSideProps() {
  const categories = db.get('categories').value() || [];
  const units = db.get('units').value() || [];
  return {
    props: { categories, units },
  };
}
