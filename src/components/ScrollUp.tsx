import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const ScrollUp = () => {
  const [show, setShow] = useState(false);
  const scrollPage = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const checkScroll = () => {
      const coords = window.innerHeight * 0.5;

      setShow(window.scrollY > coords);
    };
    document.addEventListener("scroll", checkScroll);
    return () => {
      document.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <Box
      onClick={scrollPage}
      sx={{
        position: "fixed",
        bottom: "7rem",
        right: "1rem",
        color: "rgba(234, 234, 234, 0.7)",
        backgroundColor: "#939999",
        borderRadius: "0.4rem",
        cursor: "pointer",
        opacity: 0.5,
        transition:
          "transform 0.5s ease-in-out, opacity 0.2s ease-in-out",
        transform: show ? "translateX(0)" : "translateX(300%)",
      }}
    >
      <KeyboardArrowUpIcon
        fontSize="large"
        sx={{ display: "block" }}
      />
    </Box>
  );
};
