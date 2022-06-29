const generateOrders = async () => {
    const orderId = sessionStorage.getItem("order");

    const products = await getAllProducts();

    console.log(products)

    getOrder(orderId).then(orders => {
        console.log(orders)

        const order = orders.find((order) => order.id == orderId);

        if (!order) {
            alert("Pedido não encontrado")
            return
        }
        console.log(order)

        const menu = document.getElementById('orders');
        const div = document.createElement('div');
        const listItems = document.createElement('ul');

        listItems.class = "list-group";
        div.innerHTML = `
            <li class="list-group-item-dark">ID Pedido: ${order.id}</li>
            <li class="list-group-item">Pedido feito por: ${order.nome} às ${order.time}</li>
            <li class="list-group-item">Endereço: ${order.rua}, ${order.numero} - ${order.cep} (${order.cidade}, ${order.uf})</li>
           `;
        listItems.appendChild(div);


        getOrderItems(orderId).then(itens => {
            const itensByOrder = itens.filter((item) => item.pedido == orderId);
            console.log(itensByOrder)

            itensByOrder.forEach(item => {
                const li = document.createElement('li');
                li.className = "list-group-item";
                const product = products.find((product) => product.id == item.produto); 
                console.log(product)
                li.innerHTML = `${product.nome} x ${+item.qtd}: ${formatter.format(item.qtd * product.preco)}`
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