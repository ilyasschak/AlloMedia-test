import  { useEffect, useState } from 'react';
import api from "../../api"
const Cart = () => {
  const [userPanier, setUserPanier] = useState(null);

  useEffect(() => {
    const getPanier = async () => {
      try {
        const response = await api.get('http://localhost:3000/api/cart/panier');
  
        setUserPanier(response.data);
        if (!response.ok) {
          throw new Error(`Failed to fetch cart data: ${response.status} - ${response.statusText}`);
        }
  
        const panierData = await response.json();
  
        console.log("panier", panierData);

        if (!panierData || !panierData.articles) {
          throw new Error('Invalid response format: Missing articles in Panier data');
        }
  
        setUserPanier(panierData);
      } catch (error) {
        console.error('Error getting Panier:', error.message);
      }
    };
  
    getPanier();
  }, []);
  
  console.log(userPanier);

  if (!userPanier) {
    return <p>Loading...</p>;
  }

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {userPanier ? (
          userPanier.articles.map((article) => (
            
            <div key={article.id} className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                {/* ... (existing code for image and buttons) */}
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-black mb-2">{article.Plat}</h2> 
                <p className="text-black text-sm mb-4">
                  {}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id
                  mauris malesuada tincidunt.
                </p>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-black">Price:</span>
                    <span className="text-black">{/* Use article price */}$29.99</span>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-bold text-black">Quantity :</span>
                  <div className="flex items-center mt-2">
                    {/* You can use article.quantity here */}
                    <button
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
                      {article.quantite}
                    </div>
                    <button
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
  
