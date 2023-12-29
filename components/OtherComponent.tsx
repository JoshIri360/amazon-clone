import { useCounterStore } from "@/utils/store";

type otherComponentProps = {
  count: number;
};

const OtherComponent = ({ count }: otherComponentProps) => {
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div>
      <h1 className="text-xl">Other Component</h1>
      <p>Count: {count}</p>
      <p className="text-2xl">
        <button onClick={increment}>+</button>
        {" / "}
        <button onClick={decrement}>-</button>
      </p>
    </div>
  );
};

export default OtherComponent;
