import  { useEffect, useState } from 'react';
import api from "../../api"
const Cart = () => {
  const [userPanier, setUserPanier] = useState([]);
  let total = 0;

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
  userPanier.forEach((article) => {
    total += article.articles[0].article?.prix * article.articles[0]?.quantite;
  });

  return (
      <div>
      <body className="bg-gray-100">
  <div className="container mx-auto mt-10">
    <div className="flex shadow-md my-10">
      <div className="w-3/4 bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          <h2 className="font-semibold text-2xl">{userPanier.length} Items</h2>
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
        </div>
        
        {userPanier && userPanier.length > 0 ? (
          userPanier.map((article)=> (
            
        <div key={article._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          <div className="flex w-2/5">
            <div className="w-20">
              <img className="h-24" src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z" alt=""/>
            </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">{article.articles[0].article?.Plat}</span>
              <span className="text-red-500 text-xs w-[250px]">{article.articles[0].article?.description}</span>
              <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
            </div>
          </div>
          <div className="flex justify-center w-1/5">

          <button  onClick={() => decrementQuantity(article)}
       className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
               >
            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </button>
           <span className="text-black px-3">{article.articles[0]?.quantite}</span>
           <button
                      onClick={() => incrementQuantity(article)}
                      className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                    >
            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
           </button>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">${article.articles[0].article?.prix}</span>
          <span className="text-center w-1/5 font-semibold text-sm">${(article.articles[0].article?.prix * article.articles[0]?.quantite).toFixed(2)}</span>
        </div>
          ))
          ) : (
            <p>Loading...</p>
          )}
        <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
      
          <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
          Continue Shopping
        </a>
      </div>

      <div id="summary" className="w-1/4 px-8 py-10">
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</body>
    </div> 
  );
  }; 
  
  export default Cart;
  
