# Accordion Widget

This repository contains a customizable and accessible accordion widget implemented using JavaScript, HTML, and CSS. The accordion allows users to expand and collapse sections of content as needed. It includes animation effects for a more interactive user experience.

## Live Demo

A live demo of the accordion widget can be found [Accordion](https://sumukha210.github.io/accordion/src/index.html).

## Tech Stack

The following technologies were used to create the accordion widget:

- HTML
- CSS
- JavaScript

## Features

- Dynamically generates accordion sections based on data from a JSON file.
- Supports keyboard navigation for improved accessibility.
- Provides smooth animation effects when expanding and collapsing sections.
- Customizable styles to match your design preferences.
- Easy to integrate into existing web projects.

Handling Accessibility in the Accordion Implementation
handleMainPress Method
The handleMainPress method is an event handler that listens for keyboard events within the accordion's main container. Its purpose is to handle keyboard navigation and expand/collapse behavior. Let's look at the key aspects of this method:

Tab Navigation: When the Tab key is pressed, the method calls the setButtonTabIndex method to manage the tabIndex attribute of the buttons within the accordion. This ensures that the focus moves in a logical order through the accordion sections.

Accordion Interaction: If the Enter key or Spacebar is pressed while a button is focused, the method prevents the default action (e.preventDefault()) to avoid unintended browser behavior. It then calls the toggleAccordion method to expand or collapse the section associated with the clicked button.

toggleAccordion Method
The toggleAccordion method is responsible for expanding or collapsing an accordion section. Let's delve into its functionality:

Button State Management: The method toggles the aria-expanded attribute of the clicked button to indicate the expanded or collapsed state of the section. When a button is expanded, it sets aria-expanded="true", and when it's collapsed, it sets aria-expanded="false".

Closing Other Accordions: To ensure that only one section is open at a time, the method calls the closeAllAccordions method to close all other sections before expanding the clicked section. This enhances usability and prevents users from getting lost within the accordion.

handleMainClick Method
The handleMainClick method is an event handler that listens for mouse click events within the accordion's main container. Its purpose is to handle accordion interaction triggered by mouse clicks. Here's what it does:

Preventing Propagation: When a button is clicked, the method prevents further propagation of the event (e.stopImmediatePropagation()) to avoid conflicts with other event handlers. This ensures that only the toggleAccordion method is triggered for the clicked button.
