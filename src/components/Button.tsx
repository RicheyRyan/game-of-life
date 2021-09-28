import { Component } from "solid-js";

const Button: Component<{ onClick: () => void }> = ({ onClick, children }) => {
  return (
    <button class="bg-blue-400 hover:bg-blue-600 text-white" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
