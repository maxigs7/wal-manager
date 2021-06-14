import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';

import { Avatar } from '@app/modules/common';
import { useAuth } from '@lib/auth';
import classnames from '@lib/classnames';

const styles = {
  displayName: 'truncate ml-2 text-sm font-medium hidden sm:inline',
  button: 'inline-flex justify-center items-center p-3 focus:outline-none',
  buttonArrow: 'w-5 h-5 flex-shrink-0 ml-1 fill-current text-gray-400',
  item: 'origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none',
  itemLink: (isActive: boolean) =>
    classnames(isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm'),
};

export const UserMenu: React.FC = React.memo(() => {
  const { user, signOut } = useAuth();

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className={styles.button}>
              {user?.photoURL && <Avatar alt="User Profile" src={user?.photoURL} />}
              <span className={styles.displayName}>{user?.displayName}</span>
              <FontAwesomeIcon className={styles.buttonArrow} icon="chevron-down" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            show={open}
          >
            <Menu.Items className={styles.item} static>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <NavLink className={styles.itemLink(active)} to="/settings" exact>
                      Profile
                    </NavLink>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a className={styles.itemLink(active)} href="#" onClick={() => signOut()}>
                      Sign Out
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
});
