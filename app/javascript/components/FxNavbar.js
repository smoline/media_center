import { LitElement, html, css } from "lit";

export class FxNavbar extends LitElement {
  static properties = {
    brand: { type: String },
    menuOpen: { type: Boolean },
    openDropdown: { type: String }
  };

  constructor() {
    super();
    this.brand = "MyApp";
    this.menuOpen = false;
    this.openDropdown = null;
  }

  static styles = css`
    :host {
      display: block;
      font-family: 'Poppins', sans-serif;
    }

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      flex-wrap: wrap;
      background: var(--bluegray-800);
      color: var(--white);
    }

    .brand {
      font-weight: 700;
      font-size: 1.25rem;
    }

    .menu-toggle {
      display: none;
      font-size: 1.5rem;
      cursor: pointer;
    }

    ul {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
      flex-wrap: wrap;
    }

    li {
      position: relative;
      margin-left: 1rem;
    }

    a {
      color: var(--white);
      text-decoration: none;
      padding: 0.5rem;
      display: block;
      transition: background 0.2s, color 0.2s;
    }

    a:hover {
      background: var(--bluegray-600);
      color: var(--white);
    }

    li ul {
      display: none; /* dropdown hidden by default */
      position: absolute;
      top: 100%;
      left: 0;
      background: var(--bluegray-600);
      border-radius: 4px;
      min-width: 150px;
      z-index: 1000;
      flex-direction: column;
    }

    li ul li {
      margin: 0;
    }

    li ul a {
      padding: 0.5rem 1rem;
    }

    .search input {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      border: none;
      background: var(--white);
      color: var(--gray-900);
    }

    /* Mobile */
    @media (max-width: 768px) {
      .menu-toggle {
        display: block;
      }

      ul {
        flex-direction: column;
        width: 100%;
        display: none; /* hidden by default */
      }

      ul.open {
        display: flex;
      }

      li {
        margin-left: 0;
      }

      li ul {
        position: static;
        display: none;
      }

      li ul.open {
        display: flex;
      }

      .search {
        margin: 0.5rem 0;
      }
    }
  `;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDropdown(name) {
    this.openDropdown = this.openDropdown === name ? null : name;
  }

  render() {
    return html`
      <nav>
        <div class="brand">${this.brand}</div>
        <div class="menu-toggle" @click=${() => this.toggleMenu()}>&#9776;</div>

        <ul class="${this.menuOpen ? 'open' : ''}">
          <!-- Home -->
          <li><a href="#">Home</a></li>

          <!-- Movies -->
          <li>
            <a href="#" @click=${e => { e.preventDefault(); this.toggleDropdown('movies');}} aria-haspopup="true" aria-expanded="${this.openDropdown === 'movies'}">
              Movies
            </a>
            <ul class="${this.openDropdown === 'movies' ? 'open' : ''}">
              <li><a href="#">Movies</a></li>
              <li><a href="#">New Movie</a></li>
            </ul>
          </li>

          <!-- About -->
          <li>
            <a href="#" @click=${e => { e.preventDefault(); this.toggleDropdown('about');}} aria-haspopup="true" aria-expanded="${this.openDropdown === 'about'}">
              About
            </a>
            <ul class="${this.openDropdown === 'about' ? 'open' : ''}">
              <li><a href="#">Team</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </li>

          <!-- Search -->
          <li class="search">
            <input type="text" placeholder="Search..." />
          </li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("fx-navbar", FxNavbar);
