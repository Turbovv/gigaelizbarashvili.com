import type { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {

  return (
    <div className="mt-28">
      {children}
    </div>
  );
};

export default Layout;