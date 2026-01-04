import PublicLayout from "@/components/PublicLayout";
import milkImg from "@/assets/milk-img.png";

export default function OurProducts() {
  return (
    <PublicLayout heroImage={milkImg}>
      <h1>Our Products</h1>
      <p>
        We provide fresh, high-quality milk products sourced directly from
        healthy livestock.
      </p>
    </PublicLayout>
  );
}
