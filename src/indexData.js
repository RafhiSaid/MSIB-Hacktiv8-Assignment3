const result = document.getElementById("result");
const url = "http://localhost:3000/products";
const xhr = new XMLHttpRequest();

function fetchData() {
    xhr.onerror = function () {
        alert("error")
    }

    xhr.onloadend = function () {
        result.innerHTML = "";
        const products = JSON.parse(this.response);
        for (let i = 0; i < products.length; i++) {
            const node = document.createElement("div");
            node.innerHTML = `
                <div class="card mb-4">
                    <div class="d-flex justify-content-between">
                        <div class="m-2">
                            <img src="${products[i].product}" class="img" width="250" height="230" alt="...">
                        </div>
                        <div class="m-5">
                            <h5 class="fw-bold">${products[i].name}</h5>
                            <h3 class="fw-light">Rp.${products[i].price}</h3>
                            <p class="fst-italic">Deskripsi : ${products[i].description}</p>
                        </div>
                        <div class="m-5 p-5">
                            <a href="#" class="btn btn-warning p-3" onclick="editData(${products[i].id})""><i class="bi bi-pencil"></i></a>
                            <a href="#" class="btn btn-danger p-3" onclick="deleteData(${products[i].id})"><i class="bi bi-trash"></i></a>
                        </div>
                    </div>
                </div>
                `
            result.appendChild(node);
        }
    }

    xhr.onprogress = function () {
        result.innerHTML = "Loading";
    }

    xhr.open("GET", url);
    xhr.send();
}

fetchData();

let productIdCounter = 1;

function postData(event) {
    event.preventDefault();

    const xhr = new XMLHttpRequest();

    const products = {
        product: document.getElementById("product").value,
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        description: document.getElementById("deskripsi").value,
    };
    product.id = productIdCounter++;

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 201) {
            console.log("Data posted successfully");
            fetchData();
        } else {
            console.error("Error posting data:", xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error("Network error occurred");
    };

    xhr.send(JSON.stringify(products));
}

document.getElementById("postForm").addEventListener("submit", postData);


function deleteData(id) {
    const deleteXhr = new XMLHttpRequest();

    deleteXhr.onload = function () {
        if (deleteXhr.status === 200) {
            console.log("Data berhasil dihapus");
            alert("Data berhasil dihapus");
            fetchData();
        } else {
            console.error("Error hapus data:", deleteXhr.statusText);
        }
    };

    deleteXhr.onerror = function () {
        console.error("Network error occurred");
    };

    deleteXhr.open("DELETE", url + `/${id}`);
    deleteXhr.send();
}


function editData(id) {
    const productEdit = getProductById(id);

    const editForm = `
        <form id="editForm" class="container shadow mt-5 p-5">
            <div class="mb-3">
                <label for="editProduct" class="form-label">Produk Image</label>
                <input type="text" class="form-control" id="editProduct" value="${productEdit.product}" required>
            </div>
            
            <div class="mb-3">
                <label for="editName" class="form-label">Nama</label>
                <input type="text" class="form-control" id="editName" value="${productEdit.name}" required>
            </div>

            <div class="mb-3">
                <label for="editPrice" class="form-label">Harga</label>
                <input type="text" class="form-control" id="editPrice" value="${productEdit.price}" required>
            </div>

            <div class="mb-3">
                <label for="editDeskripsi" class="form-label">Deskripsi Produk</label>
                <input type="text" class="form-control" id="editDeskripsi" value="${productEdit.description}" required>
            </div>
            
            <button type="submit" class="btn btn-success">Save Changes</button>
        </form>
    `;

    result.innerHTML = editForm;

    document.getElementById("editForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const editedProduct = {
            product: document.getElementById("editProduct").value,
            name: document.getElementById("editName").value,
            price: document.getElementById("editPrice").value,
            description: document.getElementById("editDeskripsi").value,
            id: id
        };

        sendData(editedProduct);
    });
}

function getProductById(id) {
    const products = JSON.parse(xhr.responseText);
    return products.find(product => product.id === id);
}

function sendData(editedProduct) {
    const editXhr = new XMLHttpRequest();

    editXhr.onload = function () {
        if (editXhr.status === 200) {
            console.log("Data edited successfully");
            fetchData();
        } else {
            console.error("Error editing data:", editXhr.statusText);
        }
    };

    editXhr.onerror = function () {
        console.error("Network error occurred");
    };

    editXhr.open("PUT", url + `/${editedProduct.id}`);
    editXhr.setRequestHeader("Content-Type", "application/json");
    editXhr.send(JSON.stringify(editedProduct));
}
