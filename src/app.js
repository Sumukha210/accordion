class Section {
  constructor(main) {
    this.main = main;
  }

  createSection(title, content, index) {
    const section = document.createElement("section");
    section.innerHTML = `
        <h3 class="heading">
          <button aria-expanded="false" tabindex="${index === 0 ? 0 : -1}" data-index="${index}">${title}</button>
        </h3> 
        <div class="content" role="region">
            <div><p>${content}</p></div>
        </div>
    `;

    this.main.appendChild(section);
  }
}


class Accordion extends Section {
  constructor() {
    const main = document.querySelector("main");
    super(main);

    this.main.addEventListener("click", this.handleMainClick);
    this.main.addEventListener("keydown", this.handleMainPress);
    this.getData();

  }

  async getData() {
    try {
      const data = await fetch("./data.json");
      const posts = await data.json();
      posts.forEach((post, index) => {
        this.createSection(post.title, post.content, index);
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleMainPress = (e) => {
    if (e.code === "Tab") {
      const nextNumber = parseInt(e.target.dataset.index) + 1;
      this.setButtonTabIndex(nextNumber < this.main.childElementCount ? nextNumber : 0);
    }

    if ((e.code === "Enter" || e.code === "Space") && e.target.localName === "button") {
      e.preventDefault();
      this.toggleAccordion(e);
    }
  };

  handleMainClick = (e) => {
    if (e.target.localName === "button") {
      e.stopImmediatePropagation();
      this.toggleAccordion(e);
    }
  };

  closeAllAccordions() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => button.setAttribute("aria-expanded", "false"));
  }

  setButtonTabIndex(nextNumber) {
    document.querySelectorAll("section button").forEach((section) => {
      section.tabIndex = -1;
      if (parseInt(section.dataset.index) === nextNumber) {
        section.tabIndex = 0;
      }
    });
  }

  toggleAccordion(event) {
    const button = event.target;

    if (button.getAttribute("aria-expanded") === "true") {
      button.setAttribute("aria-expanded", "false");
    } else {
      this.closeAllAccordions();
      button.setAttribute("aria-expanded", "true");
    }
  }
}

const accordion = new Accordion();
