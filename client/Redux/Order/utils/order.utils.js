export const addItemToOrder = (existingContent, itemToAdd) => {
  const existingItem = existingContent.find(cartItem => {
    if (cartItem.id === itemToAdd.id) {
      return cartItem;
    }
  });
  if (existingItem) {
    return existingContent.map(cartitem => {
      return cartitem.id === existingItem.id
        ? { ...cartitem, quantity: cartitem.quantity + 1 }
        : cartitem;
    });
  }
  return [...existingContent, { ...itemToAdd, quantity: 1 }];
};

export const removeItemFromOrder = (existingContent, itemToRemove) => {
  const existingItem = existingContent.find(cartItem => {
    if (cartItem.id === itemToRemove.id) {
      return cartItem;
    }
  });
  if (existingItem) {
    if (existingItem.quantity === 1) {
      return existingContent.filter(cartItem => {
        return cartItem.id !== itemToRemove.id;
      });
    }
    if (existingItem.quantity > 1) {
      return existingContent.map(cartitem => {
        return cartitem.id === existingItem.id
          ? { ...cartitem, quantity: cartitem.quantity - 1 }
          : cartitem;
      });
    }
  }
  return [...existingContent];
};
