type LayoutProps = {
  children: JSX.Element | JSX.Element[] | string;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="page-container">
      <main className="page-content">
        <article className="markdown-body">{children}</article>
      </main>
    </div>
  );
};

export default Layout;
