
    export default class SPThrobberElement extends HTMLElement {
        connectedCallback() {
            this.innerHTML = '<div class="spinner"><div class="dot1"></div><div class="dot2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';
        }
    }
