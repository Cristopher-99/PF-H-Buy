import React, { useEffect } from "react";
import Card from "../Card/Card";
import { useState } from "react";
import Paginate from "../Paginate/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/thunks";

const Cards = () => {
  

  const dispatch = useDispatch();
  const productos = useSelector(state => state.product.products);
  console.log(productos);

  const [pageCurrent, setPageCurrent] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(8);
  const indexLastCard = pageCurrent * cardsPerPage;
  const indexFirstCard = indexLastCard - cardsPerPage;
  const cardsCurrent = productos?.slice(indexFirstCard, indexLastCard);

  const paginado = (page) => {
    setPageCurrent(page);
  };
  const prev = (e) => {
    e.preventDefault();
    if (pageCurrent <= 1) {
      setPageCurrent(1);
    } else {
      setPageCurrent(pageCurrent - 1);
    }
  };
  const next = (e) => {
    e.preventDefault();
    if (productos.length < 9) return;
    else {
      setPageCurrent(pageCurrent + 1);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts())
  }, []);

  return (
    <div class="container">
      <div>
        <Paginate
          paginado={paginado}
          products={productos.length}
          cardsPerPage={cardsPerPage}
          pageCurrent={pageCurrent}
          cardsCurrent={cardsCurrent.length}
        />
      </div>
      <div class="row g-3 row-cols-3">
        {cardsCurrent.map((p) => {
          return (
            <div class="col">
              <Card
                key={p.id}
                id={p.id}
                img={p.img}
                name={p.name}
                price={p.price}
                calification={p.calification}
                categories={p.categories}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
