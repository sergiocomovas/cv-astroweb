import './Counter.css';
import { useState } from 'preact/hooks';

const Counter = ({ children, count: initialCount = 1984 }) => {
  const [count, setCount] = useState<number>(initialCount);

  const add = () => setCount(count + 1);
  const subtract = () => setCount(count - 1);

  return (
    <>
      <div class="counter">
        <button onClick={subtract}>-</button>
        <pre>{count}</pre>
        <button onClick={add}>+</button>
      </div>
      <div class="counter-message">{children}</div>
    </>
  );
};

export default Counter;
