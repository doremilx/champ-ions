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
    this.innerHTML = `
      <header>
        <a href="/">
          <img src="${titleSrc}" alt="" width="48px"/>
          <span class="sr-only">${titleAlt}</span>
        </a>
        <a href="/"> Apprendre </a>
        <a href="/"> Jouer </a>
        
      </header>
    `;
  }
}

customElements.define('n-header', HeaderComponent);
