"use client";

import React, { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { ExtendedUserType } from "../types/user";

interface ClientProps {
  data: { user: ExtendedUserType };
  children: React.ReactNode;
}

const Client = ({ data, children }: ClientProps) => {
  const { user, setInformation } = useUser();
  useEffect(() => {
    if (data.user?.email) {
      setInformation(data.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.user]);

  return <>{children}</>;
};

export default Client;
