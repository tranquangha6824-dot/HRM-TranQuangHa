import { showLoginForm, checkSession } from "./Module.js/Auth.js";
import { showDashboard } from "./Module.js/Dashboard.js";

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");
  const isLoggedIn = await checkSession();

  if (isLoggedIn) {
    showDashboard(app);
  } else {
    showLoginForm(app);
  }
});
