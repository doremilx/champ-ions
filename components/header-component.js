class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {}

  connectedCallback() {
    this.render();
  }

  render() {
    const titleAlt = this.getAttribute('title-alt');

    this.innerHTML = `
      <header>
        <a href="/">
          <img alt="" />
          <span class="sr-only">${titleAlt}</span>
        </a>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
