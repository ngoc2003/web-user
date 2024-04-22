"use client";

import React from "react";
import HistoryItem from "../history-item";

const PINK_COLOR = ["#FEE3DB", "#F4C2C2", "#FFDFC9"];

interface HistoryBoxProps {
  data: {
    id: number;
    created_at: Date;
    description: string;
    time: Date;
  }[];
}
const DewormHistoryBox = ({ data }: HistoryBoxProps) => {
  return (
    <>
      {data.map((item, index) => (
        <HistoryItem
          color={PINK_COLOR[index % 3]}
          created_time={item.created_at}
          note={item.description}
          time={item.time}
          key={item.id}
        />
      ))}
    </>
  );
};

export default DewormHistoryBox;
