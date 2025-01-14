'use client';
import { Form, Modal, Popover } from 'antd';
import { useEffect, useState } from 'react';
import InputField from './inputs/BaseInputField';
import useDebounce from './useDebounce';
import { useRouter } from 'next/navigation';
import { bindUrlWithParams, getParams, useQuery } from '@/components/_helpers/Utils';
import { usePathname } from 'next/navigation';
import { OutlinedButton, PrimaryButton } from '@/components/common/buttons/buttons';
import { FilterOutlined } from '@ant-design/icons';
import { useLanguageContext } from '../contexts/LanguageContextProvider';
import { DL } from '../_helpers/translations';

const BaseFilterComponent = ({
  cols = '12',
  searchAction,
  filterItems,
  filterData,
  showActionButtons = false,
  hideUrl = false,
  className,
  getFilters,
  viewType = 1,
  size = 10,
}) => {
  const [data, setData] = useState({});
  const query = useQuery();
  const router = useRouter();
  const currentPath = usePathname();
  const [visibleModal, setVisibleModal] = useState(false);
  const { currentLang } = useLanguageContext();
  const showModal = () => {
    setVisibleModal(true);
  };
  const closeModal = () => {
    setVisibleModal(false);
  };

  useEffect(() => {
    let _data = {};
    const _filterItems = filterData ? [...filterItems, filterData] : filterItems;
    for (const i in _filterItems) {
      const element = _filterItems[i];
      _data[element.name] = element.value ?? '';
    }
    _data = getParams(query, _data);
    setData(_data);
  }, [filterData]);

  // useEffect(() => {
  //     resetSearch();
  // }, [currentLang]);

  const debounceAction = useDebounce(searchAction, 500);

  const onChangeHandle = (name, value) => {
    let _data = { ...data, [name]: value };
    setData(_data);

    _data = beforeSubmit(_data);
    bindUrl(_data);
    searchAction && debounceAction(_data);
    if (getFilters) {
      getFilters(_data);
    }
  };

  const beforeSubmit = (_data) => {
    for (const i in filterItems) {
      // console.log("da --> ", _data[filterItems[i].name])
      if (filterItems[i].beforeSubmit && _data[filterItems[i].name]) {
        _data[filterItems[i].name] = filterItems[i].beforeSubmit(_data[filterItems[i].name]);
      }
    }

    return _data;
  };

  const bindUrl = (_data) => {
    !hideUrl &&
      router.push(
        bindUrlWithParams(currentPath, {
          page: 1,
          size,
          ..._data,
        }),
      );
  };

  const resetSearch = () => {
    setData({});
    bindUrl({});
    searchAction({});
  };
  const handleActionBtn = () => {
    searchAction(data);
    closeModal();
  };

  return (
    <div className={`${viewType === 1 ? 'py-4' : ''} ${className}`}>
      {viewType === 2 && <PrimaryButton onClick={showModal} text={'btn_filter'} />}
      {viewType === 1 && (
        <Form layout="vertical" initialValues={data}>
          <div className={`grid grid-flow-row-dense grid-cols-${cols} mb-4 gap-3`}>
            {filterItems.map((item) => (
              <InputField
                key={item.name}
                onChange={onChangeHandle}
                value={data[item.name]}
                {...item}
              />
            ))}
          </div>
          {showActionButtons && (
            <div className="flex gap-2">
              <PrimaryButton text={'btn_search'} onClick={() => searchAction(data)} />

              <OutlinedButton text={'btn_reset'} onClick={resetSearch} />
            </div>
          )}
        </Form>
      )}
      {viewType === 2 && (
        <Modal open={visibleModal} onCancel={closeModal} footer={null}>
          <div className="p-10">
            <Form layout="vertical" initialValues={data}>
              <div className={`grid grid-flow-row-dense grid-cols-${cols} mb-4 gap-3`}>
                {filterItems.map((item) => (
                  <InputField
                    key={item.name}
                    onChange={onChangeHandle}
                    value={data[item.name]}
                    {...item}
                  />
                ))}
              </div>
              {showActionButtons && (
                <div className="flex items-center gap-2">
                  <PrimaryButton text={'btn_search'} onClick={handleActionBtn} />

                  <OutlinedButton text={'btn_reset'} onClick={resetSearch} />
                </div>
              )}
            </Form>
          </div>
        </Modal>
      )}

      {viewType === 3 && (
        <Popover
          placement="bottomRight"
          trigger="click"
          content={
            <div className="p-10">
              <Form layout="vertical" initialValues={data}>
                <div className={`grid grid-flow-row-dense grid-cols-${cols} mb-4 gap-3`}>
                  {filterItems.map((item) => (
                    <InputField
                      key={item.name}
                      onChange={onChangeHandle}
                      value={data[item.name]}
                      {...item}
                    />
                  ))}
                </div>
                {showActionButtons && (
                  <div className="flex items-center gap-2">
                    <PrimaryButton text={'btn_search'} onClick={handleActionBtn} />

                    <OutlinedButton text={'btn_reset'} onClick={resetSearch} />
                  </div>
                )}
              </Form>
            </div>
          }
          arrow={true}
        >
          <PrimaryButton prefix={<FilterOutlined />} text={'btn_filter'} />
        </Popover>
      )}
    </div>
  );
};

export default BaseFilterComponent;
