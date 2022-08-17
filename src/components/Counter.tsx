import { ParentComponent, createSignal } from 'solid-js';

const Counter: ParentComponent<{start: number}> = (props) => {
	const [count, setCount] = createSignal(props.start);
	const add = () => setCount(count() + 1);
	const subtract = () => setCount(count() - 1);

	return (
		<div class="bg-gray-200 flex justify-between">
      <button class="bg-red-500 hover:bg-red-600 rounded-md px-16 py-2 text-2xl font-extrabold hover:text-gray-200" onClick={subtract}>-</button>
      <pre class="p-4 text-2xl">{count()}</pre>
      <button class="bg-teal-500 hover:bg-teal-600 rounded-md px-16 py-2 text-2xl font-extrabold hover:text-gray-200" onClick={add}>+</button>
		</div>
	);
}

export default Counter;
