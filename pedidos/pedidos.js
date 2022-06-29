const generateOrders = async () => {
    getAllOrders().then(orders => {
        console.log(orders)
        const menu = document.getElementById('orders');
        const list = document.createElement('ol');
        orders.forEach(order => {
            const p = document.createElement('li');
            p.innerHTML =
                 `<ul>
                    <li><h2>${order.id}, ${order.nome}, ${order.time}</h2></li> </br>
                    <li><h2>Endereço: ${order.rua}, ${order.numero} - ${order.cep}, ${order.cidade}, ${order.uf}</h2></li>
                
                 </ul>`;
            //Colocar a lista de produtos no pedido aqui
            list.appendChild(p);
        });

        return orders
    });
}