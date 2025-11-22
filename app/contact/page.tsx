import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ContactPage as ContactComponent } from "../components/contact/ContactPage";

export default function Contact() {
  return (
    <>
      <Header />
      <ContactComponent />
      <Footer />
    </>
  );
}
