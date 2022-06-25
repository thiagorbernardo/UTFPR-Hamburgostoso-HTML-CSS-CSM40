const updateCart = (id, quantity) => {
    let cart = sessionStorage.getItem('cart');
    if (!cart) {
        sessionStorage.setItem('cart', JSON.stringify([]));
        cart = sessionStorage.getItem('cart');
    }
    cart = JSON.parse(cart);

    let product = cart.find(p => p.id === id);

    if (product) {
        if (!quantity) {
            product.quantity++;
        }
        else if (quantity === 0) {
            cart = cart.filter(p => p.id !== id);
        } else {
            product.quantity = quantity;
        }
    } else {
        cart.push({
            id,
            quantity: quantity || 1
        });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));

    const newLength = cart.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity,
        0
    );

    sessionStorage.setItem('cartLength', newLength);
}

const clearCart = () => {
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('cartLength');
}

const getCartLength = () => {
    return sessionStorage.getItem('cartLength') || 0;
}

const updateOrder = (id) => {
    sessionStorage.setItem('order', id);
}

