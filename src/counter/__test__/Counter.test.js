import Counter from "../Counter";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let getByTestId;
beforeEach(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
});

test("header renders with correct text", () => {
  const headerEl = getByTestId("header");
  expect(headerEl.textContent).toBe("My Counter");
});

test("Counter initially start with text of 0", () => {
  const counterEl = getByTestId("counter");
  expect(counterEl.textContent).toBe("0");
});

test("Input contains initial value of 1", () => {
  const inputEl = getByTestId("input");
  expect(inputEl.value).toBe("1");
});

test("Add button renders with +", () => {
  const addBtn = getByTestId("add-btn");
  expect(addBtn.textContent).toBe("+");
});

test("Subtract button renders with -", () => {
  const subtractBtn = getByTestId("subtract-btn");
  expect(subtractBtn.textContent).toBe("-");
});

test("Change value of input works correctly", () => {
  const inputEl = getByTestId("input");
  expect(inputEl.value).toBe("1");
  fireEvent.change(inputEl, {
    target: { value: "8" },
  });
  expect(inputEl.value).toBe("8");
});

test("Clicking on plus btn adds 1 to counter", () => {
  const addBtn = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  expect(counterEl.textContent).toBe("0");
  fireEvent.click(addBtn);
  expect(counterEl.textContent).toBe("1");
});

test("Clicking on plus btn subtracts 1 to counter", () => {
  const subtractBtn = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  expect(counterEl.textContent).toBe("0");
  fireEvent.click(subtractBtn);
  expect(counterEl.textContent).toBe("-1");
});

test("Change input value and click on add btn works correctly", () => {
  const addBtn = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");
  fireEvent.change(inputEl, {
    target: { value: "8" },
  });

  fireEvent.click(addBtn);
  expect(counterEl.textContent).toBe("8");
});

test("Change input value and click on subtract btn works correctly", () => {
  const subtractBtn = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");
  fireEvent.change(inputEl, {
    target: { value: "8" },
  });

  fireEvent.click(subtractBtn);
  expect(counterEl.textContent).toBe("-8");
});

test("Adding and subtracting leads to the correct counter number", () => {
  const addBtn = getByTestId("add-btn");
  const subtractBtn = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");
  fireEvent.change(inputEl, {
    target: { value: "10" },
  });
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  expect(counterEl.textContent).toBe("20");
  fireEvent.change(inputEl, {
    target: { value: "5" },
  });
  fireEvent.click(addBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  expect(counterEl.textContent).toBe("15");
});

test("Counter contains correct className", () => {
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");
  const addBtn = getByTestId("add-btn");
  const subtractBtn = getByTestId("subtract-btn");
  expect(counterEl.className).toBe("");
  fireEvent.change(inputEl, {
    target: { value: "50" },
  });
  fireEvent.click(addBtn);

  expect(counterEl.className).toBe("");
  fireEvent.click(addBtn);
  expect(counterEl.className).toBe("green");
  fireEvent.click(addBtn);
  expect(counterEl.className).toBe("green");
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  expect(counterEl.className).toBe("");
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  expect(counterEl.className).toBe("red");
});
