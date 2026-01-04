import Hero from "./Hero";
import "@/styles/hero.css";

export default function PublicLayout({
  heroImage,
  children,
}: {
  heroImage: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Hero image={heroImage} />
      <div className="page-content">{children}</div>
    </>
  );
}
