"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Sun,
  Moon,
  Briefcase,
  GraduationCap,
  Code,
} from "lucide-react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiCplusplus,
  SiTailwindcss,
  SiGraphql,
  SiFramer,
  SiGithub,
  SiFigma,
  SiNextdotjs,
  SiLeetcode,
} from "react-icons/si";
import ProjectCard from "./ProjectCard/page";
import { FaBolt, FaCode, FaGlobe, FaBook, FaAward } from "react-icons/fa";

// --- Custom Style for Animations ---
const CustomStyles = () => (
  <style jsx global>{`
    @keyframes float {
      0% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-25px) rotate(180deg);
      }
      100% {
        transform: translateY(0px) rotate(360deg);
      }
    }
    .float-1 {
      animation: float 8s ease-in-out infinite;
    }
    .float-2 {
      animation: float 12s ease-in-out infinite reverse;
    }
    .float-3 {
      animation: float 10s ease-in-out infinite;
    }

    @keyframes background-pan {
      0% {
        background-position: 0% center;
      }
      100% {
        background-position: -200% center;
      }
    }
    .animated-gradient-text {
      background-size: 200%;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      animation: background-pan 5s linear infinite;
    }
    .project-card::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 0.75rem; /* 12px */
      padding: 1px;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0)
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      z-index: 0;
      transition: background 0.3s;
    }
    .project-card:hover::before {
      background: linear-gradient(
        135deg,
        rgba(167, 139, 250, 0.5),
        rgba(129, 140, 248, 0.3)
      );
    }
    body.dark {
      --cursor-color: #fff;
    }
    body:not(.dark) {
      --cursor-color: #000;
    }
  `}</style>
);

// --- Main App Component ---
export default function App() {
  const [theme, setTheme] = useState("dark");


  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-gray-800 dark:text-gray-200 font-sans antialiased transition-colors duration-500">
      <CustomCursor />
      <CustomStyles />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-[#111827] dark:via-[#0A0A0A] dark:to-[#1F2937]"></div>
        <div className="relative z-10">
          <Header toggleTheme={toggleTheme} currentTheme={theme} />
          <main className="container mx-auto px-6 md:px-12">
            <HeroSection />
            <AboutMeSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Custom Components & Hooks ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 border-2 border-[var(--cursor-color)]"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
    />
  );
};

const AnimatedSection = ({ children, id }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
      className="py-24 md:py-32"
    >
      {children}
    </motion.section>
  );
};

const GradientButton = ({ href, children, as = "a" }) => {
  const MotionComponent = motion[as];
  return (
    <MotionComponent
      href={as === "a" ? href : undefined}
      type={as === "button" ? "submit" : undefined}
      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full inline-block text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.1, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </MotionComponent>
  );
};

// --- Page Sections ---
const Header = ({ toggleTheme, currentTheme }) => {
  // ... (Header component remains largely the same)
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [activeSection, setActiveSection] = useState("about");

useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const handleScroll = () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });
    setActiveSection(current);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <header
  className={`sticky top-0 z-50 transition-all duration-300 ${
    isScrolled
      ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
      : "bg-white/50 dark:bg-gray-900/50 backdrop-blur-md"
  }`}
>

      <nav className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <motion.a
          href="#"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 animated-gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          Sahil Gupta
        </motion.a>
        <div className="hidden md:flex items-center space-x-8">
          {["about", "projects", "skills", "contact"].map((item) => (
  <a
    key={item}
    href={`#${item}`}
    className={`capitalize relative text-lg group transition-colors duration-300 ${
      activeSection === item
        ? "text-indigo-500 font-semibold"
        : "text-gray-800 dark:text-gray-200"
    }`}
  >
    {item}
    <span
      className={`absolute bottom-0 left-0 h-0.5 bg-indigo-500 transition-all duration-300 ${
        activeSection === item ? "w-full" : "w-0 group-hover:w-full"
      }`}
    ></span>
  </a>
))}

        </div>
      </nav>
    </header>
  );
};

