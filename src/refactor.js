class Accordion {
  constructor() {
    this.main = document.querySelector("main");
    this.main.addEventListener("click", this.handleMainClick);
    this.main.addEventListener("keydown", this.handleMainPress);

    this.getData();
  }

  async getData() {
    try {
      const response = await fetch("./data.json");
      const posts = await response.json();
      posts.forEach((post, index) => {
        this.createSection(post.title, post.content, index);
      });
    } catch (error) {
      console.log(error);
    }
  }

  createSection(title, content, index) {
    const section = document.createElement("section");
    section.tabIndex = index === 0 ? 0 : -1;
    section.setAttribute("data-index", index);
    section.innerHTML = `
        <h2>${title}</h2>
        <div class="content">
          <div><p>${content}</p></div>
        </div>
      `;
    section.addEventListener("click", this.toggleAccordion.bind(this));

    this.main.appendChild(section);
  }

  toggleAccordion(event) {
    const section = event.currentTarget;
    section.classList.toggle("show");
    this.closeOtherSections(section);
  }

  closeOtherSections(currentSection) {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      if (section !== currentSection) {
        section.classList.remove("show");
      }
    });
  }

  handleMainPress(event) {
    if (event.code === "Tab") {
      const nextIndex = parseInt(event.target.dataset.index) + 1;
      const sectionsCount = this.main.childElementCount;
      const nextNumber = nextIndex < sectionsCount ? nextIndex : 0;
      this.setSectionsTabIndex(nextNumber);
    }

    if (
      event.target.localName === "section" &&
      (event.code === "Enter" || event.code === "Space")
    ) {
      this.toggleAccordion(event);
    }
  }

  setSectionsTabIndex(nextNumber) {
    const sections = document.querySelectorAll("section");
    sections.forEach((section, index) => {
      section.tabIndex = index === nextNumber ? 0 : -1;
    });
  }

  handleMainClick(event) {
    const section = event.target.closest("section");
    if (section) {
      this.toggleAccordion(event);
    }
  }
}

const accordion = new Accordion();
