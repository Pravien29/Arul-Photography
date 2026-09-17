// import { useState } from "react";
// import "./style/tokens.css";
// import "./style/Reveal.css";

// import IntroVideo from "./IntroVideo";
// import Header from "./Header";
// import Hero from "./Hero";
// import WhyUs from "./Whyus";
// import Gallery from "./Gallery";
// import Reviews from "./Reviews";
// import Connect from "./Connect";
// import Footer from "./Footer";

// function Home() {
//   const [introDone, setIntroDone] = useState(false);

//   return (
//     <>
//       {!introDone && <IntroVideo onDone={() => setIntroDone(true)} />}
//       <Header />
//       <main>
//         <Hero />
//         <WhyUs />
//         <Gallery />
//         <Reviews />
//         <Connect />
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default Home;

import "./style/tokens.css";
import "./style/Reveal.css";

import IntroVideo from "./IntroVideo";
import Header from "./Header";
import Hero from "./Hero";
import WhyUs from "./Whyus";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import Connect from "./Connect";

function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <WhyUs />
        <Gallery />

        <IntroVideo />

        <Reviews />
        <Connect />
      </main>

    </>
  );
}

export default Home;