import PageTransition from "../components/PageTransition";

const Careers = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-20 bg-cinema-black">
        <h1 className="text-4xl font-bold text-white">Careers</h1>
        <p className="text-lg text-gray-300 mt-4">
          Explore exciting career opportunities in the film industry. Whether you're looking to work behind the scenes or in front of the camera, we have resources to help you navigate your career path.
        </p>
        <ul className="mt-6 space-y-4">
          <li className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-cinema-gold">Film Production Assistant</h2>
            <p className="text-gray-400">Assist in various production tasks on set. Great entry-level position for those looking to break into the industry.</p>
          </li>
          <li className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-cinema-gold">Screenwriter</h2>
            <p className="text-gray-400">Craft compelling stories for film and television. Join our community of writers and get feedback on your scripts.</p>
          </li>
          <li className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-cinema-gold">Director of Photography</h2>
            <p className="text-gray-400">Capture stunning visuals for film projects. Work closely with directors to bring their vision to life.</p>
          </li>
        </ul>
      </div>
    </PageTransition>
  );
};

export default Careers;
