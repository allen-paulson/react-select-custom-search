# Custom React Select with Dropdown Search

A robust, Tailwind-styled wrapper around `react-select` that relocates the search input from the main control into the dropdown menu itself. 

## The Problem

By default, `react-select` places the search input inline within the main control. If your UX dictates a standard button trigger that opens a separate menu containing the search input, simply overriding the `MenuList` component often leads to complex bugs:
1. **Focus Loss:** React destroys and recreates the input on every keystroke due to internal re-renders.
2. **Event Bubbling:** Clicking the custom input triggers `react-select`'s "click outside" listeners, prematurely closing the menu.

## The Solution

This component abandons the hacky `MenuList` override in favor of a **Controlled Popover Pattern**. 
It utilizes a custom trigger button, a fixed-position background blanket for "click-outside" detection, and a purely search-driven `react-select` instance inside the popover. It leverages the modern `unstyled` prop and `classNames` API from `react-select` for complete Tailwind CSS integration.

## Features

- **Isolated Search:** Search input is strictly contained within the dropdown menu.
- **Stable Focus:** Prevents the input unmounting/focus-loss bugs common in `react-select` hacks.
- **Tailwind Native:** Uses `react-select`'s `unstyled` API for 100% Tailwind CSS styling without overriding default classes.
- **Component Injection:** Fully supports `react-select`'s `components` API (e.g., passing custom `<Option />` or `<SingleValue />` components).
- **Multi-select Support:** Handles both single and multi-value selections seamlessly.

## Dependencies

Ensure you have `react-select` installed, and Tailwind CSS configured in your project.

```bash
npm install react-select
# or
yarn add react-select