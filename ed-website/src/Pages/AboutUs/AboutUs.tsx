import PublicLayout from "@/components/PublicLayout";
import cowImg from "@/assets/cow-img.png";

export default function AboutUs() {
  return (
    <PublicLayout heroImage={cowImg}>
      <h1>About Us</h1>
      <p>
        ED Ellite Dairymen is dedicated to empowering farmers with modern dairy
        management and nutrition solutions.
      </p>
    </PublicLayout>
  );
}
