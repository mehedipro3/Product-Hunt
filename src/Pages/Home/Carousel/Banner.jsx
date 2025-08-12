import  { useState } from "react";

const Banner = () => {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });

  return (
    <div
      className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      onMouseLeave={() => {
        setPosition({ x: -9999, y: -9999 });
      }}
    >
      {/* Strong dark overlay with spotlight lighter circle */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-200"
        style={{
          background: `radial-gradient(circle 180px at ${position.x}px ${position.y}px, rgba(0,0,0,0.2), rgba(0,0,0,0.85))`,
        }}
      ></div>

      {/* Text content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
          Discover the Innovation of Tomorrow
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto drop-shadow-md">
          Dive into the latest web apps, AI tools, and software that makers and enthusiasts just can’t stop talking about.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md font-semibold transition-shadow shadow-md hover:shadow-lg">
            Explore Now
          </button>
          <button className="border border-white hover:bg-white hover:text-gray-900 px-5 py-3 rounded-md font-semibold transition-shadow shadow-md hover:shadow-lg">
            Submit Your Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
