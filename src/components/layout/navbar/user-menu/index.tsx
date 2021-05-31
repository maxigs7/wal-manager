import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import classnames from 'classnames';

import { useAuth } from '@lib/auth';

export const UserMenu: React.FC = React.memo(() => {
  const { user, signOut } = useAuth();

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center items-center p-3 focus:outline-none">
              {user?.photoURL && (
                <img
                  alt="User"
                  className="w-8 h-8 rounded-full"
                  height="32"
                  src={user?.photoURL}
                  width="32"
                />
              )}
              <span className="truncate ml-2 text-sm font-medium hidden sm:inline">
                {user?.displayName}
              </span>
              <FontAwesomeIcon
                className="w-5 h-5 flex-shrink-0 ml-1 fill-current text-gray-400"
                icon="chevron-down"
              />
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
            <Menu.Items
              className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              static
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={classnames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                      href="#"
                    >
                      Profile
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={classnames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                      href="#"
                      onClick={() => signOut()}
                    >
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
