"use cleint";
import { theme } from "@/app/theme";
import { Box, Typography } from "@mui/material";
import { differenceInMonths, format } from "date-fns";
import React from "react";

interface HistoryItemProps {
  color: string;
  time: Date;
  created_time: Date;
  note: string;
  subText?: string;
}

const calculateYearsAndMonthsAgo = (date: Date) => {
  const currentDate = new Date();
  const totalMonthsDifference = differenceInMonths(currentDate, date);
  const years = Math.floor(totalMonthsDifference / 12);
  const remainingMonths = totalMonthsDifference % 12;

  return {
    years: years,
    months: remainingMonths,
  };
};

const HistoryItem = ({
  subText,
  color,
  time,
  created_time,
  note,
}: HistoryItemProps) => {
  const formattedDate = calculateYearsAndMonthsAgo(new Date(time));
  return (
    <>
      <Box display="flex">
        <Box>
          <Box
            p={2}
            mt={1}
            borderRadius={2}
            bgcolor={color}
            width={200}
            maxWidth={200}
          >
            <Typography>
              {formattedDate.years} years {formattedDate.months} months ago
            </Typography>
          </Box>
        </Box>
        <Box px={3} display="grid" sx={{ placeItems: "center" }}>
          <Box bgcolor={color} borderRadius={9999} width={20} height={20}></Box>

          <Box
            width="1px"
            height="100%"
            pb={1}
            bgcolor={theme.palette.common.black}
          ></Box>
        </Box>

        <Box py={0.5}>
          <Typography>{format(time, "dd/MM/yyyy")}</Typography>
          {!!subText && <Typography fontWeight={600}>{subText}</Typography>}
          <Typography my={0.5} variant="body2" fontWeight={300}>
            Note: {note}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={300}
            color={theme.palette.grey[400]}
          >
            Added at: {format(created_time, "dd/MM/yyyy")}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default HistoryItem;
