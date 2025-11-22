import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AboutPage as AboutPageComponent } from "../components/about/AboutPage";

export default function About() {
  return (
    <>
      <Header />
      <AboutPageComponent />
      <Footer />
    </>
  );
}
