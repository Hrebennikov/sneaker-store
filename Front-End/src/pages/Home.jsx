import React from "react";
import Card from "../components/Card";

function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    data
}) {
    const products = data;
   
    return (
        <div className="content p-40">
        <div className="d-flex aligh-center justify-between mb-40">
          <h1>
            {searchValue ? `Пошук по запиту: "${searchValue}"` : "Всі кросівки"}
          </h1>
          <div className="search-block d-flex">
            <img
              onClick={() => setSearchValue("")}
              src="/img/search.svg"
              alt="Search"
            />
            <input
              onChange={onChangeSearchInput}
              type="search"
              value={searchValue}
              placeholder="Пошук..."
            />
          </div>
        </div>
        {/* Cards */}
        <div className="d-flex flex-wrap justify-center">
          {products
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card
                key={item.id}
                title={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={() => onAddToCart(item)}
              />
            ))}
        </div>
      </div>
    )
}

export default Home;