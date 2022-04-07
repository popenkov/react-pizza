const initialState = {
  items: {},
  totalPrice: 0, //итоговая стоимость
  totalCount: 0, // количество пицц
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_CART": {
      const currentPizzaItems = !state.items[action.payload.id] //если нет объекта с данным ключом (может быть несколько одинаковых пицц)
        ? [action.payload] //то создать новый
        : [
            //или если есть дополнить его
            ...state.items[action.payload.id], //берет старый массив по ключу (по одному ключу может быть несколько пицц), если он был
            action.payload, // добавляет в массив пицц новые значения
          ];
      const newItems = {
        ...state.items, //сначала берем весь массив с товарами
        // в свойстве items создаем новый объект или дополняет, если уже существует
        //для создания динамического свойства оборачивает в []
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: "",
        },
      };

      const allPizzas = Object.values(newItems).flat();

      return {
        ...state, //берем весь стэйт
        items: newItems,

        totalCount: allPizzas.length,
        totalPrice: allPizzas.reduce((sum, obj) => {
          return obj.price + sum;
        }, 0),
        //[].concat.apply([], Object.values(newItems)).length хак для объединения значений объекта
      };
    }

    default:
      return state;
  }
};

export default cart;
