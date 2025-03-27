import { Link } from "react-router-dom";

function Header({onClickCart, priceAllProducts}) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" alt="Logotype" />
        <div>
          <h3 className="text-uppercase">Магазин кросівок</h3>
          <p className="opacity-5">Магазин кращих кросівок</p>
        </div>
      </div>
      </Link>
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-15 cu-p">
          <img width={18} height={18} src="/img/Cart.svg" alt="Кошик" />
          <span>{priceAllProducts ? `${priceAllProducts} ₴` : null}</span>
        </li>
        <li>
          <Link to="/favorites">
            <img
              className="mr-20 cu-p"
              width={18}
              height={18}
              src="/img/heart.svg"
              alt="Закладки"
            />
          </Link>
        </li>
        <li>
          <img
            className="cu-p"
            width={18}
            height={18}
            src="/img/User.svg"
            alt="Користувач"
          />
        </li>
      </ul>
    </header>
  );
}

export default Header;
