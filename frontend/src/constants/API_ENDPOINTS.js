const baseUrl = "https://tasty-tales.pramshighedu.com/recipes";

export const authUrls = {
  login: `${baseUrl}/auth/sign-in`,
  register: `${baseUrl}/user/sign-up`,
};

export const masterUrls = {
  getUser: `${baseUrl}/users/user`,
  createRecipe: `${baseUrl}/new-recipe`,
  userRecipes: `${baseUrl}/current/user/recipes`,
  allRecipes: `${baseUrl}/`,
};
