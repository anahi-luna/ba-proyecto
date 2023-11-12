// cuando el navegador scrollea me agrega los nuevos estilos para el navbar
window.onscroll = () => {
    const navBar = document.querySelector('.nav-bar')
    const shadowElement = document.querySelectorAll('.element-show')
    const shadowSearch = document.querySelectorAll('.nav-bar-search')

    // Verifica si el desplazamiento vertical del cuerpo (document.body) o del documento (document.documentElement) es mayor que cero
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        // si es true le agrega la clase scrolled 
        navBar.classList.add('scrolled')
        // Para cada elemento en shadowSearch, remueve la clase 'shadow-search'
        shadowSearch.forEach(elemt => {
            elemt.classList.remove('shadow-search')
        })
        // Para cada elemento en shadowElement, remueve la clase 'shadow'
        shadowElement.forEach(elemt => {
            elemt.classList.remove('shadow')
        })
    } else {
        // Si el desplazamiento es cero, remueve la clase 'scrolled' del elemento con la clase 'nav-bar'
        navBar.classList.remove('scrolled')
        // Para cada elemento en shadowSearch, agrega la clase 'shadow-search'
        shadowSearch.forEach(elemt => {
            elemt.classList.add('shadow-search')
        })
        // Para cada elemento en shadowElement, agrega la clase 'shadow'
        shadowElement.forEach(elemt => {
            elemt.classList.add('shadow')
        })
    }
}
//Si tengo información guardada en el localStorage, parseamos cuya información y la guardamos en cart.
//En caso de no tener ninguna información me retorna un array vacio. 
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const counter = JSON.parse(localStorage.getItem('cartLength')) || 0;
const mobileCounter = document.querySelector('.counter-mobile');
const desktopCounter = document.querySelector('.counter-desktop');
//Función que captura la información del producto por su id.
const getProduct = (id) => {
    const productList = products;
    const product = productList.find(product => product.id == id);
    return product;
}
//Función que agrega el producto al carrito
const addCart = async (product) => {
    //Verifica si sé repite algún producto por su id.
    const repeat = await cart.some((repeatProduct => repeatProduct.id == product.id));
    if (repeat) {
        //si repeat es true itera el carrito
        cart.map(article => {
            // busca el producto repetido
            if (article.id == product.id) {
                // y le suma más 1 al valor de la propiedad cantidad
                article.count++
            }
        });
    } else {
        //sino se repite me pushea la información del articula al array del carrito
        cart.push({
            id: product.id,
            images: product.images,
            name: product.name,
            count: product.count,
            character: product.character,
            price: product.price,
            subTotal: product.subTotal
        });
        //Guarda la información en el localStorage
        await saveLocal();
        await counterCart();
    }
}
//captura el elemento contenedor padre de los articulos por su id
const containerArticles = document.getElementById('container-list-articles')

//Crea el listado de productos en su contenedor padre con el id="container-list-articles"
const drawListOfArticles = async () => {
    //Itera el objeto literal de la variable products
    products.forEach(product => {
        //crea el elemento article
        const article = document.createElement('article')
        article.classList.add('articles-box') //le agrega la clase articles-box
        //Dibuja dentro de article sus propiedades
        article.innerHTML = `
                <a href="pages/detail.html">
                <img src="${product.images}" alt="img-product">
                <p class="heart-number"><i class="fa-solid fa-star"></i> 4.5</p>
                </a>
                <div class="box-text-price-btn">
                    <h3 class="title-article">${product.name}</h3>
                    <span>${product.character}</span>
                    <div class="box-price-btn-icon">
                        <p class="price-article">$${product.price}</p>
                        <i class="fa-solid fa-plus" id="${product.id}"></i>
                        <p class="btn-shop" id="${product.id}">Comprar</p>
                    </div>
                </div>
        `
        containerArticles.appendChild(article); //asigna a article como hijo de containerArticles
    })
    return containerArticles; //Retorna containerArticles con su nuevos elementos hijos
}
drawListOfArticles();

//Función que se encarga en capturar los eventos onclick a la hora de comprar el producto
const shopProduct = async () => {
    const iconPlus = containerArticles.querySelectorAll('.fa-plus');
    const btnShop = containerArticles.querySelectorAll('.btn-shop');
    //itera los elementos iconPlus con la clase "fa-plus"
    iconPlus.forEach(icon => {
        //escucha el evento onclick 
        icon.addEventListener('click', async (e) => {
            const id = e.target.id; // guarda el id del elemento 
            const product = getProduct(id); //llama a la funcion getProduct y le paso como parametro el id
            addCart(product) //Llama la funcion addCart que guarda la informacion en el localStorage

        });
    });
    //itera los elementos btnShop con la clase "btn-shop"
    btnShop.forEach(button => {
        //escucha el evento onclick 
        button.addEventListener('click', async (e) => {
            const id = e.target.id; // guarda el id del elemento 
            const product = getProduct(id); //llama a la funcion getProduct y le paso como parametro el id
            addCart(product) //Llama la funcion addCart que guarda la informacion en el localStorage
        });
    });
}
shopProduct();
const counterCart = () => {
    const cartLength = cart.length;
    localStorage.setItem('cartLength', JSON.stringify(cartLength));
    console.log(cartLength);
    if(cartLength > 0){
        desktopCounter.style.display='block';
        desktopCounter.innerText=cartLength;
        mobileCounter.style.display='block'
        mobileCounter.innerText= cartLength;
    }else{
        mobileCounter.style.display='none';
        desktopCounter.style.display='none';
    }
}
counterCart();
//funcion que se encarga de guardar la información en el localStorage
const saveLocal = async () => {
    //setea la informacion con el nombre "cart" y envia la info como string
    localStorage.setItem('cart', JSON.stringify(cart))
}

