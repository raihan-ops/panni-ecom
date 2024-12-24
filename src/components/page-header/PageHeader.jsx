'use client';
import { Icons } from '@/assets/icons';
import { Breadcrumb } from 'antd';
import React, { Fragment } from 'react';

const PageHeader = ({ breadcrumbItems }) => {
  return (
    <Fragment>
      <Breadcrumb
        separator={
          <div className="mt-2 px-6">
            <Icons.Separator></Icons.Separator>
          </div>
        }
        items={breadcrumbItems.map((item) => ({
          ...item,
          className: 'text-neutral text-[18px] ', // Customize individual items' text color
        }))}
      ></Breadcrumb>
    </Fragment>
  );
};

export default PageHeader;
