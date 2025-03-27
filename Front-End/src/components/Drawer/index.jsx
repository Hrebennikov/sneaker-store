import { useEffect, useState } from "react";

function Drawer({ onClose, onRemove, priceAllProducts, items = [] }) {
  const [taxValue, setTaxValue] = useState(0);
  const [totalPrice, setTotalPrice] = useState(priceAllProducts);

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  }, [items]);

  useEffect(() => {
    const tax = totalPrice * 0.05;
    setTaxValue(Math.round(tax));
  }, [totalPrice]);

  const taxPlusProducts = totalPrice + taxValue;

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина{" "}
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          <div style={{ flex: 1, overflow: "auto" }}>
            <div style={{ flex: 1 }}>
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} ₴</b>
                  </div>
                  <img
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>
            <div className="items">
              <div className="cartTotalBlock">
                <ul>
                  <li className="d-flex">
                    <span>За товар:</span>
                    <div></div>
                    <b>{totalPrice} ₴</b>
                  </li>
                  <li className="d-flex">
                    <span>Податок 5%:</span>
                    <div></div>
                    <b>{taxValue} ₴</b>
                  </li>
                  <li className="d-flex">
                    <span>Всьго:</span>
                    <div></div>
                    <b>{taxPlusProducts} ₴</b>
                  </li>
                </ul>
                <button className="greenButton">
                  Сформувати замовлення <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width={120}
              height={120}
              src="/img/cartEmpty.jpg"
              alt=""
            />
            <h2>Корзина пуста</h2>
            <p className="opacity-6">
              Додайте хоча б одну пару кросівок, щоб зробити замовлення!
            </p>
            <button onClick={onClose} className="greenButton">
              <img src="/img/arrow.svg" alt="Arrow" />
              Повернутись назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
