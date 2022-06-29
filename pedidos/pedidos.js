const generateOrders = () => {
    const orderId = sessionStorage.getItem("order");

    getOrder(orderId).then(orders => {
        console.log(orders)

        const order = orders.find((order) => order.id == orderId);

        console.log(order)

        const menu = document.getElementById('orders');
        const div = document.createElement('div');
        const listItems = document.createElement('ul');

        listItems.class = "list-group";
        div.innerHTML = `
            <li class="list-group-item-dark">ID Pedido: ${order.id}</li>
            <li class="list-group-item">Pedido feito por: ${order.nome} às ${order.time}</li>
            <li class="list-group-item">Endereço: ${order.rua}, ${order.numero} - ${order.cep} (${order.cidade}, ${order.uf})</li>
            </br>
            </br></br>
           `;
        listItems.appendChild(div);


        getOrderItems(orderId).then(itens => {
            const itensByOrder = itens.filter((item) => item.pedido == orderId);
            console.log(itensByOrder)

            itens.forEach(item => {
                const li = document.createElement('li');
                li.className = "list-group-item";
                li.innerHTML = `${item.produto} x${item.qtd}`
                listItems.appendChild(li);
            })
        })

        menu.appendChild(listItems);
    });
}

const setOrderId = () => {
    const orderId = document.forms.orderForm[0].value

    if (!orderId) {
        alert("Por favor, informe o ID do pedido")
        return
    }

    sessionStorage.setItem("order", orderId);

    generateOrders();
}