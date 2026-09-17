import Functions from "./Functions";
import slide1 from "../public/images/slide1.jpeg";

export default function Weddings() {
  return (
    <Functions
      endpoint="weddings"
      heroImage={slide1}
      title="Weddings"
      tagline="Full-day wedding stories, told candidly — from the first look to the last dance."
    />
  );
}