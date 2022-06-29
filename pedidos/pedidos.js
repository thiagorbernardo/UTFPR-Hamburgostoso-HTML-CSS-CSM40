const generateOrders = async () => {
    getAllOrders().then(orders => {
        console.log(orders)
        const menu = document.getElementById('orders');

        orders.forEach(order => {
            const a = document.createElement('a');
            a.className = "card";
            a.href = `products.html?id=${order.id}&name=${order.nome}`;
            a.innerHTML = `<h2>${order.nome}</h2>
            <p>${order.id}</p>`;
            menu.appendChild(a);
        });

        return orders
    });
}