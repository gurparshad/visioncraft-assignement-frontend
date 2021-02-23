import React from "react";

const InputField = (props: any) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    props.onChange(event.target.name, event.target.value);
  };

  const validate = () => {
    return false;
  };

  return (
    <div className="input__wrapper">
      {props.label && <label>{props.label}</label>}
      <input
        placeholder={props.placeholder}
        name={props.name}
        onChange={(event) => handleChange(event)}
        type={props.type}
        value={props.value ? props.value : value}
        autoComplete={props.autoComplete}
      />
    </div>
  );
};

InputField.defaultProps = {
  placeholder: "",
  name: "",
  type: "text",
  value: "",
  autoComplete: "off",
};

export default InputField;
