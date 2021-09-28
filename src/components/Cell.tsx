import { Component } from "solid-js";

interface CellProps {
  alive: boolean;
  onClick: () => void;
}

const Cell: Component<CellProps> = (props) => {
  return (
    <div class="aspect-w-1 aspect-h-1">
      <button
        onClick={props.onClick}
        class="rounded-md transition"
        classList={{
          "bg-green-300 hover:bg-green-600": props.alive,
          "bg-gray-200 hover:bg-gray-400": !props.alive,
        }}
      />
    </div>
  );
};

export default Cell;
