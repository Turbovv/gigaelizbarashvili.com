import type { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {

  return (
    <div className="mt-10">
      {children}
    </div>
  );
};

export default Layout;