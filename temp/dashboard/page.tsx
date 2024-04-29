import DashboardSideBar from "../DashboardSideBar";
import "./page.scss";

export default function Dashboard() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-hero-section">
        <DashboardSideBar />
      </section>
      <section></section>
    </main>
  );
}
