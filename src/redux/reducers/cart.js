const initialState = {
  items: {},
  totalPrice: 0, //итоговая стоимость
  totalCount: 0, // количество пицц
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split(".");
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_CART": {
      const currentPizzaItems = !state.items[action.payload.id] //если нет объекта с данным ключом (может быть несколько одинаковых пицц)
        ? [action.payload] //то создать новый
        : [
            //или если есть дополнить его
            ...state.items[action.payload.id].items, //берет старый массив по ключу (по одному ключу может быть несколько пицц), если он был
            action.payload, // добавляет в массив пицц новые значения
          ];
      const newItems = {
        ...state.items, //сначала берем весь массив с товарами
        // в свойстве items создаем новый объект или дополняет, если уже существует
        //для создания динамического свойства оборачивает в []
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      // const allPizzas = Object.values(newItems).flat();

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state, //берем весь стэйт
        items: newItems,
        totalCount,
        totalPrice,

        // totalCount: allPizzas.length,
        // totalPrice: allPizzas.reduce((sum, obj) => {
        //   /*   return obj.price + sum; */
        //   return obj.items[0].price + sum;
        // }, 0),
        //[].concat.apply([], Object.values(newItems)).length хак для объединения значений объекта
      };
    }

    case "REMOVE_CART_ITEM": {
      //из объекта удаление ключа через delete будет мутировать объект.
      // чтобы не мутировать стэйт делаем копию объекта
      const newItems = {
        ...state.items, //это не глубокое клонирование, но с примитивными значениями внутри объекта работает
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case "PLUS_CART_ITEM": {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "MINUS_CART_ITEM": {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems;
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "CLEAR_CART":
      return { totalPrice: 0, totalCount: 0, items: {} };

    default:
      return state;
  }
};

export default cart;
