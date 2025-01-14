import { useState } from 'react';
import { Popconfirm } from 'antd';
import api from '@/components/services/Api';
import Link from 'next/link';
import { OutlinedButton } from '@/components/common/buttons/buttons';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import IconPencilPaper from '../icon/icon-pencil-paper';
import IconPencil from '../icon/icon-pencil';
import IconTrashLines from '../icon/icon-trash-lines';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import IconEye from '../icon/icon-eye';

const TableActionButtons = ({
  data,
  moduleName,
  deleteUrl,
  callback,
  showEditModal = false,
  editModalComponent,
  showView = true,
  showEdit = true,
  showEditIcon,
  showDelete = true,
  className = 'flex gap-2 items-center',
}) => {
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    api.deleteData({ setLoading, url: `${deleteUrl}/${data._id}` }, () => {
      callback && callback(null, false, true);
    });
  };

  return (
    <div className={className}>
      {showView && (
        <Link href={`/${moduleName}/details/${data?._id}`}>
          <IconEye className="h-4.5 w-4.5 shrink-0 rtl:ml-2" />
        </Link>
      )}
      {showEditModal && editModalComponent}

      {showEdit && (
        <Link href={`/${moduleName}/edit/${data?._id}`}>
          {showEditIcon ? (
            showEditIcon
          ) : (
            <Tippy content="Edit">
              <button type="button" className="mt-[2px]">
                <IconPencil className="text-primary" />
              </button>
            </Tippy>
          )}
        </Link>
      )}
      {showDelete && (
        <div>
          <Popconfirm
            title={`Delete this ${moduleName} ?`}
            description="Are you sure to delete this ?"
            onConfirm={onDelete}
            okText="Yes"
            cancelText="No"
            placement="topLeft"
          >
            <button type="button">
              <IconTrashLines className="text-primary" />
            </button>
          </Popconfirm>
        </div>
      )}
    </div>
  );
};

export default TableActionButtons;
