import Link from 'next/link';

export default function Nav() {
  const links = [
    { url: '/receipts', title: 'Расходы' },
    { url: '/mock', title: 'Доходы' },
    { url: '/statistic', title: 'Статистика' },
    { url: '/todo', title: 'Хотелки' },
  ];

  return (
    <>
      <ul className={'nav-bar'}>
        {links.map((link) => (
          <li key={link.url}>
            <Link href={link.url}>{link.title}</Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .nav-bar {
          width: 100%;
          list-style-type: none;
          display: flex;
          justify-content: space-between;
          font-size: 1.5em;
          box-sizing: border-box;
          padding: 0;
        }
      `}</style>
    </>
  );
}
