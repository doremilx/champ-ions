class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() { }

  connectedCallback() {
    this.render();
  }

  render() {
    const titleSrc = this.getAttribute('title-src');
    const titleAlt = this.getAttribute('title-alt');
    const titlePage = this.getAttribute('title-page');
    this.innerHTML = `
      <header>
        <a href="/">
          <img src="${titleSrc}" alt="" width="48px"/>
          <span class="sr-only">${titleAlt}</span>
        </a>
        <h1> ${titlePage} </h1>
      </header>
    `;
  }
}

customElements.define('n-header', HeaderComponent);
