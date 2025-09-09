const loadAllTrees = () => {
  removeActive();
  document.getElementById("all_trees_btn").classList.add("active");
  manageSpinnner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((response) => response.json())
    .then((data) => {
      displayAllTrees(data.plants);
    });
};

const displayAllTrees = (trees) => {
  const cardContainer = document.getElementById("card_container");
  cardContainer.innerHTML = "";
  manageSpinnner(false);

  trees.forEach((tree) => {
    const containerDiv = document.createElement("div");
    containerDiv.innerHTML = `
     <div class="card bg-white p-3">
                <div class="w-full">
                    <img  class="w-full h-48 object-cover rounded-md"  src=${tree.image} alt="" />
                </div>
              <h2 onclick="displayModal(${tree.id})" class="font-bold my-2 cursor-pointer">${tree.name}</h2>
              <p class="text-gray-500  line-clamp-3">
                 ${tree.description}
              </p>
              <div class="flex justify-between items-center mt-3">
                <h3 class="bg-[#DCFCE7] text-[#15803D] rounded-xl px-3">${tree.category}</h3>
                <p class="font-bold">${tree.price}</p>
              </div>
              <button onclick="handleAddToCart('${tree.name}','${tree.price}')" class="bg-[#15803D] border text-white rounded-2xl  px-4 py-1 mt-3">Add to Cart</button>
            </div>
    `;
    cardContainer.appendChild(containerDiv);
  });
};

const displayModal = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/plant/${id}`
  );
  const result = await response.json();
  // console.log(result);
  const modal_dynamic = document.getElementById("modal_dynamic");
  modal_dynamic.innerHTML = "";
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `
        <div id class="modal-box">
    <h3 class="text-lg font-bold mb-2">${result.plants.name}</h3>
   <div class="w-full">
                    <img  class="w-40 h-40 object-cover rounded-md"  src=${result.plants.image} alt="" />
    </div>  
    <h3 class="mt-2"><span class="font-bold">Catagoty:</span> ${result.plants.category}</h3>
    <h3 class="my-2"><span class="font-bold">Price:</span> ${result.plants.price}</h3>
    <p><span class="font-bold">Description:</span> ${result.plants.description}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
    `;
  modal_dynamic.appendChild(newDiv);

  document.getElementById("my_modal_5").showModal();
};

const loadAllCatagories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );
  const result = await response.json();
  // removeActive();
  // const all_calagory_btn =  document.getElementById(`all_calagory_btn$`)
  displayAllCatagories(result.categories);
};

const displayAllCatagories = (items) => {
  const allCatagoriesBtn = document.getElementById("allCatagoriesBtn");
  allCatagoriesBtn.innerHTML = "";
  items.forEach((item) => {
    const itemContainerDiv = document.createElement("div");
    itemContainerDiv.innerHTML = `
    <h2 onclick="getTreeByCatagoty(${item.id})" id="category_btn_${item.id}" class="category-btn hover:bg-green-800  p-2 rounded hover:text-white cursor-pointer">${item.category_name}</h2>
    `;
    allCatagoriesBtn.appendChild(itemContainerDiv);
  });
};

const getTreeByCatagoty = async (id) => {
  removeActive();

  // Add active class to clicked category button
  document.getElementById(`category_btn_${id}`).classList.add("active");
  manageSpinnner(true);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/category/${id}`
  );
  const result = await response.json();
  displayGetTreeByCatagoty(result.plants);
};

const displayGetTreeByCatagoty = (treeItems) => {
  const cardContainer = document.getElementById("card_container");
  cardContainer.innerHTML = "";
  manageSpinnner(false);
  treeItems.forEach((item) => {
    const eachCatagoryDiv = document.createElement("div");
    eachCatagoryDiv.innerHTML = `
     <div class="card bg-white p-3">
                <div class="w-full">
                    <img class="w-full h-48 object-cover rounded-md"  src=${item.image} alt="" />
                </div>
              <h2 onclick="displayModal(${item.id})" class="font-bold my-2 cursor-pointer">${item.name}</h2>
              <p class="text-gray-500  line-clamp-3">
                 ${item.description}
              </p>
              <div class="flex justify-between items-center mt-3">
                <h3 class="bg-[#DCFCE7] text-[#15803D] rounded-xl px-3">${item.category}</h3>
                <p class="font-bold">${item.price}</p>
              </div>
              <button onclick="handleAddToCart('${item.name}','${item.price}')" class="bg-[#15803D] border text-white rounded-2xl  px-4 py-1 mt-3">Add to Cart</button>
            </div>
    `;

    cardContainer.appendChild(eachCatagoryDiv);
  });
};

let total = 0;
const handleAddToCart = (treeName, treeprice) => {
  //  console.log(treeName, treeprice);
  const summaryCartContainer = document.getElementById(
    "summary_cart_container"
  );
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `
  <div 
                class="summaryContain flex justify-between bg-[#F0FDF4] items-center p-2 rounded"
              >
                <div>
                  <h1 class="font-bold">${treeName}</h1>
                  <p class="text-gray-400">${treeprice} x 1</p>
                </div>
                <p  onclick="handleCancelCart()" class="text-gray-400 cursor-pointer">X</p>
              </div>
              
  `;
  summaryCartContainer.appendChild(newDiv);
  total = total + Number(treeprice);
  const totalPrice = document.getElementById("total_price");
  totalPrice.innerText = total;
};

const handleCancelCart = () => {
  const summaryContain = document.getElementsByClassName("summaryContain");
  const get = summaryContain[0];
  //  console.log(get);
  get.remove();
};

const removeActive = () => {
  document.getElementById("all_trees_btn").classList.remove("active");
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((btn) => btn.classList.remove("active"));
};
// removeActive()

const manageSpinnner = (status) => {
  if (status == true) {
    document.getElementById("spin_container").classList.remove("hidden");
    document.getElementById("card_container").classList.add("hidden");
  } else {
    document.getElementById("spin_container").classList.add("hidden");
    document.getElementById("card_container").classList.remove("hidden");
  }
};
loadAllCatagories(); // just for check     --

loadAllTrees();

// pending : hover all , active btn , readme.md
