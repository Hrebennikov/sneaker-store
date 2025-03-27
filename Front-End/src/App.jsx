import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../src/components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import data from "./data";
import No from "./components/ппппп/No";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    // axios
    //   .get("https://6776fb9480a79bf91900b791.mockapi.io/items")
    //   .then((res) => {
    //     setItems(res.data);
    //   });
    axios
      .get("https://6776fb9480a79bf91900b791.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get("https://6776fb9480a79bf91900b791.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((cartObj) => cartObj.id === obj.id)) {
        await axios.delete(
          `https://6776fb9480a79bf91900b791.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) => prev.filter((cartObj) => cartObj.id !== obj.id));
      } else {
        await axios.post(
          "https://6776fb9480a79bf91900b791.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, obj]);
      }
    } catch {
      alert("Не вдалось додати у корзину");
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6776fb9480a79bf91900b791.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://6776fb9480a79bf91900b791.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((favObj) => favObj.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://6776fb9480a79bf91900b791.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не вдалось додати у фаворити");
    }
  };

  const reduce = cartItems.reduce((acc, b) => {
    return acc + b.price;
  }, 0)

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const getData = async () => {
    try {
      axios.get("localhost:3000/users")
    } catch (error) {
      console.log(error, "err");
    }
  }

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={(obj) => onRemoveItem(obj)}
          priceAllProducts={reduce}
        />
      )}

      <Header
        onClickCart={() => setCartOpened(true)}
        priceAllProducts={reduce}
      />
      <No />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              data={data}
            />
          }
        />
        <Route
          path="/favorites"
          exact
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
