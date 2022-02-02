import React, { useState } from "react";

const Categories = React.memo(function Categories({ items, onSelectCategory }) {
  const [activeState, setActiveState] = useState(null);
  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => {
            setActiveState(null);
          }}
          className={activeState === null ? "active" : ""}
        >
          Все
        </li>
        {!!items &&
          items.map((item, index) => {
            return (
              <li
                className={activeState === index ? "active" : ""}
                onClick={() => {
                  onSelectCategory(index);
                  setActiveState(index);
                }}
                key={item}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
});

export default Categories;
