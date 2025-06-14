
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutPreview from "@/components/home/AboutPreview";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/ui/ScrollToTop";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      <AboutPreview />
      <ScrollToTop />
    </Layout>
  );
};

export default Index;
