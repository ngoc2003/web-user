import { Box } from "@mui/material";
import { useGetSession } from "../hooks/useGetSession";
import Client from "../providers/ClientProvider";
import Topbar from "./_components/topbar";
import { notFound } from "next/navigation";
import { theme } from "../theme";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await useGetSession();

  if (!data?.user) {
    return notFound;
  }
  return (
    <Client data={data as any}>
      <Box>
        <Topbar />
        <Box
          pt={3}
          bgcolor="#F1F3F5"
          height="calc(100vh - 88px)"
          maxHeight="calc(100vh - 88px)"
        >
          {children}
        </Box>
      </Box>
    </Client>
  );
}
