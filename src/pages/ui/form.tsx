import React, { useMemo, useState } from 'react';

import { useToggle } from '@app/hooks';
import { CardContainer, ListBox, Switch, Title } from '@app/modules/common';

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
    <>
      <CardContainer className="p-5">
        <Title tag="h5">Switch</Title>
        <hr className="my-2" />
        <Switch enabled={enabled} toggle={toggle} />
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
    </>
  );
};

export default UIFormPage;
