import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BlogPage as BlogComponent } from "../components/blog/BlogPage";

export default function Blog() {
  return (
    <>
      <Header />
      <BlogComponent />
      <Footer />
    </>
  );
}
