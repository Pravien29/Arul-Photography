

// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import "./style/Header.css";

// const portfolioItems = [
//   { name: "Weddings", path: "/weddings" },
//   { name: "Portraits", path: "/portraits" },
//   { name: "Pre Weddings", path: "/prewedding" },
//   { name: "Birthday", path: "/birthday" },
// ];

// const navLinks = [
//   { label: "Home", to: "/" },
//   { label: "About", to: "/about" },
//   { label: "Portfolio", to: "/portfolio", children: portfolioItems },
//   { label: "Wedding Films", to: "/weddingfilm" },
//   { label: "Contact", to: "/contact" },
// ];

// function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [desktopDropdown, setDesktopDropdown] = useState(false);
//   const [mobileDropdown, setMobileDropdown] = useState(false);
//   const dropdownRef = useRef(null);
//   const closeTimer = useRef(null);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 24);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [menuOpen]);

//   // close desktop dropdown on outside click
//   useEffect(() => {
//     const onClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDesktopDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", onClickOutside);
//     return () => document.removeEventListener("mousedown", onClickOutside);
//   }, []);

//   // cleanup any pending close timer on unmount
//   useEffect(() => {
//     return () => clearTimeout(closeTimer.current);
//   }, []);

//   const closeAll = () => {
//     clearTimeout(closeTimer.current);
//     setMenuOpen(false);
//     setDesktopDropdown(false);
//     setMobileDropdown(false);
//   };

//   // small grace period so a fast/diagonal mouse move off the
//   // trigger doesn't close the panel before the cursor lands on it
//   const openDesktopDropdown = () => {
//     clearTimeout(closeTimer.current);
//     setDesktopDropdown(true);
//   };

//   const scheduleCloseDesktopDropdown = () => {
//     closeTimer.current = setTimeout(() => setDesktopDropdown(false), 150);
//   };

//   return (
//     <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
//       <div className="header-inner">
//         <Link to="/" className="brand" onClick={closeAll}>
//           <img src="/aplogo.png" alt="Arul Photography logo" className="brand-logo" />
//           <span className="brand-text">
//             Arul <em>Photography</em>
//           </span>
//         </Link>

//         <nav className="main-nav" aria-label="Primary">
//           {navLinks.map((link) =>
//             link.children ? (
//               <div
//                 className="nav-item-dropdown"
//                 key={link.label}
//                 ref={dropdownRef}
//                 onMouseEnter={openDesktopDropdown}
//                 onMouseLeave={scheduleCloseDesktopDropdown}
//               >
//                 <div className={`nav-dropdown-trigger ${desktopDropdown ? "is-open" : ""}`}>
//                   <Link to={link.to} onClick={closeAll} className="nav-dropdown-label">
//                     {link.label}
//                   </Link>
//                   <button
//                     type="button"
//                     className="nav-dropdown-toggle"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setDesktopDropdown((v) => !v);
//                     }}
//                     aria-expanded={desktopDropdown}
//                     aria-label={`Toggle ${link.label} submenu`}
//                   >
//                     <span className="nav-dropdown-plus">+</span>
//                   </button>
//                 </div>

//                 <div className={`dropdown-panel ${desktopDropdown ? "is-open" : ""}`}>
//                   {link.children.map((child) => (
//                     <Link
//                       key={child.name}
//                       to={child.path}
//                       onClick={closeAll}
//                       className="dropdown-link"
//                     >
//                       {child.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <Link key={link.label} to={link.to}>
//                 {link.label}
//               </Link>
//             )
//           )}
//         </nav>

//         <div className="header-actions">
//           <span className="divider" aria-hidden="true" />
//           <Link to="/booking" className="book-btn">
//             Book a Shoot
//           </Link>

//           <button
//             className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
//             aria-label="Toggle menu"
//             aria-expanded={menuOpen}
//             onClick={() => setMenuOpen((v) => !v)}
//           >
//             <span />
//             <span />
//             <span />
//           </button>
//         </div>
//       </div>

