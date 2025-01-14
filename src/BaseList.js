import { List, Checkbox, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery, getAllQueryParams, bindUrlWithParams } from '../_helpers/Utils';
import { useLanguageContext } from '../contexts/LanguageContextProvider';

const BaseList = ({
  dataSource,
  loading,
  totalElements,
  className,
  currentPath,
  renderItem,
  showPagination = true,
  pageSizeOptions = ['10', '30', '50', '100'],
  selectedKeyChanges,
  triggeredRowKeys,
  showSelection = false,
  ...props
}) => {
  const query = useQuery();
  const router = useRouter();
  const { translator } = useLanguageContext();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions,
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

  useEffect(() => {
    if (selectedKeyChanges) {
      selectedKeyChanges(selectedRowKeys);
    }
  }, [selectedRowKeys, selectedKeyChanges]);

  useEffect(() => {
    if (triggeredRowKeys) {
      setSelectedRowKeys([]);
    }
  }, [triggeredRowKeys]);

  const onChangePagination = (page, pageSize) => {
    setPagination({ ...pagination, current: page, pageSize });

    currentPath &&
      router.push(
        bindUrlWithParams(currentPath, {
          ...getAllQueryParams(query),
          page,
          size: pageSize,
        }),
      );
  };

  const onSelectRow = (key, checked) => {
    setSelectedRowKeys((prevSelected) => {
      const newSelectedKeys = checked
        ? [...prevSelected, key]
        : prevSelected.filter((selectedKey) => selectedKey !== key);
      selectedKeyChanges?.(newSelectedKeys);
      return newSelectedKeys;
    });
  };

  const isRowSelected = (key) => selectedRowKeys.includes(key);

  const handleSelectAll = (checked) => {
    const newSelectedKeys = checked ? dataSource.map((item) => item._id) : [];
    setSelectedRowKeys(newSelectedKeys);
    selectedKeyChanges?.(newSelectedKeys);
  };

  const isAllSelected = selectedRowKeys.length === dataSource.length;
  const isIndeterminate = selectedRowKeys.length > 0 && !isAllSelected;

  return (
    <div className={`${className}`}>
      {showSelection && (
        <div className="mb-4 flex items-center ">
          <Checkbox
            indeterminate={isIndeterminate}
            checked={isAllSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
          >
            Select All
          </Checkbox>
          <Button onClick={() => setSelectedRowKeys([])} disabled={selectedRowKeys.length === 0}>
            Unselect All
          </Button>
        </div>
      )}
      <List
        dataSource={dataSource}
        renderItem={(item, index) => (
          <div className="flex items-center gap-2">
            {showSelection && (
              <Checkbox
                className="flex-shrink-0"
                checked={selectedRowKeys.includes(item._id)}
                onChange={(e) => onSelectRow(item._id, e.target.checked)}
              />
            )}
            <div className="flex-grow">{renderItem(item, index)}</div>
          </div>
        )}
        loading={loading}
        pagination={
          showPagination
            ? {
                ...pagination,
                onChange: onChangePagination,
              }
            : false
        }
        {...props}
      />
    </div>
  );
};

export default BaseList;
