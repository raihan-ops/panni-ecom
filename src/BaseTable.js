import { Table } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery, getAllQueryParams, bindUrlWithParams } from '../_helpers/Utils';
import { GlobalTranslator } from './Traslator/GlobalTranslator';
import { useLanguageContext } from '../contexts/LanguageContextProvider';

const BaseTable = ({
  columns,
  dataSource,
  loading,
  totalElements,
  className,
  scroll,
  currentPath,
  rowSelectionTable = false,
  selectedKeys,
  onSelectChange,
  showPagination = true,
  ...props
}) => {
  const query = useQuery();
  const router = useRouter();
  const { translator } = useLanguageContext();
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '30', '50', '100'],
  });

  useEffect(() => {
    const page = parseInt(query.get('page')) || 1;
    const size = parseInt(query.get('size')) || 10;
    setPagination({
      ...pagination,
      current: page,
      pageSize: size,
      total: totalElements,
    });
  }, [totalElements]);

  const onChangeTable = (_pagination) => {
    setPagination(_pagination);

    currentPath &&
      router.push(
        bindUrlWithParams(currentPath, {
          ...getAllQueryParams(query),
          page: _pagination.current,
          size: _pagination.pageSize,
        }),
      );
  };
  const translatorTableHeader = (columns) => {
    const res = columns?.map((data) => {
      data.title = typeof data.title === 'string' ? GlobalTranslator(data.title) : data.title;
      return data;
    });

    return translator ? res : columns;
  };

  // const injectColumnsInfo = (cols) =>
  //     cols.map((col) => ({
  //         ...col,
  //         render: col.render
  //             ? (text, record, index) => col.render(text, record, index, col)
  //             : (text) => (text === undefined || text === null ? 'N/A' : text),
  //     }));

  return (
    <div className={`${className}`}>
      <Table
        columns={columns}
        onChange={onChangeTable}
        dataSource={dataSource}
        pagination={showPagination ? pagination : false}
        loading={loading}
        scroll={
          scroll ?? {
            x: 1000,
            y: 600,
          }
        }
        rowKey={(record) => record._id}
        {...(rowSelectionTable && {
          rowSelection: {
            selectedRowKeys: selectedKeys,
            onChange: onSelectChange,
          },
        })}
        {...props}
      />
    </div>
  );
};

export default BaseTable;
