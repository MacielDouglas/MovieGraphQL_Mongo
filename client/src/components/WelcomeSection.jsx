import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function WelcomeSection({ movies }) {
  const [randomIndex, setRandomIndex] = useState(33);
  const [blurredImage, setBlurredImage] = useState("");
  const [isImageVisible, setIsImageVisible] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = Math.floor(Math.random() * movies.length);
      setRandomIndex(newIndex);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [movies]);

  useEffect(() => {
    if (window.innerWidth >= 850) {
      setIsImageVisible(true);
    }

    const handleResize = () => {
      if (window.innerWidth >= 850) {
        setIsImageVisible(true);
      } else {
        setIsImageVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // if (isImageVisible) {
    const img = new Image();
    img.src = movies[randomIndex]?.poster;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);

      const blurredImageUrl = canvas.toDataURL();
      setBlurredImage(blurredImageUrl);
    };
    // }
  }, [movies, randomIndex, isImageVisible]);

  const backgroundStyle = {
    backgroundImage: `url(${blurredImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    color: "#fff",
  };

  return (
    <div className="">
      {/* Elemento de fundo */}
      <div
        style={backgroundStyle}
        id="back"
        className="brightness-50 blur-sm relative inset-0 z-10 h-[500px] md:h-[600px] mmd:min-h-screen"
      ></div>

      {/* Elemento da frente */}
      <div
        className="absolute text-white w-full  flex flex-col md:flex-row z-10 top-44 mmd:top-24 xl:top-32"
        id="front"
      >
        <div className="flex-1 flex flex-col justify-center gap-2 ml-40 mb-8 md:mb-0">
          <h1 className="text-6xl font-semibold mb-4 font-lobster">
            Welcome to About Films
          </h1>
          <h3 className="mb-4 text-2xl text-neutral-300 font-poppins">
            Here you search and find out about the best films
          </h3>
          <p className="mb-4 text-xl text-neutral-300 font-roboto">
            From 1930 to 2015
          </p>
        </div>
        {isImageVisible && (
          <div className="flex-1 flex justify-center">
            <img
              src={movies[randomIndex]?.poster}
              alt={movies[randomIndex]?.title}
              className="h-[32rem] mx-auto rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}

WelcomeSection.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default WelcomeSection;
