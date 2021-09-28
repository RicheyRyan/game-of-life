import { Component, Show } from "solid-js";

interface HeaderProps {
  title: string;
  generations: number;
}

const Header: Component<HeaderProps> = (props) => {
  return (
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          {props.title}
        </h1>

        <p>
          Generations:&nbsp;
          <Show when={props.generations > 0} fallback="-">
            {props.generations}
          </Show>
        </p>
      </div>
    </header>
  );
};

export default Header;
