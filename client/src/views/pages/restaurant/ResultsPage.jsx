import { Link } from "react-router-dom";
export default function ResultsPage ({ results }) {
    return (
      <div className="mt-8 mx-20">
        {results.length > 0 ? (
          <ul className="grid gap-4 cursor-pointer">
            {results.map((result) => (
              <Link to={`/restaurants/${result._id}`}>
                <li
                  key={result._id}
                  className="bg-white p-4 shadow-md rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <Link
                    to={`/restaurants/${result._id}`}
                    className="text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {result.nom}
                  </Link>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="w-full bg-red-100 p-32 rounded">
            <div className="text-center">
              <p className="text-black text-9xl ">No results found !</p>
            </div>
          </div>
        )}
      </div>
    );
};
  
