import React from "react";

type Props = {
  count: number;
  setCount: (count: number) => void;
};

const LearnState = () => {
  const [count, setCount] = React.useState(0);

  return <OtherComponent count={count} setCount={setCount} />;
};

const OtherComponent = ({ count, setCount }: Props) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default LearnState;
