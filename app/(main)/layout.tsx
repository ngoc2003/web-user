import { Box } from "@mui/material";
import { useGetSession } from "../hooks/useGetSession";
import Client from "../providers/ClientProvider";
import Topbar from "./_components/topbar";
import { notFound } from "next/navigation";
import { theme } from "../theme";
import LeftSideBar from "./_components/left-sidebar";

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
          <Box
            display="flex"
            height="100%"
            width="100%"
            maxWidth={1920}
            mx="auto"
          >
            <LeftSideBar flex={0.3} />
            {children}
          </Box>
        </Box>
      </Box>
    </Client>
  );
}
