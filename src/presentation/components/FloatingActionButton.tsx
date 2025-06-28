import React, { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";

interface FloatingActionButtonProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  label?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon = <FiChevronUp className="text-black text-2xl" />,
  onClick = () => window.scrollTo({ top: 0, behavior: "smooth" }),
  label,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 640) {
        setVisible(window.scrollY > 100);
      } else {
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.body.offsetHeight - 200;
        setVisible(window.scrollY > 100 && scrollPosition >= threshold);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label={label || "Ação"}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/30 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      style={{ border: "none" }}
    >
      {icon}
    </button>
  );
};

export default FloatingActionButton;
