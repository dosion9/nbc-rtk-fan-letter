const { useState } = require("react");

const useInputValue = (initialState = null) => {
  const [value, setValue] = useState(initialState);

  const handler = (e, value = null) => {
    value ? setValue(value) : setValue(e.target.value);
  };

  return [value, handler];
};

export { useInputValue };
