import React from "react";
import { Categories, SortPopup, PizzaBlock } from "../components";

const categoriesArr = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const sortArr = ["популярности", "цене", "алфавиту"];

function Home({ items }) {
  const onClick = (index) => {
    console.log(index);
  };
  return (
    <div className="container">
      <div className="content__top">
        <Categories items={categoriesArr} onClick={onClick} />
        <SortPopup items={sortArr} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.map((pizza) => {
          return <PizzaBlock key={pizza.id} {...pizza} />;
        })}
      </div>
    </div>
  );
}

export default Home;
