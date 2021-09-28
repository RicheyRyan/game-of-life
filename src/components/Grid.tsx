import { Component } from "solid-js";

interface GridProps {
  span: number;
}

const Grid: Component<GridProps> = (props) => {
  return (
    <section
      class="grid gap-1"
      style={{
        "grid-template-columns": `repeat(${props.span}, minmax(0, 1fr))`,
      }}
    >
      {props.children}
    </section>
  );
};

export default Grid;
