
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import ScrollToTop from "@/components/ui/ScrollToTop";

const Produits = () => {
  return (
    <Layout>
      <ProductGrid />
      <ScrollToTop />
    </Layout>
  );
};

export default Produits;
