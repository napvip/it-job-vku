import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CompaniesPage as CompaniesComponent } from "../components/companies/CompaniesPage";

export default function Companies() {
  return (
    <>
      <Header />
      <CompaniesComponent />
      <Footer />
    </>
  );
}
