const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categories = data.data;
  createCategories(categories);
};
loadData();

const createCategories = (categories) => {
  const categoriesSection = document.getElementById("category-section");
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick="getCategoryDetails('${category.category_id}')" class="btn btn-xs sm:btn-sm md:btn-md normal-case bg-[#25252533]">
    ${category.category}
    </button>
    `;
    categoriesSection.appendChild(div);
  });
};

const getCategoryDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const categoryData = await res.json();
  console.log(categoryData);
  showCategoryDetails(categoryData.data);
};

const showCategoryDetails = (details) => {
  console.log(details);
  const showCategoryField = document.getElementById("show-category-section");
  showCategoryField.textContent = "";
  details.forEach((detail) => {
    const card = document.createElement("div");
    card.classList = `card card-compact`;
    card.innerHTML = `
    <figure class="h-40"><img class="w-full h-full" src=${detail.thumbnail} alt="video" /></figure>
    <div class="flex gap-2 py-5">
    <div class="h-9 w-9 ">
        <img class="h-full w-full rounded-full" src=${detail.authors[0].profile_picture} alt="" />
    </div>
    <div class="flex-grow">
        <h2 class="text-lg font-semibold">${detail.title}</h2>
        <div class="flex items-center gap-2">
            <p>${detail.authors[0].profile_name}</p>
            <div class="w-5">
                <img class="w-full" src="verify.png" alt="" />
            </div>
        </div>
        <p>${detail.others.views}</p>
    </div>
    </div>
    `;
    showCategoryField.appendChild(card);
  });
};
getCategoryDetails("1000");
