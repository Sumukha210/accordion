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
    section.tabIndex = index === 0 ? 0 : -1;
    section.setAttribute("data-index", index);
    section.innerHTML = `
        <h3 class="heading">${title}</h3> 
        <div class="content">
            <div><p>${content}</p></div>
        </div>
    `;

    this.main.appendChild(section);
  }

  toggleAccordion(ele) {
    if (ele.classList.contains("show")) {
      ele.classList.remove("show");
    } else {
      this.closeAllAccordions();

      ele.classList.add("show");
    }
  }

  setSectionTabIndex(nextNumber) {
    document.querySelectorAll("section").forEach((section) => {
      section.tabIndex = -1;
      if (parseInt(section.dataset.index) === nextNumber) {
        section.tabIndex = 0;
      }
    });
  }

  handleMainPress = (e) => {
    if (e.code === "Tab") {
      const nextNumber = parseInt(e.target.dataset.index) + 1;

      this.setSectionTabIndex(
        nextNumber < this.main.childElementCount ? nextNumber : 0
      );
    }

    if (
      e.target.localName === "section" &&
      (e.code === "Enter" || e.code === "Space")
    ) {
      this.toggleAccordion(e.target);
    }
  };

  handleMainClick = (e) => {
    if (e.target.parentElement.localName === "section") {
      this.toggleAccordion(e.target.parentElement);
    }

    if (e.target.localName === "section") {
      this.toggleAccordion(e.target);
    }
  };
}

const accordion = new Accordion();
