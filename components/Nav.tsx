import Link from 'next/link';

export default function Nav() {
  const links = [
    { url: '/receipts', title: 'Расходы' },
    { url: '/income', title: 'Доходы' },
    { url: '/statistic', title: 'Статистика' },
    { url: '/todo', title: 'Хотелки' },
  ];

  return (
    <>
      <ul className='nav-bar'>
        {links.map((link) => (
          <li key={link.url}>
            <Link href={link.url}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
