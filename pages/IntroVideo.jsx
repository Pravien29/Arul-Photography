// import { useEffect, useRef, useState } from "react";
// import "./style/IntroVideo.css";

// /**
//  * Plays the intro clip once per browser session, then fades out.
//  * Calls onDone() when the splash finishes (video ends, is skipped, or fails to load).
//  */
// function IntroVideo({ onDone }) {
//   const videoRef = useRef(null);
//   const [clip, setClip] = useState(null);
//   const [closing, setClosing] = useState(false);
//   const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem("arul-intro-seen");

//   useEffect(() => {
//     if (alreadySeen) {
//       onDone();
//       return;
//     }
//     fetch("http://localhost:3001/intro")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to load intro");
//         return res.json();
//       })
//       .then((data) => setClip(data[0]))
//       .catch(() => finish());
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const finish = () => {
//     setClosing(true);
//     sessionStorage.setItem("arul-intro-seen", "1");
//     setTimeout(onDone, 650);
//   };

//   if (alreadySeen) return null;

//   return (
//     <div className={`intro-splash ${closing ? "is-closing" : ""}`}>
//       {clip && (
//         <video
//           ref={videoRef}
//           className="intro-video"
//           src={clip.video}
//           autoPlay
//           muted
//           playsInline
//           onEnded={finish}
//           onError={finish}
//         />
//       )}
//       <div className="intro-logo">Arul <em>Photography</em></div>
//       <button className="intro-skip" onClick={finish}>
//         Skip
//       </button>
//     </div>
//   );
// }

// export default IntroVideo;



// import { useEffect, useRef, useState } from "react";
// import "./style/IntroVideo.css";

// function IntroVideo({ onDone }) {
//   const videoRef = useRef(null);
//   const [clip, setClip] = useState(null);
//   const [closing, setClosing] = useState(false);

//   const alreadySeen =
//     typeof window !== "undefined" &&
//     sessionStorage.getItem("arul-intro-seen");

//   // Put finish before useEffect
//   const finish = () => {
//     setClosing(true);
//     sessionStorage.setItem("arul-intro-seen", "1");

//     setTimeout(() => {
//       onDone();
//     }, 650);
//   };

//   useEffect(() => {
//     if (alreadySeen) {
//       onDone();
//       return;
//     }

//     fetch("http://localhost:3001/intro")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to load intro");
//         }

//         return res.json();
//       })
//       .then((data) => {
//         setClip(data[0]);
//       })
//       .catch(() => {
//         finish();
//       });

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (alreadySeen) {
//     return null;
//   }

//   return (
//     <div className={`intro-splash ${closing ? "is-closing" : ""}`}>
//       {clip && (
//         <video
//           ref={videoRef}
//           className="intro-video"
//           src={clip.video}
//           autoPlay
//           muted
//           playsInline
//           onEnded={finish}
//           onError={finish}
//         />
//       )}

//       <div className="intro-logo">
//         Arul <em>Photography</em>
//       </div>

//       <button className="intro-skip" onClick={finish}>
//         Skip
//       </button>
//     </div>
//   );
// }

// export default IntroVideo;

import { useEffect, useState } from "react";
import "./style/IntroVideo.css";

function IntroVideo() {
  const [clip, setClip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://arulnode.onrender.com/api/arul/intro")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load intro video");
        }

        return res.json();
      })
      .then((data) => {
        setClip(data[0]);
      })
      .catch((error) => {
        console.error("Intro video error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="video-section">
        <div className="video-loading">
          Loading...
        </div>
      </section>
    );
  }

  if (!clip) {
    return null;
  }

  return (
    <section className="video-section">
      <div className="video-container">
        <video
          className="section-video"
          src={clip.video}
          controls
          muted
          playsInline
          preload="metadata"
        />

        <div className="video-overlay">
          <span>Our Story</span>

          <h2>
            Moments That
            <em> Stay Forever</em>
          </h2>
        </div>
      </div>
    </section>
  );
}

export default IntroVideo;