import { createContext, FC, useState } from 'react';
import { Avatar } from '../lib/catalyst/avatar';
import { Navbar } from '../lib/catalyst/navbar';
import logoUrl from '../assets/logo.png';
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
} from '../lib/catalyst/dropdown';
import { HiOutlineLogin, HiChevronDoubleDown } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import useJWT from '../hooks/useJWT';
import BreadcrumbContext from './breadcrumbContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState('Home');
  const navigate = useNavigate();

  const { user } = useJWT();

  const onSignout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Navbar className="bg-secondary text-light flex text-grey-100 justify-between px-4 py-1 flex-row border-b-2 border-grey-600">
        <div className="flex items-center gap-5">
          <img
            src={logoUrl}
            alt="Exolab Logo"
            className="h-16 border-r-1 border-grey-600"
          />
          <h1 className="text-xl">Exolab</h1>
          <a>{breadcrumb}</a>
        </div>
        <div className="flex items-center gap-3">
          <Dropdown>
            <DropdownButton plain color="white" className="flex items-center">
              <Avatar
                initials={user?.name.substring(0, 2).toUpperCase()}
                className="size-10 text-light border-light border-1"
              />
              <span className="text-light">{user?.name}</span>
              <HiChevronDoubleDown className="text-light" size={20} />
            </DropdownButton>
            <DropdownMenu className="z-1020 p-2 flex- gap-2">
              <DropdownItem className="bg-primary">Options</DropdownItem>
              <DropdownItem className="bg-primary hover:bg-secondary">
                <span className="flex gap-2" onClick={() => onSignout()}>
                  Signout <HiOutlineLogin className="size-5" />
                </span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Navbar>
      <main className="p-2">
        <BreadcrumbContext.Provider value={{ setBreadcrumb }}>
          {children}
        </BreadcrumbContext.Provider>
      </main>
    </>
  );
};

export default Layout;
