interface HeroProps {
  image: string;
}

export default function Hero({ image }: HeroProps) {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${image})`,
      }}
    />
  );
}
