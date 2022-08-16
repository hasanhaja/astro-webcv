import { ParentComponent, createSignal } from 'solid-js';

const Counter: ParentComponent<{start: number}> = (props) => {
	const [count, setCount] = createSignal(props.start);
	const add = () => setCount(count() + 1);
	const subtract = () => setCount(count() - 1);

	return (
		<div class="bg-gray-200 flex justify-between">
      <button class="bg-red-500 rounded-md px-8 py-2 text-2xl font-extrabold" onClick={subtract}>-</button>
      <pre class="p-4 text-2xl">{count()}</pre>
      <button class="bg-teal-500 rounded-md px-8 py-2 text-2xl font-extrabold" onClick={add}>+</button>
		</div>
	);
}

export default Counter;
