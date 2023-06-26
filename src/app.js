class Accordion {
  constructor() {
    this.getData();

    this.main = document.querySelector("main");
    this.main.addEventListener("click", this.handleMainClick);
    this.main.addEventListener("keydown", this.handleMainPress);
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

  closeAllAccordions() {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => section.classList.remove("show"));
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

  toggleAccordion(event) {
    const section = event.target.parentElement.parentElement;
    const button = event.target;
    if (section.classList.contains("show")) {
      section.classList.remove("show");
      button.setAttribute("aria-expanded", "false");
    } else {
      this.closeAllAccordions();

      section.classList.add("show");
      button.setAttribute("aria-expanded", "true");

    }
  }

  setButtonTabIndex(nextNumber) {
    document.querySelectorAll("section button").forEach((section) => {
      section.tabIndex = -1;
      if (parseInt(section.dataset.index) === nextNumber) {
        section.tabIndex = 0;
      }
    });
  }

  handleMainPress = (e) => {
    console.log("Tab press");
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

}

const accordion = new Accordion();
