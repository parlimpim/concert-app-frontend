import Sidebar from "@/components/sidebar";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section>
      <Sidebar />
      {children}
    </section>
  );
};

export default AppLayout;
