import { useState } from "react";

export default function Categories({ items, onClick }) {
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
                  onClick(item);
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
}
