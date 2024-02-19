import { useGetSession } from "../hooks/useGetSession";
import Client from "../providers/ClientProvider";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await useGetSession();
  if (data?.user?.email) {
    return <Client data={data as any}>{children}</Client>;
  }

  return <>{children}</>;
}
