import  { useEffect, useState } from 'react';
import api from "../../api"
const Cart = () => {
  const [userPanier, setUserPanier] = useState([]);

  useEffect(() => {
    const getPanier = async () => {
      try {
        const response = await api.get('http://localhost:3000/api/cart/panier');
        setUserPanier(response.data,"hiiii")
        console.log(response);
      } catch (error) {
        console.error('Error getting Panier:', error.message);
      }
    };
  
    getPanier();
  }, []);

  const incrementQuantity = (articleId) => {
    const updatedPanier = userPanier.map((article) => {
      if (article._id === articleId._id) {
        return {
          ...article,
          articles: [
            {
              ...article.articles[0],
              quantite: article.articles[0].quantite + 1,
            },
          ],
        };
      }
      return article;
    });
    console.log(updatedPanier);
    setUserPanier(updatedPanier);
  };

  const decrementQuantity = (articleId) => {
    // console.log(articleId._id);
    const updatedPanier = userPanier.map((article) => {
      if (article._id === articleId._id && article.articles[0].quantite > 0) {
        return {
          ...article,
          articles: [
            {
              ...article.articles[0],
              quantite: article.articles[0].quantite - 1,
            },
          ],
        };
      }
      return article;
    });

    setUserPanier(updatedPanier);
  };


  
  
  

  if (!userPanier) {
    return <p>Loading...</p>;
  }

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {userPanier && userPanier.length > 0 ? (
          userPanier.map((article)=> (
 
            <div key={article._id} className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                  <img src="https://img.freepik.com/photos-gratuite/gros-plan-viande-rotie-sauce-legumes-frites-dans-assiette-table_181624-45712.jpg?t=st=1701094789~exp=1701095389~hmac=b452116c61d76ac6c51979c32118f460a545e0e9daf443886f951e90ba92f65e" alt="" /> 
             </div>
              <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-black mb-2">{article.articles[0].article?.Plat}</h2> 
                <p className="text-black text-sm mb-4">
                {article.articles[0].article?.description}
                </p>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-black">Price:</span>
                    <span className="text-black">{/* Use article price */}${article.articles[0].article?.prix}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-bold text-black">Quantity :</span>
                  <div className="flex items-center mt-2">
                    <button
                     onClick={() => decrementQuantity(article)}
                      className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                    {article.articles[0]?.quantite}                    </div>
                    <button
                      onClick={() => incrementQuantity(article)}
                      className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
  }; // This closing parenthesis was missing
  
  export default Cart;
  
