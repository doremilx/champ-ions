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
        <div class='right'>
        <a class='menu-info' href="index.html"> Apprendre </a>
        <a class='menu-jeu' href="jeu.html"> Jouer </a>
        </div>
      </header>
    `;
  }
}

customElements.define('n-header', HeaderComponent);
