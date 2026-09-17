import Functions from "./Functions";
import slide2 from "../public/images/slide2.jpeg";

export default function Portraits() {
  return (
    <Functions
      endpoint="Portraits"
      heroImage={slide2}
      title="Portraits"
      tagline="Individual and family portraits, shot with natural light and a quiet hand."
    />
  );
}