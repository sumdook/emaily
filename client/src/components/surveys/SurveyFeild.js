import React from "react";
import { Input, Form } from "antd";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

export default ({ input, label, placeholder, meta: { error, touched } }) => {
  return (
    <div>
      <FormItem
        {...formItemLayout}
        label={label}
        validateStatus={touched && error ? "error" : ""}
        help={touched && error}
      >
        <Input {...input} style={style} placeholder={placeholder} />
      </FormItem>
    </div>
  );
};

const style = {
  margin: "0",
  width: 400,
  alignItem: "center"
};
