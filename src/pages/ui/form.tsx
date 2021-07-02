import React, { useMemo, useState } from 'react';

import { IconName } from '@fortawesome/fontawesome-svg-core';

import { useToggle } from '@app/hooks';
import {
  CardContainer,
  ColorListBox,
  IconListBox,
  ListBox,
  Switch,
  Title,
} from '@app/modules/common';
import { ColorsType } from '@lib/tailwind-css/colors';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];

const UIFormPage: React.FC = () => {
  const [enabled, { toggle }] = useToggle();
  const [person, setPerson] = useState(people[0]);
  const [color, setColor] = useState<ColorsType>('amber');
  const [icon, setIcon] = useState<IconName>('trophy');

  const options = useMemo(
    () =>
      people.map((p, idx) => ({
        label: p.name,
        value: p,
        disabled: idx === 2,
      })),
    [],
  );
  return (
    <div className="grid grid-cols-2 gap-2">
      <CardContainer className="p-5">
        <Title tag="h5">Switch</Title>
        <hr className="my-2" />
        <div className="flex gap-3">
          <Switch enabled={enabled} toggle={toggle} />
          <Switch enabled={enabled} label="I'm label on the right" toggle={toggle} />
          <Switch
            enabled={enabled}
            label="I'm label on the left"
            labelPosition="left"
            toggle={toggle}
          />
          <Switch enabled={enabled} label="I'm disabled" toggle={toggle} disabled />
        </div>
      </CardContainer>
      <CardContainer className="p-5">
        <Title tag="h5">List Box</Title>
        <hr className="my-2" />
        <div className="flex gap-3">
          <ListBox
            onChange={setPerson}
            options={options}
            selected={person}
            selectedLabel={person.name}
            disabled
          />
          <ListBox
            onChange={setPerson}
            options={options}
            selected={person}
            selectedLabel={person.name}
          />
        </div>
      </CardContainer>
      <div className="grid grid-cols-2 gap-2">
        <CardContainer className="p-5">
          <Title tag="h5">Color List Box</Title>
          <hr className="my-2" />
          <div className="flex gap-3">
            <ColorListBox onChange={setColor} selected={color} />
            <ColorListBox onChange={setColor} selected={color} disabled />
          </div>
        </CardContainer>
        <CardContainer className="p-5">
          <Title tag="h5">Icons List Box</Title>
          <hr className="my-2" />
          <div className="flex gap-3">
            <IconListBox onChange={setIcon} selected={icon} />
            <IconListBox onChange={setIcon} selected={icon} disabled />
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default UIFormPage;
