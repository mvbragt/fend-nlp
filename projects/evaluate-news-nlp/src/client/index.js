// Import Styling Sheets
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";
import "./styles/resets.scss";

// Import JavaScript modules
import { handleSubmit } from './js/formHandler';

// Attach the handleSubmit function to the global window object so it can be accessed by the inline 'onsubmit' event in index.html.
window.handleSubmit = handleSubmit;
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
});
