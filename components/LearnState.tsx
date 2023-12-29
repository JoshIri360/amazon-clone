"use client";
import React from "react";
import OtherComponent from "./OtherComponent";
import { useCounterStore } from "@/utils/store";

const LearnState = () => {
  const count = useCounterStore((state) => state.count);

  return <OtherComponent count={count} />;
};

export default LearnState;
