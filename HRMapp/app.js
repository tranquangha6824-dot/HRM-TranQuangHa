import { showLoginForm, checkSession } from "./module/Auth.js"; 

document.addEventListener("DOMContentLoaded", async () => {
    const app = document.getElementById("app");
    const isLoggedIn = await checkSession();

    if (isLoggedIn) {
        app.innerHTML = "<h1>Chào mừng bạn đến với trung tâm điều khiển HRM</h1>";
    } else {
        showLoginForm(app);
    }
});