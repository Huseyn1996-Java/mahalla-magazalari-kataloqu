// Mock data
const shops = [
    {
        id: 1,
        name: "Əli bəyin dükanı",
        address: "Nizami küçəsi 15",
        phone: "+994 50 123 45 67",
        rating: 4.5,
        distance: "150m",
        isOpen: true,
        category: "Ərzaq",
        products: [
            { name: "Çörək", price: "0.80 ₼", category: "Ərzaq" },
            { name: "Süd", price: "2.50 ₼", category: "Ərzaq" },
            { name: "Yumurta", price: "4.00 ₼", category: "Ərzaq" },
            { name: "Pendir", price: "8.50 ₼", category: "Ərzaq" },
        ],
        reviews: [
            {
                id: 1,
                customerName: "Məmməd",
                rating: 5,
                comment: "Çox yaxşı dükan, məhsullar təzə və qiymətlər münasibdir.",
                date: "15.12.2024",
            },
        ],
    },
    {
        id: 2,
        name: "Gülnar xanımın mağazası",
        address: "Həsən bəy Zərdabi 42",
        phone: "+994 55 987 65 43",
        rating: 4.8,
        distance: "300m",
        isOpen: true,
        category: "Təmizlik",
        products: [
            { name: "Sabun", price: "3.20 ₼", category: "Təmizlik" },
            { name: "Şampun", price: "12.90 ₼", category: "Təmizlik" },
        ],
        reviews: [],
    },
    {
        id: 3,
        name: "Rəşad ağanın dükanı",
        address: "28 May küçəsi 8",
        phone: "+994 51 456 78 90",
        rating: 4.2,
        distance: "450m",
        isOpen: false,
        category: "Kırtasiyyə",
        products: [
            { name: "Qələm", price: "1.50 ₼", category: "Kırtasiyyə" },
            { name: "Dəftər", price: "3.80 ₼", category: "Kırtasiyyə" },
        ],
        reviews: [],
    },
]

let currentShop = null
let selectedRating = 0
let currentCategory = "Hamısı"

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
    renderShops()
    setupEventListeners()
})

function setupEventListeners() {
    // Search functionality
    document.getElementById("searchInput").addEventListener("input", (e) => {
        filterShops(e.target.value)
    })

    // Rating stars
    document.querySelectorAll(".star").forEach((star) => {
        star.addEventListener("click", function () {
            selectedRating = Number.parseInt(this.dataset.rating)
            updateStars()
        })

        star.addEventListener("mouseenter", function () {
            const rating = Number.parseInt(this.dataset.rating)
            highlightStars(rating)
        })
    })

    document.querySelector(".star").parentElement.addEventListener("mouseleave", () => {
        updateStars()
    })
}

function showNotification(message, isError = false) {
    const notification = document.getElementById("notification")
    const notificationText = document.getElementById("notificationText")

    notificationText.textContent = message
    notification.className = `notification ${isError ? "error" : ""} show`

    setTimeout(() => {
        notification.classList.remove("show")
    }, 3000)
}

function renderShops() {
    const shopList = document.getElementById("shopList")
    const listView = document.getElementById("listView")

    shopList.innerHTML = ""
    listView.innerHTML = ""

    shops.forEach((shop, index) => {
        // Sidebar shop card
        const shopCard = createShopCard(shop, index)
        shopList.appendChild(shopCard)

        // List view shop card
        const listCard = createListCard(shop, index)
        listView.appendChild(listCard)
    })

    updateShopCount()
}

function createShopCard(shop, index) {
    const card = document.createElement("div")
    card.className = `bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow`
    card.onclick = () => selectShop(index)

    card.innerHTML = `
        <div class="flex justify-between items-start mb-2">
            <h4 class="font-medium text-gray-900">${shop.name}</h4>
            <span class="px-2 py-1 rounded-full text-xs ${shop.isOpen ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}">
                ${shop.isOpen ? "Açıq" : "Bağlı"}
            </span>
        </div>
        <p class="text-sm text-gray-600 mb-2">${shop.address}</p>
        <div class="flex items-center justify-between text-sm">
            <div class="flex items-center space-x-1">
                <i class="fas fa-star text-yellow-400"></i>
                <span>${shop.rating}</span>
            </div>
            <span class="text-blue-600 font-medium">${shop.distance}</span>
        </div>
    `

    return card
}

