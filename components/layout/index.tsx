type LayoutProps = {
  children?: JSX.Element | JSX.Element[] | string;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="page-container">
      <main className="page-content">{children}</main>
    </div>
  );
};

export default Layout;
