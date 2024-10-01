const baseUrl = "https://984933a15dd9d57a1d53ba6574575df4.serveo.net/recipes";

export const authUrls = {
  login: `${baseUrl}/auth/sign-in`,
  register: `${baseUrl}/user/sign-up`,
};

export const masterUrls = {
  getUser: `${baseUrl}/users/user`,
  createRecipe: `${baseUrl}/new-recipe`,
  userRecipes: `${baseUrl}/user/recipes`,
  allRecipes: `${baseUrl}/`,
};