function createListCard(shop, index) {
    const card = document.createElement("div")
    card.className = "bg-white rounded-lg shadow hover:shadow-lg transition-shadow"

    card.innerHTML = `
        <div class="p-6">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-lg font-semibold">${shop.name}</h3>
                    <p class="text-gray-600 flex items-center mt-1">
                        <i class="fas fa-map-marker-alt mr-1"></i>
                        ${shop.address}
                    </p>
                </div>
                <span class="px-2 py-1 rounded-full text-xs ${shop.isOpen ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}">
                    ${shop.isOpen ? "Açıq" : "Bağlı"}
                </span>
            </div>
            
            <div class="space-y-3">
                <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-star text-yellow-400"></i>
                        <span>${shop.rating}</span>
                    </div>
                    <span class="text-blue-600 font-medium">${shop.distance}</span>
                </div>
                
                <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-phone mr-2"></i>
                    ${shop.phone}
                </div>
                
                <div>
                    <span class="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs mb-2">${shop.category}</span>
                    <p class="text-sm text-gray-600 mb-3">Məhsullar:</p>
                    <div class="grid grid-cols-2 gap-2 text-xs">
                        ${shop.products
        .slice(0, 4)
        .map(
            (product) => `
                            <div class="flex justify-between bg-gray-50 p-2 rounded">
                                <span>${product.name}</span>
                                <span class="font-medium text-green-600">${product.price}</span>
                            </div>
                        `,
        )
        .join("")}
                    </div>
                </div>
                
                <button onclick="selectShop(${index})" class="w-full mt-4 border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-lg transition-colors">
                    Ətraflı məlumat
                </button>
            </div>
        </div>
    `

    return card
}

function selectShop(index) {
    currentShop = shops[index]
    console.log("Dükan seçildi:", currentShop.name)
    showShopModal()
}

function showShopModal() {
    if (!currentShop) return

    document.getElementById("modalShopName").textContent = currentShop.name
    document.getElementById("modalShopAddress").textContent = currentShop.address
    document.getElementById("modalShopRating").textContent = currentShop.rating
    document.getElementById("modalShopPhone").textContent = currentShop.phone
    document.getElementById("modalShopDistance").textContent = currentShop.distance

    const statusElement = document.getElementById("modalShopStatus")
    statusElement.textContent = currentShop.isOpen ? "Açıq" : "Bağlı"
    statusElement.className = `px-2 py-1 rounded-full text-sm ${currentShop.isOpen ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`

    // Render products with working button
    const productsContainer = document.getElementById("modalProducts")
    productsContainer.innerHTML = `
    <div class="col-span-full mb-3">
      <button id="addProductBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full">
        + Məhsul əlavə et
      </button>
    </div>
    ${currentShop.products
        .map(
            (product, index) => `
        <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <div>
                <p class="font-medium">${product.name}</p>
                <p class="text-sm text-gray-500">${product.category}</p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="font-bold text-green-600">${product.price}</span>
                <button onclick="deleteProduct(${index})" class="text-red-500 hover:text-red-700 transition-colors">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `,
        )
        .join("")}
  `

    // Add event listener to the button
    document.getElementById("addProductBtn").addEventListener("click", () => {
        console.log("Məhsul əlavə et düyməsi basıldı!")
        openAddProductModal()
    })

    // Render reviews
    renderReviews()

    document.getElementById("shopModal").classList.add("active")
}

