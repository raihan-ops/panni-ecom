import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { message, Popover, Upload } from 'antd';
import LoadingSuspense from './LoadingSuspense';
import { IMAGE_URL } from '../_helpers/Constant';
import { getErrorMessage } from '../_helpers/Utils';
import { Toast } from './Toast';
import UploadService from '../services/UploadService';
import GallerySelectBox from './GallerySelectBox';
import { AuthContext } from '../contexts/AuthContextProvider';

const ImageUploader = forwardRef((props, ref) => {
  const { galleryEnable = true, METHOD = 'POST' } = props || {};
  const authContext = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [initialLoad, setInitialLoad] = useState(props.initialLoad ?? true);
  const [fileList, setFileList] = useState(
    props.fileList
      ? [
          ...props.fileList.map((e, i) => ({
            uid: i,
            status: 'done',
            url: IMAGE_URL + '/' + e,
          })),
        ]
      : [],
  );
  // console.log("fileList",fileList);
  const [selectedData, setSelectedData] = useState(props.selectedData ?? []);
  useEffect(() => {
    if (props.updateComponentOnDataChange && !initialLoad) {
      setFileList([
        ...props.fileList.map((e, i) => ({
          uid: i,
          status: 'done',
          url: IMAGE_URL + '/' + e,
        })),
      ]);

      // Only update the state if it hasn't been set to false yet
      if (initialLoad) {
        setInitialLoad(false);
      }
    }
  }, [props.fileList, initialLoad]);

  useEffect(() => {
    if (authContext.resetImage) setFileList([]);
  }, [authContext.resetImage]);

  useEffect(() => {
    setSelectedData(props.selectedData ?? []);
  }, [props.selectedData]);

  const onRemove = (file) => {
    const _data = [...fileList?.filter((e) => e.uid !== file.uid)];
    setFileList(_data);
    if (props.selectionType === 'single') {
      setSelectedData([]);
    } else {
      const _replace = file.url.replace(`${IMAGE_URL}/`, '');
      setSelectedData((prev) => {
        return prev?.filter((e) => e !== _replace);
      });
    }
    if (props.onRemove) {
      props.onRemove(file.url);
    }
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      // eslint-disable-next-line no-undef
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  function beforeUpload(file) {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG/WEBP file!');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('Image must be smaller than 10MB!');
    }
    setError(!(isJpgOrPng && isLt10M));
    return isJpgOrPng && isLt10M;
  }

  const uploadFile = async (data) => {
    if (error) {
      return;
    }
    const formData = new FormData();
    console.log(data.file);
    formData.append('image', data.file);

    const newUploadPath = props.folderName
      ? props.uploadPath + `?folderName=${props.folderName}`
      : props.uploadPath;

    try {
      setLoading(true);
      const res = await UploadService.upload(newUploadPath, formData, null, null, METHOD);
      setLoading(false);
      if (res.data.path) {
        setFileList([
          ...fileList,
          {
            uid: fileList.length,
            status: 'done',
            url: `${IMAGE_URL}/${res.data.path}`,
          },
        ]);
      }

      props.onUpload(res.data.path, res.data.labels);
    } catch (error) {
      setLoading(false);
      const message = getErrorMessage(error);
      Toast('error', 'Error', 'Can not upload image ! ' + message);
    }
  };

  useImperativeHandle(ref, () => ({
    clearData() {
      setFileList([]);
      setLoading(false);
      setError(false);
    },
  }));

  const handleChoose = (list, item) => {
    setSelectedData(list);
    const _data = list?.map((e) => {
      props.onUpload(e);
      return {
        url: `${IMAGE_URL}/${e}`,
      };
    });

    const newItems = _data.filter((item) => !fileList?.some((file) => file.url === item.url));

    let _newList = [...fileList, ...newItems];
    if (item) {
      _newList = _newList?.filter((_item) => _item.url !== `${IMAGE_URL}/${item}`);
    }
    setFileList(_newList);
  };

  return (
    <div>
      <Upload
        customRequest={uploadFile}
        listType={props.listType ?? 'picture-card'}
        className=""
        fileList={props.hideList ? [] : fileList}
        onRemove={onRemove}
        onPreview={onPreview}
        beforeUpload={beforeUpload}
      >
        {props.uploadIcon ? (
          <>
            <Popover
              placement="topRight"
              content={
                <GallerySelectBox
                  selectedImages={selectedData}
                  onSelect={handleChoose}
                  selectionType={props.selectionType}
                />
              }
              title="Gallery"
            >
              {props.uploadIcon}
            </Popover>
          </>
        ) : loading ? (
          <LoadingSuspense />
        ) : (
          fileList.length < props.limit && (
            <>
              {galleryEnable ? (
                <Popover
                  placement="topRight"
                  content={
                    <GallerySelectBox
                      selectedImages={selectedData}
                      onSelect={handleChoose}
                      selectionType={props.selectionType}
                    />
                  }
                  title="Gallery"
                >
                  <div className="flex h-full w-full items-center justify-center">+upload</div>
                </Popover>
              ) : (
                <div className="flex h-full w-full items-center justify-center">+upload</div>
              )}
            </>
          )
        )}
      </Upload>
    </div>
  );
});
ImageUploader.displayName = 'ImageUploader';
export default ImageUploader;
