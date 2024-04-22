"use-client";
import React from "react";
import HistoryItem from "../history-item";

const GREEN_COLOR = ["#C4E6B8", "#F7F7E1", "#FFEBEF"];

interface VaccinationHistoryBoxProps {
  data: {
    id: number;
    created_at: Date;
    description: string;
    time: Date;
    name: string;
  }[];
}
const VaccinationHistoryBox = ({ data }: VaccinationHistoryBoxProps) => {
  return (
    <>
      {data.map((item, index) => (
        <HistoryItem
          color={GREEN_COLOR[index % 3]}
          created_time={item.created_at}
          note={item.description}
          subText={"Product: " + item.name}
          time={item.time}
          key={item.id}
        />
      ))}
    </>
  );
};

export default VaccinationHistoryBox;
