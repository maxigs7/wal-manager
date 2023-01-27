import { Tag, TagLabel, TagLeftIcon, TagProps } from '@chakra-ui/react';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { colorTransform } from '@/models';
import { Icon } from '@/shared';

interface IProps extends TagProps {
  color: string;
  icon: IconName;
  name: string;
  subName?: string;
}

const CategoryTag: React.FC<IProps> = ({ color, icon, name, subName, ...tagProps }) => {
  return (
    <Tag {...tagProps} bg={colorTransform(color)} color="white" variant="subtle">
      <TagLeftIcon as={Icon} icon={icon} />
      <TagLabel>
        {name}
        {subName && <Icon icon="angle-double-right" mx={1} />}
        {subName}
      </TagLabel>
    </Tag>
  );
};

export { CategoryTag };
