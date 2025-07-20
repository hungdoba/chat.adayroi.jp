import Link from 'next/link';
import { ThemeSwitcher } from './ui/theme-switcher';
import Logo from './ui/logo';
import { EXTERNAL_LINKS } from '@/constants/routes';

const Navbar = () => {
  return (
    <nav className="border-b-2 border-gray-700">
      <div className="w-full flex justify-between items-center p-4 md:px-0">
        <Link className="flex text-xl" href="/">
          <Logo />
        </Link>
        <ul className="flex items-center space-x-2 md:space-x-4">
          <li>
            <Link href={EXTERNAL_LINKS.NEWS}>News</Link>
          </li>
          <li className="h-4 border-r border-gray-500"></li>
          <li>
            <Link href={EXTERNAL_LINKS.TRIPS}>Trips</Link>
          </li>
          <li className="h-4 border-r border-gray-500"></li>
          <li>
            <Link href={EXTERNAL_LINKS.JLPT}>JLPT</Link>
          </li>
          <li className="h-4 border-r border-gray-500"></li>
          <li>
            <Link href={EXTERNAL_LINKS.HOME}>Home</Link>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
