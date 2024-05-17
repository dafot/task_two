"use strict";
document.addEventListener("DOMContentLoaded", () => {
  let formData = {};
  const LS = localStorage;

  form.addEventListener("input", (event) => {
    formData[event.target.name] = event.target.value;
    LS.setItem("formData", JSON.stringify(formData));
  });

  if (LS.getItem("formData")) {
    formData = JSON.parse(LS.getItem("formData"));
    for (let key in formData) {
      form.elements[key].value = formData[key];
    }
  }
});
function validation(form) {
  function removeError(input) {
    const parent = input.parentNode;
    if (parent.classList.contains("error")) {
      parent.querySelector(".error-label").remove();
      parent.classList.remove("error");
    }
  }
  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement("label");

    errorLabel.classList.add("error-label");
    errorLabel.textContent = text;

    parent.classList.add("error");
    parent.append(errorLabel);
  }
  let result = true;
  const allInputs = form.querySelectorAll("input");

  for (const input of allInputs) {
    removeError(input);

    if (input.dataset.governum == "true") {
      const regex = /^[а-яА-Я][0-9]{3}[а-яА-Я]{3} [0-9]{2}/;
      if (!regex.test(input.value)) {
        removeError(input);
        createError(input, "Гос номер введен некорректно");
        result = false;
      }
    }
    if (input.dataset.currentDate == "true") {
      const date = new Date().toISOString().split("T")[0];
      if (input.value < date) {
        removeError(input);
        createError(input, "Вы выбрали неверную дату");
        input.value = input.value.replaceAll(("-", "."));
        result = false;
      }
    }
    //Проверка серии паспорта
    if (input.dataset.series == "true") {
      const regex = /^[0-9]{4}/;
      if (!regex.test(input.value)) {
        removeError(input);
        createError(input, "Серия паспорта введена неправильно");
        result = false;
      }
    }
    if (input.dataset.number == "true") {
      const regex = /^[0-9]{6}/;
      if (!regex.test(input.value)) {
        removeError(input);
        createError(input, "Номер паспорта введен неправильно");
        result = false;
      }
    }
    //Проверка поля на пустоту
    if (input.dataset.required == "true") {
      if (input.value == "") {
        removeError(input);
        createError(input, "Поле не заполнено");
        result = false;
      }
    }
  }

  return result;
}

document
  .getElementById("add-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    if (validation(this) == true) {
      this.submit()
    }
  });