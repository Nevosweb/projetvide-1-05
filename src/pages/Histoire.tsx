
import Layout from "@/components/layout/Layout";
import Timeline from "@/components/about/Timeline";
import BakerProfile from "@/components/about/BakerProfile";
import ScrollToTop from "@/components/ui/ScrollToTop";

const Histoire = () => {
  return (
    <Layout>
      <div>
        <Timeline />
        <BakerProfile />
      </div>
      <ScrollToTop />
    </Layout>
  );
};

export default Histoire;
