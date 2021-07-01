import { Fragment, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';

import classnames from '@lib/classnames';
import { ColorsMap, ColorsType } from '@lib/tailwind-css/colors';

interface IProps extends React.ComponentPropsWithRef<any> {
  selected?: ColorsType;
}

const colors = Object.entries(ColorsMap)
  .filter(([key]) => key !== 'white' && key !== 'transparent')
  .map(([, value]) => value);

const ColorSelector: React.FC<IProps> = () => {
  const [selectedColor, setSelectedColor] = useState<ColorsType>('blue');
  return (
    <Listbox onChange={setSelectedColor} value={selectedColor}>
      <Listbox.Button
        as="span"
        className={classnames(`bg-${selectedColor}-600`, 'rounded-full w-10 h-10 block')}
      ></Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options as="div" className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <Listbox.Option
              as="span"
              className={classnames(
                color !== 'black' && `bg-${color}-600`,
                color === 'black' && 'bg-black',
                'rounded-full w-10 h-10 inline-block',
              )}
              key={color}
              value={color}
            ></Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
    // <div className="flex gap-2 flex-wrap">
    //   {colors.map((key) => (
    //     <span
    //       className={classnames(`bg-${key}-600`, 'rounded-full w-10 h-10 inline-block')}
    //       key={key}
    //     ></span>
    //   ))}
    // </div>
  );
};

export default ColorSelector;
