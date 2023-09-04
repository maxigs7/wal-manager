'use client';

import React from 'react';

import Tab from '@mui/material/Tab';

import { NextLinkComposed } from '@/m/shared/link';
import { MenuItem } from '@/models';

const SettingsTab: React.FC<MenuItem> = ({ href, label }) => {
  return <Tab component={NextLinkComposed} label={label as string} to={href as string} />;
};

export default SettingsTab;
