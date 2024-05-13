import { useEffect, useState } from "react";

export default function Carousel({images}){
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);


  const nextImage = () => {
      setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };


  return (
    <div className="items-center w-full h-60 overflow-hidden shadow-lg rounded-md flex justify-center">
      <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)`, border: "0.5px solid #C4B098" }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            className="w-full max-h-full object-cover"
            style={{ flex: '0 0 100%', minWidth: '100%' }}
          />
        ))}
      </div>
    </div>
  );
};