//       <div className={`nav-backdrop ${menuOpen ? "is-open" : ""}`} onClick={closeAll} />
//       <div className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
//         {navLinks.map((link, i) =>
//           link.children ? (
//             <div className="mobile-nav-group" key={link.label} style={{ transitionDelay: `${i * 50}ms` }}>
//               <div className={`mobile-nav-trigger ${mobileDropdown ? "is-open" : ""}`}>
//                 <Link to={link.to} onClick={closeAll} className="mobile-nav-label">
//                   {link.label}
//                 </Link>
//                 <button
//                   type="button"
//                   className="mobile-nav-toggle"
//                   onClick={() => setMobileDropdown((v) => !v)}
//                   aria-expanded={mobileDropdown}
//                   aria-label={`Toggle ${link.label} submenu`}
//                 >
//                   <span className="nav-dropdown-plus">+</span>
//                 </button>
//               </div>
//               <div className={`mobile-dropdown-panel ${mobileDropdown ? "is-open" : ""}`}>
//                 {link.children.map((child) => (
//                   <Link key={child.name} to={child.path} onClick={closeAll}>
//                     {child.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <Link
//               key={link.label}
//               to={link.to}
//               style={{ transitionDelay: `${i * 50}ms` }}
//               onClick={closeAll}
//             >
//               {link.label}
//             </Link>
//           )
//         )}
//         <Link to="/booking" className="mobile-book-btn" onClick={closeAll}>
//           Book a Shoot
//         </Link>
//       </div>
//     </header>
//   );
// }

// export default Header;

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./style/Header.css";

const portfolioItems = [
  { name: "Weddings", path: "/weddings" },
  { name: "Portraits", path: "/portraits" },
  { name: "Pre Weddings", path: "/prewedding" },
  { name: "Birthday", path: "/birthday" },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio", children: portfolioItems },
  { label: "Wedding Films", to: "/weddingfilm" },
  { label: "Contact", to: "/contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // close desktop dropdown on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDesktopDropdown(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // cleanup any pending close timer on unmount
  useEffect(() => {
    return () => clearTimeout(closeTimer.current);
  }, []);

  const closeAll = () => {
    clearTimeout(closeTimer.current);
    setMenuOpen(false);
    setDesktopDropdown(false);
    setMobileDropdown(false);
  };

  // small grace period so a fast/diagonal mouse move off the
  // trigger doesn't close the panel before the cursor lands on it
  const openDesktopDropdown = () => {
    clearTimeout(closeTimer.current);
    setDesktopDropdown(true);
  };

  const scheduleCloseDesktopDropdown = () => {
    closeTimer.current = setTimeout(() => setDesktopDropdown(false), 150);
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
      <div className="header-inner">
        <Link to="/" className="brand" onClick={closeAll}>
          <img src="/aplogo.png" alt="Arul Photography logo" className="brand-logo" />
          <span className="brand-text">
            Arul <em>Photography</em>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Primary">
          {navLinks.map((link) =>
            link.children ? (
              <div
                className="nav-item-dropdown"
                key={link.label}
                ref={dropdownRef}
                onMouseEnter={openDesktopDropdown}
                onMouseLeave={scheduleCloseDesktopDropdown}
              >
                <div className={`nav-dropdown-trigger ${desktopDropdown ? "is-open" : ""}`}>
                  <Link to={link.to} onClick={closeAll} className="nav-dropdown-label">
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    className="nav-dropdown-toggle"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDesktopDropdown((v) => !v);
                    }}
                    aria-expanded={desktopDropdown}
                    aria-label={`Toggle ${link.label} submenu`}
                  >
                    <span className="nav-dropdown-plus">+</span>
                  </button>
                </div>

                <div className={`dropdown-panel ${desktopDropdown ? "is-open" : ""}`}>
                  {link.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.path}
                      onClick={closeAll}
                      className="dropdown-link"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="header-actions">
          <span className="divider" aria-hidden="true" />
          <Link to="/booking" className="book-btn">
            Book a Shoot
          </Link>

          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
        <div className="mobile-nav-scroll">
          <nav className="mobile-nav-links" aria-label="Mobile">
            {navLinks.map((link, i) =>
              link.children ? (
                <div className="mobile-nav-group" key={link.label} style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}>
                  <div className={`mobile-nav-trigger ${mobileDropdown ? "is-open" : ""}`}>
                    <Link to={link.to} onClick={closeAll} className="mobile-nav-label">
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      className="mobile-nav-toggle"
                      onClick={() => setMobileDropdown((v) => !v)}
                      aria-expanded={mobileDropdown}
                      aria-label={`Toggle ${link.label} submenu`}
                    >
                      <span className="nav-dropdown-plus">+</span>
                    </button>
                  </div>
                  <div className={`mobile-dropdown-panel ${mobileDropdown ? "is-open" : ""}`}>
                    {link.children.map((child) => (
                      <Link key={child.name} to={child.path} onClick={closeAll}>
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="mobile-nav-plain"
                  style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                  onClick={closeAll}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <Link to="/booking" className="mobile-book-btn" onClick={closeAll}>
            Book a Shoot
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;