const baseUrl = "https://f8cf2fc493d7b958aba5a42bd31c40bd.serveo.net/recipes";

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
