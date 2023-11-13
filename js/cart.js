document.addEventListener('DOMContentLoaded', async () => {
    const getCartList = JSON.parse(localStorage.getItem('cart')) || [];
    const containerCartList = document.getElementById('container-articles');
    const mainPagesCart= document.querySelector('.container-order-shop');
    const containerImgEmpty= document.querySelector('.container-img-empty');
    const counterMobile = document.querySelector('.counter-mobile');
    const counterDesktop = document.querySelector('.counter-desktop');
    const drawCart = async (dataCart) => {
        dataCart.forEach(product => {
            const article = document.createElement('article');
            article.innerHTML = `
                <div class="box-img-description-stock">
                    <img src="../${product.images}" alt="img-1">
                    <div class="box-text-articles">
                        <h3 class="title-articles">${product.name}</h3>
                        <p class="character-article">${product.character}</p>
                    </div>
                    <div class="box-plus-minus">
                        <i class="fa-solid fa-plus" id="${product.id}"></i>
                        <p class="value-count count-${product.id}">${product.count}</p>
                        <i class="fa-solid fa-minus" id="${product.id}"></i>
                    </div>
                </div>
                <div class="container-delete-price">
                    <div class="box-price-delete">
                        <p class="text-delete-price show-text">Precio</p>
                        <p class="price-number">$ ${product.subTotal}</p>
                    </div>
                    <div class="box-price-delete">
                        <i class="fa-regular fa-circle-xmark"></i>
                        <p class="text-delete-price" id="${product.id}">Eliminar</p>
                    </div>
                </div>
            `
            containerCartList.appendChild(article);
            return containerCartList;
        });
    }
    const sendUpdateOfCount = async (dataCart) => {
        const btnPlus = containerCartList.querySelectorAll('.fa-plus');
        const btnMinus = containerCartList.querySelectorAll('.fa-minus');
        btnPlus.forEach(element => {
            element.addEventListener('click', async (e) => {
                const id = parseInt(e.target.id);
                let newListCart = await [...dataCart]; // Clonar el arreglo original
                const productIndex = newListCart.findIndex(product => product.id === id);
                if (productIndex !== -1) {
                    newListCart[productIndex].count++; // Incrementar el contador del producto
                    newListCart[productIndex].subTotal = newListCart[productIndex].price * newListCart[productIndex].count;
                    await saveLocal(newListCart); // Actualizar el almacenamiento local
                    await updateCart();
                }
            });
        });
        btnMinus.forEach(element => {
            element.addEventListener('click', async (e) => {
                const id = parseInt(e.target.id);
                let newListCart = await [...dataCart]; // Clonar el arreglo original
                const productIndex = newListCart.findIndex(product => product.id === id);
                if (productIndex !== -1) {
                    if (newListCart[productIndex].count > 1) {
                        newListCart[productIndex].count--; // Decrementar el contador del producto
                        newListCart[productIndex].subTotal = newListCart[productIndex].price * newListCart[productIndex].count;
                        await saveLocal(newListCart); // Actualizar el almacenamiento local
                        await updateCart();
                    }
                }
            });
        });
    }
    const deleteProduct = async (dataCart) => {
        const btnDelete = containerCartList.querySelectorAll('.text-delete-price');
        btnDelete.forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = parseInt(e.target.id);
                let newListCart = [...dataCart]
                newListCart = newListCart.filter(element => element.id !== id);
                await saveLocal(newListCart);
                await counterCart(newListCart)
                location.reload();
                await updateCart();
            })
        })
    }

    const resumenOrderShop = (cartList) => {
        const subTotal = document.getElementById('value-sub-total')
        const delivery = document.getElementById('value-delivery');
        const total = document.getElementById('total-value');

        const check = document.getElementById('switcher');
        check.addEventListener('click', () => {
            const isChecked = check.checked;
            const valueDelivery = isChecked ? 2000 : 0;
            updateTotals(cartList, valueDelivery);
        })
        const updateTotals = (cartList, valueDelivery) => {
            const valueSubTotal = cartList.reduce((acum, elem) => acum + elem.subTotal, 0);
            subTotal.innerText = `$ ${valueSubTotal}`;
            delivery.innerText = `$ ${valueDelivery}`;
            total.innerText = `$ ${valueSubTotal + valueDelivery}`;
        }
        updateTotals(cartList, check.checked ? 2000 : 0)
    }
    const saveLocal = (cartList) => {
        localStorage.setItem('cart', JSON.stringify(cartList))
    }
    const counterCart = async (cartList) => {
        const cartLength = cartList.length;
        localStorage.setItem('cartLength', JSON.stringify(cartLength));
        if(cartLength > 0){
            counterMobile.style.display='block';
            counterMobile.innerText= cartLength;
            counterDesktop.style.display='block';
            counterDesktop.innerText= cartLength;
        }else{
            counterMobile.style.display='none';
            counterDesktop.style.display='none';
        }
    }
    const showBackgroundCart= async(cartLength)=>{
        if(cartLength > 0){
            containerImgEmpty.style.display='none';
            mainPagesCart.style.display='block';
        }else{
            containerImgEmpty.style.display='block';
            mainPagesCart.style.display='none';
        }
    }
    const updateCart = async () => {
        containerCartList.innerHTML = '';
        const dataCartLocal = await getCartList;
        const data = await drawCart(dataCartLocal);
        await deleteProduct(dataCartLocal);
        await sendUpdateOfCount(dataCartLocal);
        await resumenOrderShop(dataCartLocal);
        await counterCart(dataCartLocal);
        await showBackgroundCart(dataCartLocal.length);
        return data;
    }
    updateCart();
})
