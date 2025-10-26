import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [language, setLanguage] = useState("de");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroImages = [
    "/attached_assets/20230706_194116_1753981487979.jpg",
    "/attached_assets/20220617_154904_1753981487978.jpg",
    "/attached_assets/20210306_123121_1753981487974.jpg",
    "/attached_assets/20210510_171400_1753981487975.jpg",
    "/attached_assets/20210712_115521_1753981487976.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const texts = {
    de: {
      nav: {
        home: "Startseite",
        services: "Leistungen",
        projects: "Projekte",
        about: "Über uns",
        contact: "Kontakt",
      },
      hero: {
        title: "Garten & Landschaftsbau",
        subtitle: "Professionelle Planung, Begleitung und Ausführung",
        description:
          "Wir machen Plannung, Begleitung und Ausführung im Bereich Garten und Landschaft.",
        cta: "Projekt anfragen",
      },
      services: {
        title: "Unsere Leistungen",
        subtitle: "Individuelle Lösungen für Ihren Traumgarten",
        planning: {
          title: "Planung",
          description:
            "Skizzenhafte Lösungsvorschläge, 3D-Visualisierung, Ausführungsplanung, Detail- und Werkzeichnungen, Bepflanzungspläne",
        },
        consulting: {
          title: "Begleitung",
          description:
            "Entwicklung eines Pflegekonzeptes, Gehölz- und Baumpflege, Rasenpflege, Heckenschnitt, Formschnitt an Gehölzen, Beetpflege",
        },
        execution: {
          title: "Ausführung",
          description:
            "Treppen, Mauern, Terrassen, Plätze, Wege, Carports, Zäune, Pergolen, Schwimmteiche, Zisternen, Beregnungsanlagen, Neuanpflanzungen",
        },
        excavation: {
          title: "Aushub",
          description:
            "Professionelle Erdarbeiten, Bodenaushub und Geländemodellierung für Ihr Projekt",
        },
      },
      projects: {
        title: "Unsere Projekte",
        subtitle: "Entdecken Sie unsere realisierten Gartenprojekte",
      },
      about: {
        title: "Über uns",
        description:
          "Als erfahrenes Unternehmen im Garten- und Landschaftsbau verstehen wir uns als Ihr Partner für außergewöhnliche Außenräume. Unser Team verbindet handwerkliche Tradition mit innovativen Lösungen und nachhaltigen Ansätzen. Wir schaffen nicht nur Gärten, sondern Lebensräume, die Ihre Persönlichkeit widerspiegeln und sich harmonisch in die natürliche Umgebung einfügen. Jedes Projekt ist für uns eine neue Herausforderung, bei der wir unsere Leidenschaft für Natur und Design mit höchster Qualität und Zuverlässigkeit verbinden. Von der ersten Idee bis zur langfristigen Pflege stehen wir Ihnen mit unserem Fachwissen zur Seite.",
      },
      contact: {
        title: "Kontakt aufnehmen",
        subtitle: "Lassen Sie uns Ihr nächstes Projekt besprechen",
        phone: "Telefon",
        email: "E-Mail",
        address: "Adresse",
        form: {
          title: "Projekt anfragen",
          name: "Ihr Name",
          email: "Ihre E-Mail",
          phone: "Ihre Telefonnummer (optional)",
          project: "Beschreiben Sie Ihr Projekt",
          send: "Anfrage senden",
        },
      },
    },
    en: {
      nav: {
        home: "Home",
        services: "Services",
        projects: "Projects",
        about: "About",
        contact: "Contact",
      },
      hero: {
        title: "Garden & Landscape",
        subtitle: "Professional Planning, Consulting and Execution",
        description:
          "We provide planning, consulting and execution in the field of gardens and landscapes.",
        cta: "Request Project",
      },
      services: {
        title: "Our Services",
        subtitle: "Individual solutions for your dream garden",
        planning: {
          title: "Planning",
          description:
            "Sketch-like solution proposals, 3D visualization, execution planning, detail and working drawings, planting plans",
        },
        consulting: {
          title: "Consulting",
          description:
            "Development of a care concept, tree and shrub care, lawn care, hedge trimming, topiary work on woody plants, bed care",
        },
        execution: {
          title: "Execution",
          description:
            "Stairs, walls, terraces, squares, paths, carports, fences, pergolas, swimming ponds, cisterns, irrigation systems, new plantings",
        },
        excavation: {
          title: "Excavation",
          description:
            "Professional earthwork, soil excavation and terrain modeling for your project",
        },
      },
      projects: {
        title: "Our Projects",
        subtitle: "Discover our realized garden projects",
      },
      about: {
        title: "About Us",
        description:
          "As an experienced company in garden and landscape construction, we see ourselves as your partner for exceptional outdoor spaces. Our team combines traditional craftsmanship with innovative solutions and sustainable approaches. We don't just create gardens, but living spaces that reflect your personality and blend harmoniously into the natural environment. Every project is a new challenge for us, where we combine our passion for nature and design with the highest quality and reliability. From the first idea to long-term care, we support you with our expertise.",
      },
      contact: {
        title: "Get in Touch",
        subtitle: "Let us discuss your next project",
        phone: "Phone",
        email: "Email",
        address: "Address",
        form: {
          title: "Request Project",
          name: "Your Name",
          email: "Your Email",
          phone: "Your Phone (optional)",
          project: "Describe your project",
          send: "Send Request",
        },
      },
    },
  };

  const t = texts[language];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({ loading: false, success: true, error: "" });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          honeypot: "",
        });
        setTimeout(() => {
          setFormStatus({ loading: false, success: false, error: "" });
        }, 5000);
      } else {
        setFormStatus({
          loading: false,
          success: false,
          error: data.message || "Failed to send message",
        });
      }
    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error: "Network error. Please try again.",
      });
    }
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const projectCategories = [
    {
      id: "terrassen",
      title: language === "de" ? "Moderne Terrassen" : "Modern Terrace Design",
      image: "/attached_assets/terasse/20220405_152639.jpg",
      images: [
        "/attached_assets/terasse/20220405_152639.jpg",
        "/attached_assets/terasse/20210306_123125.jpg",
        "/attached_assets/terasse/20210416_144703.jpg",
        "/attached_assets/terasse/20210416_144712.jpg",
        "/attached_assets/terasse/20210416_144725.jpg",
        "/attached_assets/terasse/20210510_171332.jpg",
        "/attached_assets/terasse/20210830_113404.jpg",
        "/attached_assets/terasse/20210830_113425.jpg",
        "/attached_assets/terasse/20220331_144228.jpg",
        "/attached_assets/terasse/20220405_152629.jpg",
        "/attached_assets/terasse/20220405_152653.jpg",
        "/attached_assets/terasse/20220405_152712.jpg",
        "/attached_assets/terasse/20220608_124450.jpg",
        "/attached_assets/terasse/20240221_153611.jpg",
        "/attached_assets/terasse/IMG-20210901-WA0009.jpg",
        "/attached_assets/terasse/IMG-20220405-WA0000.jpeg",
        "/attached_assets/terasse/IMG-20221103-WA0001.jpg",
        "/attached_assets/terasse/0c472b83-962d-4f83-b26d-5788e301895d.jpg",
        "/attached_assets/terasse/425e0555-fd33-4483-b88e-7fbbdde47cad.jpg",
      ],
    },
    {
      id: "rasen",
      title: language === "de" ? "Perfekter Rasen" : "Perfect Lawn",
      image: "/attached_assets/rasen/20220617_154904.jpg",
      images: [
        "/attached_assets/rasen/20220617_154904.jpg",
        "/attached_assets/rasen/20210510_171322.jpg",
        "/attached_assets/rasen/20210510_171343.jpg",
        "/attached_assets/rasen/20210510_171422.jpg",
        "/attached_assets/rasen/20220617_154859.jpg",
        "/attached_assets/rasen/20220617_154939.jpg",
      ],
    },
    {
      id: "naturstein",
      title: language === "de" ? "Naturstein Details" : "Natural Stone Details",
      image: "/attached_assets/stein/20220624_114311.jpg",
      images: [
        "/attached_assets/stein/20220624_114311.jpg",
        "/attached_assets/stein/20210712_115521.jpg",
        "/attached_assets/stein/20220623_143147.jpg",
        "/attached_assets/stein/20230706_194124.jpg",
        "/attached_assets/stein/20230706_194134.jpg",
      ],
    },
    {
      id: "poolbau",
      title: language === "de" ? "Poolbau" : "Pool Construction",
      image: "/attached_assets/pool/20221118_135442.jpg",
      images: [
        "/attached_assets/pool/20221118_135442.jpg",
        "/attached_assets/pool/20221118_110414.jpg",
        "/attached_assets/pool/20230706_194116.jpg",
      ],
    },
  ];

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="logo">
            <img
              src="/attached_assets/logo_1753982524080.jpg"
              alt="Logo"
              style={{ height: "50px" }}
            />
          </div>
          <nav className="nav">
            <a href="#home">{t.nav.home}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#contact-form">{t.nav.contact}</a>
          </nav>
          <div className="header-actions">
            <div className="language-toggle">
              <button
                className={language === "de" ? "active" : ""}
                onClick={() => setLanguage("de")}
              >
                DE
              </button>
              <button
                className={language === "en" ? "active" : ""}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
            </div>
            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="mobile-menu">
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.home}
            </a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.services}
            </a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.projects}
            </a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.about}
            </a>
            <a href="#contact-form" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.contact}
            </a>
          </div>
        </div>
      )}

      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>{t.hero.title}</h1>
            <h2>{t.hero.subtitle}</h2>
            <p>{t.hero.description}</p>
            <button className="cta-button" onClick={scrollToForm}>
              {t.hero.cta} →
            </button>
          </div>
          <div className="hero-image">
            <div className="image-slider">
              {heroImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Garden project ${index + 1}`}
                  className={index === currentImageIndex ? "active" : ""}
                />
              ))}
            </div>
            <div className="slider-dots">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${index === currentImageIndex ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>{t.services.title}</h2>
            <p>{t.services.subtitle}</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <span className="service-icon">📋</span>
              <h3>{t.services.planning.title}</h3>
              <p>{t.services.planning.description}</p>
            </div>
            <div className="service-card">
              <span className="service-icon">🔨</span>
              <h3>{t.services.execution.title}</h3>
              <p>{t.services.execution.description}</p>
            </div>
            <div className="service-card">
              <span className="service-icon">🌿</span>
              <h3>{t.services.consulting.title}</h3>
              <p>{t.services.consulting.description}</p>
            </div>
            <div className="service-card">
              <span className="service-icon">🚜</span>
              <h3>{t.services.excavation.title}</h3>
              <p>{t.services.excavation.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2>{t.projects.title}</h2>
            <p>{t.projects.subtitle}</p>
          </div>
          <div className="projects-grid">
            {projectCategories.map((category) => (
              <div
                key={category.id}
                className="project-card"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="project-card-image">
                  <img src={category.image} alt={category.title} />
                  <div className="project-overlay">
                    <h3>{category.title}</h3>
                  </div>
                </div>
                <div className="project-card-content">
                  <h3>{category.title}</h3>
                  <p>{language === "de" ? "Ansehen" : "View"} →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <h2>{t.about.title}</h2>
            <p>{t.about.description}</p>
          </div>
          <div className="about-image">
            <img
              src="/attached_assets/20220617_154904_1753981487978.jpg"
              alt="About us"
            />
          </div>
        </div>
      </section>

      <section id="contact-form" className="contact-form-section">
        <div className="container">
          <div className="contact-form-wrapper">
            <div className="contact-form-header">
              <h2>{t.contact.form.title}</h2>
              <p className="contact-subtitle">{t.contact.subtitle}</p>
              <div className="contact-info-cards">
                <div className="info-card">
                  <span className="info-icon">📞</span>
                  <h4>{t.contact.phone}</h4>
                  <p>(+49) 15253374287</p>
                </div>
                <div className="info-card">
                  <span className="info-icon">✉️</span>
                  <h4>{t.contact.email}</h4>
                  <p>info@ks-team.org</p>
                </div>
                <div className="info-card">
                  <span className="info-icon">📍</span>
                  <h4>{t.contact.address}</h4>
                  <p>Krusenhof 110 B, 45731 Waltrop</p>
                </div>
              </div>
            </div>

            <div className="contact-form-body">
              <form className="modern-contact-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder={t.contact.form.name}
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    disabled={formStatus.loading}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder={t.contact.form.email}
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    disabled={formStatus.loading}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t.contact.form.phone}
                    value={formData.phone}
                    onChange={handleFormChange}
                    disabled={formStatus.loading}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder={t.contact.form.project}
                    rows="5"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    disabled={formStatus.loading}
                    className="form-input"
                  ></textarea>
                </div>
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleFormChange}
                  style={{ display: "none" }}
                  tabIndex="-1"
                  autoComplete="off"
                />
                {formStatus.error && (
                  <div className="form-message error-message">
                    {formStatus.error}
                  </div>
                )}
                {formStatus.success && (
                  <div className="form-message success-message">
                    {language === "de"
                      ? "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet."
                      : "Thank you! Your message has been sent successfully."}
                  </div>
                )}
                <button
                  type="submit"
                  className="form-submit-button"
                  disabled={formStatus.loading}
                >
                  {formStatus.loading ? (
                    <>
                      <span className="spinner"></span>
                      {language === "de" ? "Wird gesendet..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      {t.contact.form.send}
                      <span className="button-arrow">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {selectedCategory && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCategory(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedCategory.title}</h3>
              <button
                className="close-button"
                onClick={() => setSelectedCategory(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="gallery-grid">
                {selectedCategory.images.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img
                      src={image}
                      alt={`${selectedCategory.title} ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} KS Garten und Landschaftsbau. Alle
            rechts vorhanden.
          </p>
        </div>
      </footer>
    </div>
  );
}
