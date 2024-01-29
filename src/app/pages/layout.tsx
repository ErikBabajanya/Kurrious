import Header from "../header/header";
import Menu from "../menu/menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <Header></Header>
        <Menu></Menu>
        {children}
      </div>
    </div>
  );
}
