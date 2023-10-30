const products = [
    {
        id: 1,
        name: "phone",
        price: 1500,
        img: "https://tse1.mm.bing.net/th?id=OIP.lFObICDspkoDSEnjgz6QDAHaIg&pid=Api&P=0"
    },
    {
        id: 2,
        name: "headphone",
        price: 150,
        img: "https://tse4.mm.bing.net/th?id=OIP.jFn40VAsSeO0UyM8NXPjHAHaHa&pid=Api&P=0"
    },
    {
        id: 3,
        name: "laptop",
        price: 3000,
        img: "https://tse3.mm.bing.net/th?id=OIP.a46KCUdEuRQPp-DIrUegTAHaFj&pid=Api&P=0"
    },
    {
        id: 4,
        name: "charger",
        price: 15,
        img: "https://tse2.mm.bing.net/th?id=OIP.3o5_CxKEUSwucNGe9IlIoAHaHa&pid=Api&P=0"
    },
    {
        id: 5,
        name: "PC",
        price: 5000,
        img: "https://tse4.mm.bing.net/th?id=OIP.sL4Hecm9ukXbwVt_Ki99pgHaEu&pid=Api&P=0"
    },
]


let main = document.querySelector(".row")
let countSpan = document.querySelector("#count")

localStorage.setItem("products", JSON.stringify(products))
const basket = JSON.parse(localStorage.getItem("basket")) ?? []
let count = 0;

basket.forEach(elem => count += elem.count)

countSpan.innerText = count


products.forEach(elem => createProduct(elem))

// window.addEventListener("load", function(){

// })

function createProduct(product) {

    let col = document.createElement("div")
    col.classList.add("col-3")
    col.classList.add("mb-3")

    let card = document.createElement("div")
    card.classList.add("card")
    card.style.width = "13rem"
    col.appendChild(card)

    let img = document.createElement("img")
    img.src = product.img
    img.classList.add("card-img-top")
    img.style.height = "150px"
    col.appendChild(img)

    let cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    let heading = document.createElement("h5")
    heading.innerText = product.name
    heading.classList.add("card-title")
    cardBody.appendChild(heading)

    let price = document.createElement("p")
    price.innerText = product.price
    price.classList.add("card-text")
    cardBody.appendChild(price)

    let basketBtn = document.createElement("button")
    basketBtn.innerText = "Add to basket"
    basketBtn.classList.add("btn")
    basketBtn.classList.add("btn-primary")
    basketBtn.setAttribute("prodId", product.id)
    cardBody.appendChild(basketBtn)

    col.appendChild(cardBody)
    main.appendChild(col)

    basketBtn.addEventListener("click", function (e) {
        if (basket.some(x => x.product.id == e.target.getAttribute("prodId"))) {
            basket.forEach(elem => {
                if (elem.product.id == e.target.getAttribute("prodId")) {
                    elem.count += 1;
                    return;
                }
            })
        } else {
            let basketItem = {
                product: products.find(x => x.id == e.target.getAttribute("prodId")),
                count: 1
            }
            basket.push(basketItem)
        }
        count += 1;
        countSpan.innerText = count;

        localStorage.setItem("basket", JSON.stringify(basket))
    })

}