function renderReviews() {
    const reviewsContainer = document.getElementById("reviewsSection")
    const reviews = currentShop.reviews || []

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-user text-4xl mb-2 opacity-50"></i>
                <p>Hələ heç bir rəy yoxdur</p>
                <p class="text-sm">İlk rəyi siz yazın!</p>
            </div>
        `
        return
    }

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

    reviewsContainer.innerHTML = `
        <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                    <span class="text-3xl font-bold text-gray-900">${averageRating.toFixed(1)}</span>
                    <div class="flex">
                        ${[1, 2, 3, 4, 5]
        .map(
            (star) => `
                            <i class="fas fa-star ${star <= Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}"></i>
                        `,
        )
        .join("")}
                    </div>
                </div>
                <span class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">${reviews.length} rəy</span>
            </div>
        </div>
        
        <div class="space-y-3 max-h-96 overflow-y-auto">
            ${reviews
        .map(
            (review) => `
                <div class="bg-white border-l-4 border-l-blue-500 p-4 rounded">
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-user text-blue-600 text-sm"></i>
                            </div>
                            <div>
                                <p class="font-medium text-sm">${review.customerName}</p>
                                <p class="text-xs text-gray-500">${review.date}</p>
                            </div>
                        </div>
                        <div class="flex">
                            ${[1, 2, 3, 4, 5]
                .map(
                    (star) => `
                                <i class="fas fa-star ${star <= review.rating ? "text-yellow-400" : "text-gray-300"} text-sm"></i>
                            `,
                )
                .join("")}
                        </div>
                    </div>
                    ${review.comment ? `<p class="text-gray-700 text-sm mt-2">${review.comment}</p>` : ""}
                </div>
            `,
        )
        .join("")}
        </div>
    `
}

function switchTab(tab) {
    const mapView = document.getElementById("mapView")
    const listView = document.getElementById("listView")
    const mapTab = document.getElementById("mapTab")
    const listTab = document.getElementById("listTab")

    if (tab === "map") {
        mapView.style.display = "grid"
        listView.style.display = "none"
        mapTab.className = "flex-1 py-2 px-4 rounded-md bg-white shadow text-sm font-medium"
        listTab.className = "flex-1 py-2 px-4 rounded-md text-gray-500 text-sm font-medium"
    } else {
        mapView.style.display = "none"
        listView.style.display = "grid"
        listTab.className = "flex-1 py-2 px-4 rounded-md bg-white shadow text-sm font-medium"
        mapTab.className = "flex-1 py-2 px-4 rounded-md text-gray-500 text-sm font-medium"
    }
}

function filterByCategory(category) {
    currentCategory = category

    // Update button styles
    document.querySelectorAll(".category-btn").forEach((btn) => {
        btn.className =
            "category-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors hover:bg-gray-300"
    })
    event.target.className = "category-btn bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"

    filterShops()
}

function filterShops(searchTerm = "") {
    const filteredShops = shops.filter((shop) => {
        const matchesSearch =
            shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shop.address.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = currentCategory === "Hamısı" || shop.category === currentCategory
        return matchesSearch && matchesCategory
    })

    // Update display with filtered shops
    const shopList = document.getElementById("shopList")
    const listView = document.getElementById("listView")

    shopList.innerHTML = ""
    listView.innerHTML = ""

    filteredShops.forEach((shop, index) => {
        const originalIndex = shops.findIndex((s) => s.id === shop.id)
        const shopCard = createShopCard(shop, originalIndex)
        const listCard = createListCard(shop, originalIndex)

        shopList.appendChild(shopCard)
        listView.appendChild(listCard)
    })

    document.getElementById("shopCount").textContent = `${filteredShops.length} dükan tapıldı`
}

function updateShopCount() {
    document.getElementById("shopCount").textContent = `${shops.length} dükan tapıldı`
}

// Modal functions
function openAddShopModal() {
    document.getElementById("addShopModal").classList.add("active")
}

function openAddProductModal() {
    console.log("openAddProductModal çağırıldı")
    console.log("currentShop:", currentShop)

    if (!currentShop) {
        showNotification("Əvvəlcə dükan seçin!", true)
        return
    }

    document.getElementById("productModalShopName").textContent = `${currentShop.name} üçün məhsul əlavə edin`
    document.getElementById("addProductModal").classList.add("active")
    console.log("Modal açıldı")
}

function openRatingModal() {
    selectedRating = 0
    updateStars()
    document.getElementById("ratingModal").classList.add("active")
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active")

    // Reset forms
    if (modalId === "addShopModal") {
        document.querySelector("#addShopModal form").reset()
    } else if (modalId === "addProductModal") {
        document.querySelector("#addProductModal form").reset()
    } else if (modalId === "ratingModal") {
        document.querySelector("#ratingModal form").reset()
        selectedRating = 0
        updateStars()
    }
}

// Rating functions
function updateStars() {
    document.querySelectorAll(".star").forEach((star, index) => {
        if (index < selectedRating) {
            star.classList.remove("text-gray-300")
            star.classList.add("text-yellow-400")
        } else {
            star.classList.remove("text-yellow-400")
            star.classList.add("text-gray-300")
        }
    })

    const ratingText = document.getElementById("ratingText")
    if (selectedRating > 0) {
        ratingText.textContent = `${selectedRating} ulduz`
    } else {
        ratingText.textContent = ""
    }
}

function highlightStars(rating) {
    document.querySelectorAll(".star").forEach((star, index) => {
        if (index < rating) {
            star.classList.remove("text-gray-300")
            star.classList.add("text-yellow-400")
        } else {
            star.classList.remove("text-yellow-400")
            star.classList.add("text-gray-300")
        }
    })
}

// Form submissions
function addShop(event) {
    event.preventDefault()

    const newShop = {
        id: Date.now(),
        name: document.getElementById("shopName").value,
        address: document.getElementById("shopAddress").value,
        phone: document.getElementById("shopPhone").value,
        category: document.getElementById("shopCategory").value,
        rating: 0,
        distance: "Yeni",
        isOpen: true,
        products: [],
        reviews: [],
    }

    shops.push(newShop)
    renderShops()
    closeModal("addShopModal")
    showNotification("Dükan uğurla əlavə edildi!")
}

function addProduct(event) {
    event.preventDefault()
    console.log("addProduct funksiyası çağırıldı")

    if (!currentShop) {
        showNotification("Dükan seçilməyib!", true)
        return
    }

    const productName = document.getElementById("productName").value
    const productPrice = Number.parseFloat(document.getElementById("productPrice").value)
    const productCategory = document.getElementById("productCategory").value

    console.log("Form məlumatları:", { productName, productPrice, productCategory })

    if (!productName || !productPrice || !productCategory) {
        showNotification("Bütün sahələri doldurun!", true)
        return
    }

    if (productPrice <= 0) {
        showNotification("Qiymət 0-dan böyük olmalıdır!", true)
        return
    }

    const newProduct = {
        name: productName,
        price: productPrice.toFixed(2) + " ₼",
        category: productCategory,
    }

    console.log("Yeni məhsul:", newProduct)

    // Find the shop in the shops array and add the product
    const shopIndex = shops.findIndex((shop) => shop.id === currentShop.id)
    if (shopIndex !== -1) {
        shops[shopIndex].products.push(newProduct)
        currentShop.products.push(newProduct) // Update current shop as well
        console.log("Məhsul əlavə edildi")
    }

    // Refresh the modal display
    showShopModal()
    renderShops()
    closeModal("addProductModal")
    showNotification("Məhsul uğurla əlavə edildi!")
}

function submitRating(event) {
    event.preventDefault()

    if (selectedRating === 0) {
        showNotification("Zəhmət olmasa reytinq verin!", true)
        return
    }

    const newReview = {
        id: Date.now(),
        customerName: document.getElementById("customerName").value || "Anonim",
        rating: selectedRating,
        comment: document.getElementById("reviewComment").value,
        date: new Date().toLocaleDateString("az-AZ"),
    }

    if (!currentShop.reviews) {
        currentShop.reviews = []
    }

    currentShop.reviews.push(newReview)

    // Update shop rating
    const totalRating = currentShop.reviews.reduce((sum, review) => sum + review.rating, 0)
    currentShop.rating = (totalRating / currentShop.reviews.length).toFixed(1)

    // Update the shop in the shops array
    const shopIndex = shops.findIndex((shop) => shop.id === currentShop.id)
    if (shopIndex !== -1) {
        shops[shopIndex] = currentShop
    }

    renderShops()
    renderReviews()
    closeModal("ratingModal")
    showNotification("Rəy uğurla əlavə edildi!")
}

function deleteProduct(index) {
    if (currentShop && currentShop.products) {
        currentShop.products.splice(index, 1)

        // Update the shop in the shops array
        const shopIndex = shops.findIndex((shop) => shop.id === currentShop.id)
        if (shopIndex !== -1) {
            shops[shopIndex] = currentShop
        }

        showShopModal() // Refresh modal
        renderShops() // Refresh shop list
        showNotification("Məhsul silindi!")
    }
}

// Close modals when clicking outside
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
        event.target.classList.remove("active")
    }
})
