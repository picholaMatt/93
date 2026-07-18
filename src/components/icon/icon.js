import { ICONS } from './icon-registry.js';

class DSIcon extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['name', 'size'];
    }

    attributeChangedCallback() {
        this.render();
    }

    async render() {
        const name = this.getAttribute('name');

        const size =
            this.getAttribute('size') || 'base';
        
            if (!name) return;

            const icon = ICONS[name];

            if (!icon) {
                console.warn(`Icon "${name}" not found`);
                return;
            }

            const path = icon[size];

            const response = await fetch(path);

            this.innerHTML =
                await response.text();
    }
}

customElements.define('ds-icon', DSIcon);