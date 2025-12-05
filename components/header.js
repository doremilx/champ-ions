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
        <a href="index.html"> Apprendre </a>
        <a href="jeu.html"> Jouer </a>
        
      </header>
    `;
  }
}

customElements.define('n-header', HeaderComponent);
