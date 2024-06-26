# Test Task "Element Widget"

Write a "widget" to select 3 elements from a certain list (initially set as an array).
As test data, 300 elements with sequence numbers will be suitable - `["Element 1", "Element 2", "Element 3", ...]`.

![Preview](https://raw.githubusercontent.com/kitcat-dev/demos/e7387d8abc1d6cee8c77fe0c11157a73eec35fb3/public/projects/element-widget/preview.png)

## Result

👉 **https://demo.kitcat.dev/element-widget**

- Stack: **React, Typescript, MobX, CSS Modules, Vite**.
- 300 elements are efficiently rendered using virtual scrolling technique. The library `react-window` is used for this purpose.
- The state of the UI is stored in MobX store. It is described as a class with decorators (file `UIStore.ts`).

Implementation time: **1 working day**.

## Requirements

### Logical conditions
- A list of already selected items is displayed (no more than three).
- By clicking on the "Change my choice" button, a dialog opens with a list of all elements (a scrollable list of fixed height), as well as a search field and filter.
- Checkboxes of already selected items are checked, and the selected items are duplicated as blocks at the bottom of the dialog box.
- Search: as you type characters, the list of elements is filtered (using substring search).
- Additional filter (selectbox) - filter by element number (>10, >50, >100).
- Search and filter complete each other.
- You can select no more than three items, in case three items are selected, the remaining checkboxes become disabled.
- The selected items have a link "X" which removes the item from the list of selected items.
- Clicking on the "Save" button closes the dialog box and the list of selected items on the main page is updated from the dialog.
- When you click on the "Cancel" button, the dialog box closes and the list of selected items on the main page remains unchanged.

### Technical conditions:

The main technologies - React.js or Native JS + web components. Using TS - a big plus.
If you want to use a state manager - **MobX is preferred**.

Using UI frameworks such as bootstrap, Tailwind and etc and component libraries is **highly undesirable, but allowed**.

There is a concept of the widget below. Appearance is up to you, in this task js and its implementation is emphasized.
