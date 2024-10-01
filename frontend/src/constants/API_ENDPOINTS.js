const baseUrl = "https://7ecaca26e61031e5f8ecf76d27da2534.serveo.net/recipes";

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
