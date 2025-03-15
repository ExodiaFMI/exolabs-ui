import { createContext, FC, useState } from 'react';
import { Avatar } from '../lib/catalyst/avatar';
import { Navbar } from '../lib/catalyst/navbar';
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
} from '../lib/catalyst/dropdown';
import { HiOutlineLogin, HiChevronDoubleDown } from 'react-icons/hi';

interface LayoutProps {
  children: React.ReactNode;
}

const NavbarSettingsContext = createContext<{ setBreadcrumb: (val: string) => void }>({
  setBreadcrumb: () => {},
});

const Layout: FC<LayoutProps> = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState('Home');
  const [user, _] = useState('Joe Doe');

  return (
    <>
      <Navbar className="bg-secondary text-light flex text-grey-100 justify-between px-4 py-3 flex-row border-b-2 border-grey-600">
        <div className="flex items-center gap-5">
          <h1 className="text-xl border-r-1 border-grey-600 pe-4">Exolabs</h1>
          <a>{breadcrumb}</a>
        </div>
        <div className="flex items-center gap-3">
          <Dropdown>
            <DropdownButton color="dark/white" className="flex items-center">
              <Avatar initials="JD" className="size-10" />
              {user}
              <HiChevronDoubleDown />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem>Options</DropdownItem>
              <DropdownItem>
                <span className="flex gap-2">
                  Signout <HiOutlineLogin className="size-5" />
                </span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Navbar>
      <main className="m-2">
        <NavbarSettingsContext.Provider value={{ setBreadcrumb }}>
          {children}
        </NavbarSettingsContext.Provider>
      </main>
    </>
  );
};

export default Layout;
