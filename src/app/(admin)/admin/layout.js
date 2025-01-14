'use client';
import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';

const layout = ({ children }) => {
  return <Sidebar>{children}</Sidebar>;
};

export default layout;
