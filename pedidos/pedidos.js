const generateOrders = () => {
    getAllOrders().then(orders => {
        console.log(orders)
        const menu = document.getElementById('orders');
        const list = document.createElement('ol');
        orders.forEach(order => {
            const p = document.createElement('li');
            const listItems = document.createElement('ul');
            listItems.class = "list-group";
            p.innerHTML =
            `
            <li class="list-group-item active">ID Pedido: ${order.id}</li>
            <li class="list-group-item">Pedido feito por: ${order.nome} às ${order.time}</li>
            <li class="list-group-item">Endereço: ${order.rua}, ${order.numero} - ${order.cep} (${order.cidade}, ${order.uf})</li>
        
    
          </br>
            
              
            </br></br>`;
        listItems.appendChild(p);
            getOrderItems(order.id).then(itens=> {
                const listItems = document.getElementById('')
                itens.forEach(item => {
                    const a = document.createElement('div');
                    a.innerHTML = `<li class="list-group-item>${item.produto} x${item.qtd}"`
                    listItems.appendChild(a);
                })
            })

            menu.appendChild(listItems);
        });

        menu.appendChild(list)
        return orders
    });
}