import Card from "../components/Card";

function Favorites({ items, onAddToFavorite }) {

    return (
        <div className="content p-40">
        <div className="d-flex aligh-center justify-between mb-40">
          <h1>Мої закладки</h1>
         
        </div>
        <div className="d-flex flex-wrap">
            {items && items.length > 0 ? (
        items.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                favorited={true}
                onFavorite={() => onAddToFavorite(item)}
              />
            ))
        )
        :
        (
            <div className="favorites-none d-flex justify-center aligh-center">
        <h2>Тут нічого немає</h2>
        </div>
        )
    }
        </div>
      </div>
    )
}

export default Favorites;