const BackgroundShapes = () => (
  <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-200 dark:bg-indigo-900 rounded-full filter blur-2xl float-1"></div>
    <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-200 dark:bg-purple-900 rounded-full filter blur-3xl float-2"></div>
    <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-cyan-200 dark:bg-cyan-900 rounded-full filter blur-2xl float-3"></div>
  </div>
);

const HeroSection = () => {
  /* ... (HeroSection remains the same) */
  const title = "Building Digital Experiences";
  const words = title.split(" ");
  const titleVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center text-center relative -mt-16">
      <BackgroundShapes />
      <motion.div
        className="relative z-10"
        initial="hidden"
        animate="visible"
        variants={titleVariants}
      >
        <p className="text-lg md:text-xl text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
          Hi, my name is
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent text-6xl font-bold">
            Sahil Gupta
          </div>
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          variants={wordVariants}
          className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400 mb-8"
        >
          I specialize in creating modern, responsive, and user-friendly web
          applications. Passionate about clean code and great user experiences.
        </motion.p>
        <motion.div variants={wordVariants}>
          <GradientButton href="#contact">Get In Touch</GradientButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

const AboutMeSection = () => {
  const points = [
    {
      icon: <FaBolt className="text-indigo-400" />,
      text: "Final Year Computer Science Engineering undergrad at Vivekananda Global University, Jaipur.",
    },
    {
      icon: <FaCode className="text-indigo-400" />,
      text: "Strong problem-solving skills — solved 800+ DSA problems across LeetCode, HackerEarth, and other platforms.",
    },
    {
      icon: <FaGlobe className="text-indigo-400" />,
      text: "Passionate Web Developer with experience in creating full-stack applications using modern technologies.",
    },
    {
      icon: <FaBook className="text-indigo-400" />,
      text: "Maintaining 8.5+ CGPA with deep knowledge of OOPs, Operating Systems, and DBMS.",
    },
  ];

  return (
    <AnimatedSection id="About">
      <h2 className="text-4xl font-bold text-center mb-14">
        <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          About Me
        </span>
      </h2>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-4 sm:px-8">
        {/* Profile Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative">
            <div className="w-80 h-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-72 h-72 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/sahil.jpeg"
                  alt="Sahil Gupta"
                  className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <FaCode className="text-2xl text-gray-800" />
            </div>
          </div>
        </motion.div>

        {/* Text Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-lg rounded-3xl p-10 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500">
            <h3 className="text-3xl font-semibold mb-4 text-white">
              👋 Hi, I'm{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">
                Sahil Gupta
              </span>
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed">
              I’m a passionate <b>Full-Stack Developer</b> and Final Year CSE
              student who enjoys building elegant, scalable, and interactive web
              applications. I focus on writing clean, optimized, and
              maintainable code to create real-world impact.
            </p>

            <div className="mt-6 space-y-4">
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
                  whileHover={{ x: 6 }}
                >
                  <div className="flex-shrink-0 text-xl">{point.icon}</div>
                  <p className="text-gray-200">{point.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-5">
              <motion.a
                href="/sg_resume.pdf"
                download="Sahil_Gupta_Resume.pdf"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </motion.a>

              <motion.a
                href="#contact"
                className="border-2 border-indigo-500 text-indigo-400 font-semibold py-3 px-8 rounded-full inline-flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

const TimelineItem = ({ event, left }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const slideIn = {
    hidden: { x: left ? -100 : 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={ref}
      className={`mb-8 flex justify-between items-center w-full ${
        left ? "flex-row-reverse" : ""
      }`}
    >
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full">
        <div className="mx-auto text-white">{event.icon}</div>
      </div>
      <motion.div
        className="order-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4"
        variants={slideIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400">
          {event.date}
        </p>
        <h3 className="mb-3 font-bold text-gray-800 dark:text-white text-xl">
          {event.title}
        </h3>
        <p className="text-sm leading-snug tracking-wide text-gray-600 dark:text-gray-400">
          {event.description}
        </p>
      </motion.div>
    </div>
  );
};

const Projectcard = ({ project }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      variants={itemVariants}
      className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden group project-card"
    >
      <div
        className="p-6 flex-grow flex flex-col relative z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-end items-center space-x-4 pt-4">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 transition-colors"
          >
            <Github />
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 transition-colors"
          >
            <ExternalLink />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      title: "Get Me a Chai",
      description:
        "A crowdfunding platform for creators to raise funds, interact with supporters. Built with modern web technologies and responsive design.",
      tags: ["Next.js", "MongoDB", "Tailwind CSS", "Next-Auth"],
      liveUrl: "https://get-me-a-chai-steel.vercel.app/",
      repoUrl: "https://github.com/SahilGupta893/GET-ME-A-CHAI",
      image: "/chai.png",
    },
    {
      title: "Password Manager",
      description:
        "A secure browser-based password manager built in React with file persistence. Features encryption, secure storage, and cross-platform compatibility.",
      tags: ["React", "File Handling", "Security", "MongoDB"],
      liveUrl: "https://pass-op-password-manager-six.vercel.app/",
      repoUrl: "https://github.com/SahilGupta893/PassOp---Password-Manager",
      image: "/pass.png",
    },
    {
      title: "File Compression Tool",
      description:
        "File Compression Tool built using huffman coding algorithm. Compress and decompress files directly in your browser with a user-friendly interface.",
      tags: ["React", "Node.js", "C++", "Vite"],
      liveUrl: "https://file-compression-tool-iota.vercel.app/",
      repoUrl: "https://github.com/SahilGupta893/File-Compression-Tool",
      image: "/file.png",
    },
  ];

  return (
    <AnimatedSection id="projects">
      <motion.h2
        variants={itemVariants}
        className="text-4xl font-bold text-center mb-16"
      >
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          My Projects
        </span>
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
};

const SkillsSection = () => {
  const allSkills = [
    {
      icon: <SiHtml5 size={50} color="#e34f26" />,
      name: "HTML5",
      category: "Frontend",
    },
    {
      icon: <SiCss3 size={50} color="#1572B6" />,
      name: "CSS3",
      category: "Frontend",
    },
    {
      icon: <SiJavascript size={50} color="#f7df1e" />,
      name: "JavaScript",
      category: "Frontend",
    },
    {
      icon: <SiReact size={50} color="#61dafb" />,
      name: "React",
      category: "Frontend",
    },
    {
      icon: <SiNextdotjs size={50} color="#000" />,
      name: "Next.js",
      category: "Frontend",
    },
    {
      icon: <SiTailwindcss size={50} color="#38bdf8" />,
      name: "Tailwind CSS",
      category: "Frontend",
    },
    {
      icon: <SiBootstrap size={50} color="#7952b3" />,
      name: "Bootstrap",
      category: "Frontend",
    },
    {
      icon: <SiNodedotjs size={50} color="#339933" />,
      name: "Node.js",
      category: "Backend",
    },
    {
      icon: <SiExpress size={50} color="#000" />,
      name: "Express.js",
      category: "Backend",
    },
    {
      icon: <SiMongodb size={50} color="#4DB33D" />,
      name: "MongoDB",
      category: "Backend",
    },
    {
      icon: <SiGraphql size={50} color="#e535ab" />,
      name: "GraphQL",
      category: "Backend",
    },
    {
      icon: <SiGithub size={50} color="#181717" />,
      name: "Git & GitHub",
      category: "Tools",
    },
    {
      icon: <SiFigma size={50} color="#f24e1e" />,
      name: "Figma",
      category: "Tools",
    },
    {
      icon: <SiFramer size={50} color="#0055ff" />,
      name: "Framer Motion",
      category: "Tools",
    },
    {
      icon: <SiCplusplus size={50} color="#00599C" />,
      name: "C++",
      category: "Others",
    },
  ];

  return (
    <AnimatedSection id="skills">
      <motion.h2
        variants={itemVariants}
        className="text-4xl font-bold text-center mb-4"
      >
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          My Skills
        </span>
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-center text-gray-400 mb-12"
      >
        Technologies I work with to bring ideas to life
      </motion.p>

      {/* Skills Cloud/Tags */}
      <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 p-8">
          {allSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group relative"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20">
                <div className="flex flex-col items-center gap-3">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {skill.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div variants={itemVariants} className="mt-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/30 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
              800+
            </div>
            <div className="text-gray-300 font-semibold flex items-center justify-center gap-2">
              <FaCode className="text-indigo-400" />
              DSA Problems Solved
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/30 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
              8.5+
            </div>
            <div className="text-gray-300 font-semibold flex items-center justify-center gap-2">
              <FaBook className="text-indigo-400" />
              CGPA Academic Record
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/30 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
              10+
            </div>
            <div className="text-gray-300 font-semibold flex items-center justify-center gap-2">
              <FaGlobe className="text-indigo-400" />
              Projects Developed
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
};

// NEW: ContactSection with a form
const ContactSection = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    // Mock API call
    setTimeout(() => {
      setStatus("Message Sent!");
    }, 2000);
  };

  return (
    <AnimatedSection id="contact">
      <motion.h2
        variants={itemVariants}
        className="text-4xl font-bold text-center mb-6"
      >
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 animated-gradient-text">
          Get In Touch
        </span>
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-lg text-center max-w-2xl mx-auto text-gray-600 dark:text-gray-400 mb-12"
      >
        Have a project in mind or just want to say hi? I'd love to hear from
        you.
      </motion.p>
      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-6"
      >
        <div className="flex gap-6">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <textarea
          placeholder="Your Message"
          required
          rows="5"
          className="w-full bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        ></textarea>
        <div className="text-center">
          {status ? (
            <p className="text-lg text-green-500">{status}</p>
          ) : (
            <GradientButton as="button">Send Message</GradientButton>
          )}
        </div>
      </motion.form>
    </AnimatedSection>
  );
};

const Footer = () => (
  <footer className="py-12 relative bg-gray-900/50 backdrop-blur-sm">
    <div className="container mx-auto px-6 md:px-12 text-center text-gray-600 dark:text-gray-400">
      <div className="flex justify-center space-x-8 mb-8">
        <motion.a
          href="https://github.com/SahilGupta893"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-500 transition-colors p-3 rounded-full hover:bg-indigo-500/10"
          whileHover={{ scale: 1.2, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Github size={32} />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/sahil-gupta-893"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-500 transition-colors p-3 rounded-full hover:bg-indigo-500/10"
          whileHover={{ scale: 1.2, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Linkedin size={32} />
        </motion.a>
        <motion.a
          href="https://twitter.com/sahilgupta893"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-500 transition-colors p-3 rounded-full hover:bg-indigo-500/10"
          whileHover={{ scale: 1.2, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Twitter size={32} />
        </motion.a>
        <motion.a
          href="mailto:guptasahil3284@gmail.com"
          className="hover:text-indigo-500 transition-colors p-3 rounded-full hover:bg-indigo-500/10"
          whileHover={{ scale: 1.2, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </motion.a>
        <motion.a
          href="https://leetcode.com/u/Sahil_04gupta/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-500 transition-colors p-3 rounded-full hover:bg-indigo-500/10"
          whileHover={{ scale: 1.2, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <SiLeetcode size={32} />
        </motion.a>
      </div>
      <div className="border-t border-gray-700 pt-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Sahil Gupta. All Rights Reserved.
        </p>
        <p className="text-xs mt-2 text-gray-500">
          Built with Next.js, React, and Framer Motion
        </p>
      </div>
    </div>
  </footer>
);
