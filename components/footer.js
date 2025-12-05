class FooterComponent extends HTMLElement {
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
    this.innerHTML = `
      <footer>
        <a href="/">
          <img src="${titleSrc}" alt="" width="48px"/>
          <span class="sr-only">${titleAlt}</span>
        </a>
        <a href="legal.html"> Mentions légales </a>
      </footer>
    `;
  }
}

customElements.define('n-footer', FooterComponent);
