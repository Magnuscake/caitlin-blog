import { FC } from "react";

import Nav from "@components/Nav";

const Layout: FC = ({ children }) => (
  <>
    <Nav />
    {children}
  </>
);

export default Layout;
