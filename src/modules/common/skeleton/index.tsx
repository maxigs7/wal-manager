import React from 'react';

import classnames from '@lib/classnames';

interface Props {
  lines?: number;
  color?: string;
}

const styles = {
  line: (color: string) => classnames('h-4 rounded-sm animate-pulse mb-4', color),
};

const SkeletonLine: React.FC<Props> = ({ lines = 1, color = 'bg-gray-200' }) => (
  <>
    {Array(lines)
      .fill(1)
      .map((_value, index) => (
        <div className={styles.line(color)} key={index}></div>
      ))}
  </>
);

export default SkeletonLine;
