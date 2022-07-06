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

        const time = new Date(order.time)

        let total = 0;
        const menu = document.getElementById('orders');
        const div = document.createElement('div');
        const listItems = document.createElement('ul');

        listItems.class = "list-group";
        div.innerHTML = `
            <li class="list-group-item-dark">ID Pedido: ${order.id}</li>
            <li class="list-group-item">Pedido feito por: ${order.nome} em ${time.toLocaleString('pt-BR')}</li>
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
                total += item.qtd * product.preco;
            })
            const li = document.createElement('li');
            li.className = "list-group-item";
            li.innerHTML = `Total: ${formatter.format(total)}`
            listItems.appendChild(li);

            const li2 = document.createElement('li');
            li2.className = "list-group-item";

            const button = document.createElement('button');
            button.className = "btn btn-primary"
            button.type = "button"
            button.onclick = () => {
                window.location.href = `http://loja.buiar.com/?key=s7ueaj&c=boleto&t=listar&id=${orderId}`;
            }
            button.innerHTML = `Gerar Boleto`
            li2.appendChild(button);

            listItems.appendChild(li2);

            menu.appendChild(listItems);

        })
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