const SECTION_MODULE = (main) => {
    const createSection = (title, content, index) => {
        const section = document.createElement("section");
        section.innerHTML = `
            <h3 class="heading">
              <button aria-expanded="false" tabindex="${index === 0 ? 0 : -1}" data-index="${index}">${title}</button>
            </h3> 
            <div class="content" role="region">
                <div><p>${content}</p></div>
            </div>
        `;

        main.appendChild(section);
    };

    return { createSection };
};

const ACCORDION_MODULE = (main) => {
    const getData = async () => {
        try {
            const data = await fetch("./data.json");
            const posts = await data.json();
            posts.forEach((post, index) => {
                SECTION_MODULE(main).createSection(post.title, post.content, index);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const closeAllAccordions = () => {
        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => button.setAttribute("aria-expanded", "false"));
    };

    const setButtonTabIndex = (nextNumber) => {
        document.querySelectorAll("section button").forEach((section) => {
            section.tabIndex = -1;
            if (parseInt(section.dataset.index) === nextNumber) {
                section.tabIndex = 0;
            }
        });
    };

    const toggleAccordion = (event) => {
        const button = event.target;

        if (button.getAttribute("aria-expanded") === "true") {
            button.setAttribute("aria-expanded", "false");
        } else {
            closeAllAccordions();
            button.setAttribute("aria-expanded", "true");
        }
    };

    const handleMainPress = (e) => {
        if (e.code === "Tab") {
            const nextNumber = parseInt(e.target.dataset.index) + 1;
            setButtonTabIndex(nextNumber < main.childElementCount ? nextNumber : 0);
        }

        if ((e.code === "Enter" || e.code === "Space") && e.target.localName === "button") {
            e.preventDefault();
            toggleAccordion(e);
        }
    };

    const handleMainClick = (e) => {
        if (e.target.localName === "button") {
            e.stopImmediatePropagation();
            toggleAccordion(e);
        }
    };

    return { getData, handleMainClick, handleMainPress };
};



addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");

    ACCORDION_MODULE(main).getData();

    main.addEventListener("click", ACCORDION_MODULE(main).handleMainClick);
    main.addEventListener("keydown", ACCORDION_MODULE(main).handleMainPress);
});