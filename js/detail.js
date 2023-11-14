const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const product = products.find(product => product.id == productId);

const mainDetail = document.getElementById('main-detail');

const drawProductDetail = () => {
    const containerDetailProduct = document.createElement('div');
    containerDetailProduct.className = 'container-detail-product';
    containerDetailProduct.innerHTML = `
            <div class="box-title-detail-next">
                <a href="../index.html"><i class="fa-solid fa-chevron-left"></i></a>
                <p>Detalle</p>
            </div>
            <div class="box-article-img-description">
                <img src="../${product.images}" alt="img-product">
                <div class="container-title-price-description">
                    <h2 class="first-title">${product.name}</h2>
                    <i class="fa-regular fa-heart"></i>
                    <span>${product.character}</span>
                    <div class="box-food-favorites">
                        <p><i class="fa-solid fa-star"></i> 4.5</p>
                        <i class="fa-solid fa-utensils"></i>
                    </div>
                    <h3 class="sub-title-article">Descripción</h3>
                    <p class="text-description">${product.description}</p>
                    <h3 class="sub-title-article">Tamaño</h3>
                    <div class="box-size">
                        <p class="size-text">S</p>
                        <p class="size-text">M</p>
                        <p class="size-text">L</p>
                    </div>
                    <h3 class="sub-title-article">Cantidad</h3>
                    <div class="box-plus-minus">
                        <i class="fa-solid fa-plus"></i>
                        <p>${product.count}</p>
                        <i class="fa-solid fa-minus"></i>
                    </div>
                    <h3 class="sub-title-article price-desktop">Precio</h3>
                    <div class="desktop-price-div">
                        <h4>$ ${product.price}</h4>
                        <p>Comprar</p>
                    </div>
                </div>
            </div>
    `
    mainDetail.appendChild(containerDetailProduct);
    const boxPriceMobile = document.createElement('div');
    boxPriceMobile.className='box-bottom-price-btn';
    boxPriceMobile.innerHTML=`
        <p class="price-mobile">Precio</p>
        <div class="box-price-btn-bottom">
            <h4>$ ${product.price}</h4>
            <p>Comprar</p>
        </div>
    `
    mainDetail.appendChild(boxPriceMobile);
}
drawProductDetail();