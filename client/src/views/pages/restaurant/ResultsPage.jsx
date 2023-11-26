import { Link } from "react-router-dom";
export default function ResultsPage ({ results }) {
    return (
      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((result) => (
              <li><Link to={`/restaurants/${result._id}`} style={{cursor: 'pointer'}}>{result.nom}</Link></li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    );
};
  
