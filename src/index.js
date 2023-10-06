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
                    <div class="d-flex flex-row" style="width: 28rem;">
                        <img src="${products[i].product}" class="img" width="250" height="230" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${products[i].name}</h5>
                            <h3 class="card-title">Rp.${products[i].price}</h3>
                            <p class="card-text">Deskripsi : ${products[i].description}</p>
                            <a href="#" class="btn btn-success">Beli</a>
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
