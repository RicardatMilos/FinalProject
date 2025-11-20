let container = document.getElementById('new-product-wrapper');
let container1= document.getElementById('new-product-wrapper-one')
let moreProduct = document.querySelectorAll('.more-product')
let paymentContainer = document.getElementById('payment-container')
let backButton = document.getElementById('back-button')
let paymentSubmit = document.getElementById('payment-submit')

window.addEventListener('DOMContentLoaded', () => {
    db.collection('products').get()
        .then((snapshot) => {

            // Lấy toàn bộ docs
            const docs = snapshot.docs;

            // Giới hạn tối đa 4 sản phẩm
            for (let i = 0; i < docs.length && i < 4; i++) {

                const product = docs[i].data();

                let cardContainer = document.createElement('div');
                let productImage = document.createElement('img');
                let productDetails = document.createElement('div');
                let productName = document.createElement('p');
                let productPrice = document.createElement('p');
                let productPurchaseContainer = document.createElement('div')
                let productInstantPurchase = document.createElement('ion-icon')
                let productAddToBag = document.createElement('ion-icon')

                container.appendChild(cardContainer);
                cardContainer.appendChild(productImage);
                cardContainer.appendChild(productDetails);
                productDetails.appendChild(productName);
                productDetails.appendChild(productPrice);
                cardContainer.appendChild(productPurchaseContainer)
                productPurchaseContainer.appendChild(productInstantPurchase)
                productPurchaseContainer.appendChild(productAddToBag)

                cardContainer.classList.add('single-new-product');
                productImage.classList.add('product-image');
                productDetails.classList.add('product-details');
                productName.classList.add('product-name');
                productPrice.classList.add('product-price');
                productPurchaseContainer.classList.add('product-purchase-container')
                productInstantPurchase.classList.add('product-instant-purchase')
                productAddToBag.classList.add('product-add-to-bag')

                productImage.src = product.productImage;
                productName.innerHTML = product.productName;
                productPrice.innerHTML = product.productPrice + "đ";
                productInstantPurchase.name = "cart-outline"
                productAddToBag.name= "bag-add-outline"

                productInstantPurchase.addEventListener('click', (e) => {
                    e.preventDefault()

                    if (confirm('Bạn muốn mua ngay sản phẩm này?')) {
                        paymentContainer.style.display = 'flex'
                        backButton.addEventListener('click', (e) => {
                            e.preventDefault()

                            paymentContainer.style.display = 'none'
                        })

                        paymentSubmit.addEventListener('click', (e) => {
                            e.preventDefault()

                            let fullName = document.getElementById('full-name').value
                            let emailAddress = document.getElementById('email-address').value
                            let homeAddress = document.getElementById('home-address').value
                            let city = document.getElementById('city').value
                            let nation = document.getElementById('nation').value
                            let zipcode = document.getElementById('zipcode').value
                            let nameOnCard = document.getElementById('name-on-card').value
                            let creditCardNumber = document.getElementById('credit-card-number').value
                            let expiredMonth = document.getElementById('expired-month').value
                            let expiredYear = document.getElementById('expired-year').value
                            let cvv = document.getElementById('cvv').value

                            if (!fullName || !emailAddress || !homeAddress || !city || !nation || !zipcode || !nameOnCard || !creditCardNumber || !expiredMonth || !expiredYear || !cvv) {
                                alert('Vui lòng điền thông tin đầy đủ')
                            }

                            else {
                                alert('Thanh toán thành công')
                                paymentContainer.style.display = 'none'
                                return
                            }
                        })

                    }
                    else return               
            })}
        });
});

window.addEventListener('DOMContentLoaded', () => {
    db.collection('products').get()
        .then((snapshot) => {

            // Lấy toàn bộ docs
            const docs = snapshot.docs;

            // Giới hạn tối đa 4 sản phẩm
            for (let i = 0; i < docs.length && i < 2; i++) {

                const product = docs[i].data();

                let cardContainer = document.createElement('div');
                let productImage = document.createElement('img');
                let productDetails = document.createElement('div');
                let productName = document.createElement('p');
                let productPrice = document.createElement('p');

                container1.appendChild(cardContainer);
                cardContainer.appendChild(productImage);
                cardContainer.appendChild(productDetails);
                productDetails.appendChild(productName);
                productDetails.appendChild(productPrice);

                cardContainer.classList.add('single-new-product');
                productImage.classList.add('product-image');
                productDetails.classList.add('product-details');
                productName.classList.add('product-name');
                productPrice.classList.add('product-price');

                productImage.src = product.productImage;
                productName.innerHTML = product.productName;
                productPrice.innerHTML = product.productPrice + "đ";
            }
        });
});

moreProduct.forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = '../html/product.html';
    });
});