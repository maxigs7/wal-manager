import React from 'react';

import { ChevronDownIcon } from '@heroicons/react/solid';

import { useAuth } from '@lib/auth';

export const UserMenu: React.FC = React.memo(() => {
  const { user } = useAuth();
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const trigger = useRef(null);
  // const dropdown = useRef(null);

  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }) => {
  //     if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target))
  //       return;
  //     setDropdownOpen(false);
  //   };
  //   document.addEventListener('click', clickHandler);
  //   return () => document.removeEventListener('click', clickHandler);
  // });

  // close if the esc key is pressed
  // useEffect(() => {
  //   const keyHandler = ({ keyCode }) => {
  //     if (!dropdownOpen || keyCode !== 27) return;
  //     setDropdownOpen(false);
  //   };
  //   document.addEventListener('keydown', keyHandler);
  //   return () => document.removeEventListener('keydown', keyHandler);
  // });

  return (
    <div className="h-full">
      <button
        // ref={trigger}
        aria-haspopup="true"
        className="flex justify-center items-center p-3 h-full focus:outline-none"
        // onClick={() => setDropdownOpen(!dropdownOpen)}
        // aria-expanded={dropdownOpen}
      >
        {user?.photoURL && (
          <img
            alt="User"
            className="w-8 h-8 rounded-full"
            height="32"
            src={user?.photoURL}
            width="32"
          />
        )}
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium hidden sm:inline">
            {user?.displayName}
          </span>
          <ChevronDownIcon className="w-5 h-5 flex-shrink-0 ml-1 fill-current text-gray-400" />
        </div>
      </button>
    </div>
  );
});
