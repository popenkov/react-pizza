import React, { useCallback } from "react";
import { Categories, SortPopup, PizzaBlock } from "../components";

import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/actions/filter";

const categoriesArr = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const sortArr = [
  { name: "популярности", type: "popular" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "alphabet" },
];

function Home() {
  const items = useSelector(({ pizzas }) => pizzas.items);

  const dispatch = useDispatch();
  const onSelectCategory = useCallback((index) => {
    console.log(index);
    dispatch(setCategory(index));
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories items={categoriesArr} onSelectCategory={onSelectCategory} />
        <SortPopup items={sortArr} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {Boolean(items) &&
          items.map((pizza) => {
            return <PizzaBlock key={pizza.id} {...pizza} />;
          })}
      </div>
    </div>
  );
}

export default Home;
