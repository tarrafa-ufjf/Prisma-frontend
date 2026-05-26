'use client';

import LogoutButton from '@/components/auth/LogoutButton';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { FaChartBar, FaGraduationCap, FaHome, FaUserGraduate } from 'react-icons/fa';

interface NavItem {
  title: string;
  href: string;
  icon: IconType;
}

const navItems: NavItem[] = [
  {
    title: 'Página Principal',
    href: '/',
    icon: FaHome,
  },
  {
    title: 'Painel das Disciplinas',
    href: '/cursos',
    icon: FaGraduationCap,
  },
  {
    title: 'Painel dos Tutores',
    href: '/tutores',
    icon: FaUserGraduate,
  },
  {
    title: 'Playground Vega',
    href: '/vega',
    icon: FaChartBar,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen">
      <aside className="hidden sm:flex fixed top-0 left-0 h-screen w-[240px] flex-col justify-between bg-[#F1F2F7] text-[#08243180] font-poppins text-[11px] z-50">
        <div className="sidebaralign">
          <Link href="/">
            <Image
              src="/iconePrisma.png"
              alt="Prisma logomark"
              width={200}
              height={60}
            />
          </Link>

          <nav className="sidebaralign space-y-4 mt-4">
            <span className="text-xs font-semibold">MENU</span>
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex flex-row items-center gap-3 w-[200px] h-[60px] rounded-[5px] px-4 font-poppins text-xs text-[#5A6ACF] transition-colors hover:bg-[#707FDD1A] ${active ? 'bg-[#707FDD1A]' : ''
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="flex justify-end p-2">
          <LogoutButton />
        </div>
      </aside>
    </div>
  );
}
