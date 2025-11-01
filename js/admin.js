let productNameInput = document.getElementById('product-name-input')
let productStorageInput = document.getElementById('product-storage-input')
let productPriceInput = document.getElementById('product-price-input')
let productImageInput = document.getElementById('product-image-input')
let cancelButton = document.getElementById('cancel-button')
let submitButton = document.getElementById('submit-button')
let addProductButton = document.getElementById('add-product-button')
let addProductForm = document.getElementById('add-product-form')
let table = document.getElementById('table')
let numberRegex = /^\d+$/

// 🧠 Load products from Firestore when page opens
window.addEventListener('DOMContentLoaded', () => {
    db.collection("products").get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                const product = doc.data();

                // Build product row in the table
                let tableRow = document.createElement('tr');
                let productImageData = document.createElement('td');
                let productNameData = document.createElement('td');
                let productStorageData = document.createElement('td');
                let productPriceData = document.createElement('td');
                let action = document.createElement('td');
                let icon1 = document.createElement('ion-icon');
                let icon2 = document.createElement('ion-icon');
                let productImage = document.createElement('img');

                table.appendChild(tableRow);
                tableRow.appendChild(productImageData);
                productImageData.appendChild(productImage);
                tableRow.appendChild(productNameData);
                tableRow.appendChild(productStorageData);
                tableRow.appendChild(productPriceData);
                tableRow.appendChild(action);
                action.appendChild(icon1);
                action.appendChild(icon2);

                // Add CSS and content
                tableRow.style.backgroundColor = 'gray';
                productImage.style.width = '100%';
                productNameData.style.borderLeft = '1px black solid';
                productNameData.style.color = 'white';
                productNameData.style.fontSize = '30px';
                productNameData.style.textAlign = 'center';
                productStorageData.style.borderLeft = '1px black solid';
                productStorageData.style.color = 'white';
                productStorageData.style.fontSize = '30px';
                productStorageData.style.textAlign = 'center';
                productPriceData.style.borderLeft = '1px black solid';
                productPriceData.style.color = 'white';
                productPriceData.style.fontSize = '30px';
                productPriceData.style.textAlign = 'center';
                action.style.borderLeft = '1px black solid';
                action.style.color = 'white';
                action.style.fontSize = '30px';
                action.style.textAlign = 'center';
                icon1.style.margin = '10px';
                icon2.style.margin = '10px';

                // Fill in data from Firestore
                productImage.src = productImage;
                productNameData.innerHTML = product.productName;
                productStorageData.innerHTML = product.productStorage;
                productPriceData.innerHTML = product.productPrice + 'đ';
                icon1.name = 'create-outline';
                icon2.name = 'trash-outline';
            });
        })
        .catch((error) => {
            console.error("Lỗi khi tải sản phẩm:", error);
        });
});













addProductButton.addEventListener('click', (e) => {
    e.preventDefault()

    addProductForm.style.display = 'flex'
})

cancelButton.addEventListener('click', (e) => {
    e.preventDefault()

    addProductForm.style.display = 'none'
})

submitButton.addEventListener('click', (e) => {
    e.preventDefault()

    let productName = productNameInput.value.trim()
    let productStorage = productStorageInput.value.trim()
    let productPrice = productPriceInput.value.trim()

    if (!productName || !productStorage || !productPrice || productImageInput.files.length === 0) {
        alert("Vui lòng điền thông tin đầy đủ")
        return;
    }

    else if(!numberRegex.test(productStorage) || !numberRegex.test(productPrice)) {
        alert('Vui lòng điền thông tin hợp lệ')
        return;
    }

    else {
        let tableRow = document.createElement('tr')
        let productNameData = document.createElement('td')
        let productStorageData = document.createElement('td')
        let productPriceData = document.createElement('td')
        let productImageData = document.createElement('td')
        let action = document.createElement('td')
        let icon1 = document.createElement('ion-icon')
        let icon2 = document.createElement('ion-icon')
        let productImage = document.createElement('img')

        table.appendChild(tableRow)
        tableRow.appendChild(productImageData)
        productImageData.appendChild(productImage)
        tableRow.appendChild(productNameData)
        tableRow.appendChild(productStorageData)
        tableRow.appendChild(productPriceData)
        tableRow.appendChild(action)
        action.appendChild(icon1)
        action.appendChild(icon2)

        productImageData.classList.add('product-image')
        productNameData.classList.add('product-name')
        productStorageData.classList.add('product-storage')
        productPriceData.classList.add('product-price')

        productImage.src = URL.createObjectURL(productImageInput.files[0])
        productNameData.innerHTML = productName
        productStorageData.innerHTML = productStorage
        productPriceData.innerHTML = productPrice + 'đ'
        icon1.name = 'create-outline'
        icon2.name = 'trash-outline'

        tableRow.style.backgroundColor = 'gray'
        tableRow.style.borderBottom = '1px black solid'
        productImage.style.width = '100%'
        productNameData.style.borderLeft = '1px black solid'
        productNameData.style.color = 'white'
        productNameData.style.fontSize = '30px'
        productNameData.style.textAlign = 'center'
        productStorageData.style.borderLeft = '1px black solid'
        productStorageData.style.color = 'white'
        productStorageData.style.fontSize = '30px'
        productStorageData.style.textAlign = 'center'
        productPriceData.style.borderLeft = '1px black solid'
        productPriceData.style.color = 'white'
        productPriceData.style.fontSize = '30px'
        productPriceData.style.textAlign = 'center'
        action.style.borderLeft = '1px black solid'
        action.style.color = 'white'
        action.style.fontSize = '30px'
        action.style.textAlign = 'center'
        icon1.style.margin = '10px'
        icon2.style.margin = '10px'

        let productData = {
            productName: productName,
            productImage: URL.createObjectURL(productImageInput.files[0]),
            productStorage: productStorage,
            productPrice: productPrice,
        }

        db.collection("products").add(productData)
            .then((docref) => {
                alert("Thêm Sản Phẩm Thành Công");
                addProductForm.style.display = 'none'
                console.log(docref.id)
            })

            .catch((error) => {
                alert("Đăng Ký Thất Bại");
                console.log("error")
            })
    }
})
