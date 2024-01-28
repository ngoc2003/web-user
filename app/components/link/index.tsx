import { Link as MLink, LinkProps } from "@mui/material";
import Link from "next/link";
import React, { useCallback } from "react";

interface PCLinkProps extends Omit<LinkProps, "href"> {
  href: string;
}

const PCLink = ({ href, children, ...props }: PCLinkProps) => {
  const PCLinkComponent = useCallback(
    (componentProps: any) => {
      return (
        <Link underline="none" href={href} {...componentProps}>
          {children}
        </Link>
      );
    },
    [children, href]
  );

  return <MLink underline="none" component={PCLinkComponent} {...props} />;
};

export default PCLink;
