import { Header , Footer } from '../../components/'

const MainLayout = ({ children }) => {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <div className="w-full overflow-x-hidden">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
