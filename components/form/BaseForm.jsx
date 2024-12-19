'use client';
import React, { useState } from 'react';
import { Form } from 'antd';
import renderFormItem from './RenderFormItems';
import { Button } from '../shared/button';

const BaseForm = ({
  formItems,
  formLayout = 'vertical',
  initialValues,
  buttonText = 'Submit',
  renderExtraSection,
  customForm,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = customForm ? customForm : Form.useForm();
  const [autoCompleteOptions, setAutoCompleteOptions] = useState({});

  const handleAutoCompleteChange = (name, value) => {
    if (!value) {
      setAutoCompleteOptions((prev) => ({ ...prev, [name]: [] }));
    } else {
      setAutoCompleteOptions((prev) => ({
        ...prev,
        [name]: ['.com', '.org', '.net'].map((domain) => `${value}${domain}`),
      }));
    }
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        layout={formLayout}
        form={form}
        initialValues={initialValues}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        <div className="grid w-full grid-flow-row-dense grid-cols-12 gap-x-4">
          {formItems.map((item) => (
            <div key={item.name} className={item.className}>
              <Form.Item
                className="font-semibold text-sm"
                name={item.name}
                label={item.label}
                rules={item.rules}
                dependencies={item.dependencies}
                hasFeedback={item.hasFeedback}
                valuePropName={item.valuePropName || 'value'}
                extra={item.extra}
                {...item.formItemProps}
              >
                {renderFormItem(item, [], autoCompleteOptions, setAutoCompleteOptions, form)}
              </Form.Item>
            </div>
          ))}
        </div>

        {/* Dynamically rendered submit button */}
        {!renderExtraSection && (
          <Form.Item>
            <Button.Primary type="primary" className="w-full" htmlType="submit">
              {buttonText}
            </Button.Primary>
          </Form.Item>
        )}
      </Form>
      {renderExtraSection ? renderExtraSection(form) : null}
    </>
  );
};

export default BaseForm;
