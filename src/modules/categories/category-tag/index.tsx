import { ComponentWithAs, Icon, Tag, TagLabel, TagLeftIcon, TagProps } from '@chakra-ui/react';

import { ChevronDoubleRightIcon } from '@/m/shared/icons';
import { colorTransform } from '@/models';

type Props = TagProps & {
  color: string;
  icon: ComponentWithAs<'svg'>;
  name: string;
  subName?: string;
};

const CategoryTag: React.FC<Props> = ({ color, icon, name, subName, ...tagProps }) => {
  return (
    <Tag {...tagProps} bg={colorTransform(color)} color="white" variant="subtle">
      <TagLeftIcon as={icon} />
      <TagLabel>
        {name}
        {subName && <Icon as={ChevronDoubleRightIcon} mx={1} />}
        {subName}
      </TagLabel>
    </Tag>
  );
};

export { CategoryTag };
