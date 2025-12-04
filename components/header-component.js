class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() { }

  connectedCallback() {
    this.render();
  }

  render() {
    const titleAlt = this.getAttribute('title-alt');
    const titlePage = this.getAttribute('title-page');
    this.innerHTML = `
      <header>
        <a href="/">
          <img alt="" />
          <span class="sr-only">${titleAlt}</span>
        </a>
        <h1> ${titlePage} </h1>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
