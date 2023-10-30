let countSpan = document.querySelector("#count")
let tbody = document.querySelector("tbody")

const products = localStorage.getItem("products")
let basket = JSON.parse(localStorage.getItem("basket")) ?? []
let count = 0;

basket.forEach(elem => {
    count += elem.count
    createTableElem(elem)
})

countSpan.innerText = count

function createTableElem(basketItem) {

    let row = document.createElement("tr")

    let name = document.createElement("td")
    name.innerText = basketItem.product.name
    row.appendChild(name)

    let img = document.createElement("td")
    let imgFile= document.createElement("img")
    imgFile.src = basketItem.product.img
    imgFile.classList.add("basket-img")
    img.appendChild(imgFile)
    row.appendChild(img)

    let price = document.createElement("td")
    price.innerText = basketItem.product.price
    row.appendChild(price)

    let counttd = document.createElement("td")

    let decrease = document.createElement("span")
    decrease.innerText = "-"
    decrease.classList.add("remove")
    decrease.setAttribute("prodId", basketItem.product.id)
    counttd.appendChild(decrease)

    let countspan = document.createElement("span")
    countspan.innerText = basketItem.count
    counttd.appendChild(countspan)

    let increase = document.createElement("span")
    increase.innerText = "+"
    increase.classList.add("add")
    increase.setAttribute("prodId", basketItem.product.id)
    counttd.appendChild(increase)

    row.appendChild(counttd)

    tbody.appendChild(row)

    increase.addEventListener("click", function (e) {
        basket.forEach(elem => {
            if (elem.product.id == e.target.getAttribute("prodId")) {
                console.log("here");
                elem.count += 1;
                return;
            }
        })
        count += 1;
        countSpan.innerText = count;
        this.previousElementSibling.innerText++

        localStorage.setItem("basket", JSON.stringify(basket))
    })

    decrease.addEventListener("click", function (e) {
        basket.forEach(elem => {
            if (elem.product.id == this.getAttribute("prodId")) {
                if (elem.count == 1) {
                    basket = basket.filter(x=> x.product.id !=elem.product.id)
                    e.target.parentElement.parentElement.remove()
                    return;
                } else {
                    elem.count -= 1
                    this.nextElementSibling.innerText--
                    return;
                }
            }
        })
        count -= 1;
        countSpan.innerText = count;
        localStorage.setItem("basket", JSON.stringify(basket))
    })
}
