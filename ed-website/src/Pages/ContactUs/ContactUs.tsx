import PublicLayout from "@/components/PublicLayout";
import farmerImg from "@/assets/farmer-img.png";

export default function ContactUs() {
  return (
    <PublicLayout heroImage={farmerImg}>
      <h1>Contact Us</h1>
      <p>Email: support@edellite.com</p>
      <p>Phone: +91 98765 43210</p>
    </PublicLayout>
  );
}
