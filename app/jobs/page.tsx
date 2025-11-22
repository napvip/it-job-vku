import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { JobsPage as JobsComponent } from "../components/jobs/JobsPage";

export default function Jobs() {
  return (
    <>
      <Header />
      <JobsComponent />
      <Footer />
    </>
  );
}
