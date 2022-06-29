const generateOrders = () => {
    getAllOrders().then(orders => {
        console.log(orders)
        const menu = document.getElementById('orders');
        const list = document.createElement('ul');
        orders.forEach(order => {
            const p = document.createElement('li');
            p.innerHTML = `<h2>${order.id}, ${order.nome}, ${order.time}</h2>`;

            list.appendChild(p);
        });

        menu.appendChild(list)
        return orders
    });
}