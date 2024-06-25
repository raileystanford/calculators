// Show/hide calculators
let openers = Array.from(document.querySelectorAll('.opener'));
let calculators = Array.from(document.querySelectorAll('.calculator'));
let main = document.querySelector('.main');

main.addEventListener('click', (event) => {

   let elem = event.target;

   if (elem.classList.contains('opener')) {
      elem.classList.add('hide');
      let index = openers.findIndex((item) => item.classList.contains('hide'));
      calculators[index].classList.add('active');
      document.body.classList.add('active');
   }

})

calculators.forEach((item) => {
   item.addEventListener('click', closeCalculator);
})

function closeCalculator(event) {
   if (event.target.classList.contains('calculator__close')) {
      let index = calculators.findIndex((item => item.classList.contains('active')));
      calculators[index].classList.remove('active');
      document.body.classList.remove('active');
      openers[index].classList.remove('hide');
   }
}

// Coffee calculator
let water = document.getElementById('water');
let coffee = document.getElementById('coffee');
let waterUnit = document.getElementById('water__unit');
let coffeeUnit = document.getElementById('coffee__unit');
let changeBtn = document.getElementById('changeBtn');

let standart = {water: 1000, coffee: 60};

let waterUnitValue = waterUnit.value;
let coffeeUnitValue = coffeeUnit.value;
let regime = true;

changeBtn.addEventListener('click', (event) => {
   
   if (regime) {
      regime = false;
      changeBtn.textContent = 'Из "Чисто кофе" в "Вода с кофе"';
   } else {
      regime = true;
      changeBtn.textContent = 'Из "Вода с кофе" в "Чисто кофе"';
   }

   setReadOnly();
})

function setReadOnly() {
   if (regime) {
      coffee.setAttribute('readonly', '');
      coffee.style.cursor = 'not-allowed';
      water.removeAttribute('readonly', '');
      water.style.cursor = '';
   } else {
      water.setAttribute('readonly', '');
      water.style.cursor = 'not-allowed';
      coffee.removeAttribute('readonly', '');
      coffee.style.cursor = '';
   }
}

waterUnit.addEventListener('change', (event) => {
   waterUnitValue = waterUnit.value;
   if (regime) {
      coffee.value = doMath(water.value);
   } else {
      water.value = doMath1(coffee.value);
   }
})

coffeeUnit.addEventListener('change', (event) => {
   coffeeUnitValue = coffeeUnit.value;
   if (regime) {
      coffee.value = doMath(water.value);
   } else {
      water.value = doMath1(coffee.value);
   }
})

water.addEventListener('input', (event) => {
   let waterValue = water.value;
   let result = doMath(waterValue);
   coffee.value = result;
})

function doMath(waterValue) {
   if (waterUnitValue === 'liter') {
      if (coffeeUnitValue === 'kilo') {
         return (waterValue * standart.coffee) / standart.water;
      } else {
         return ((waterValue * standart.coffee) / standart.water) * 1000;
      } 
   } else {
      if (coffeeUnitValue === 'kilo') {
         return ((waterValue / 1000) * standart.coffee) / standart.water;
      } else {
         return (((waterValue / 1000) * standart.coffee) / standart.water) * 1000;
      } 
   }
}

coffee.addEventListener('input', (event) => {
   let coffeeValue = coffee.value;
   let result = doMath1(coffeeValue);
   water.value = result;
})

function doMath1(coffeeValue) {
   if (coffeeUnitValue === 'gram') {
      if (waterUnitValue === 'mililiter') {
         return (coffeeValue * standart.water) / standart.coffee;
      } else {
         return ((coffeeValue * standart.water) / standart.coffee) / 1000;
      }
   } else {
      if (waterUnitValue === 'liter') {
         return (coffeeValue * standart.water) / standart.coffee;
      } else {
         return ((coffeeValue * standart.water) / standart.coffee) * 1000
      }
   }
}

setReadOnly();

// Formula changer
let waterStandart = document.getElementById('calc1__waterStandart');
let coffeeStandart = document.getElementById('calc1__coffeeStandart');
let updateStandartButton = document.getElementById('calc1__updateBtn');
let newWaterStandart = document.getElementById('calc1__newWaterStandart');
let newCoffeeStandart = document.getElementById('calc1__newCoffeeStandart');
let oldFormulaCheckbox = document.getElementById('formula__checkbox1');
let newFormulaCheckbox = document.getElementById('formula__checkbox2');
let settingsArea = document.getElementById('calc1__setings');

let waterFlag = false;
let coffeeFlag = false;

waterStandart.value = standart.water;
coffeeStandart.value = standart.coffee;

settingsArea.addEventListener('change', (event) => {
   if (event.target.id === oldFormulaCheckbox.id) {
      newWaterStandart.setAttribute('disabled', '');
      newCoffeeStandart.setAttribute('disabled', '');
      waterStandart.removeAttribute('disabled');
      coffeeStandart.removeAttribute('disabled');
   };
   if (event.target.id === newFormulaCheckbox.id) {
      newWaterStandart.removeAttribute('disabled');
      newCoffeeStandart.removeAttribute('disabled');
      waterStandart.setAttribute('disabled', '');
      coffeeStandart.setAttribute('disabled', '');
   }  
})


newWaterStandart.addEventListener('input', (event) => {
   if (newWaterStandart.value) {
      waterFlag = true;
      if (newCoffeeStandart.value) unblockUpdateButton();
   } else {
      updateStandartButton.setAttribute('disabled', '');
   }
})

newCoffeeStandart.addEventListener('input', (event) => {
   if (newCoffeeStandart.value) {
      coffeeFlag = true;
      if (newWaterStandart.value) unblockUpdateButton();
   } else {
      updateStandartButton.setAttribute('disabled', '');
   }
})

function unblockUpdateButton() {
   if (waterFlag && coffeeFlag) {
      updateStandartButton.removeAttribute('disabled');
   }
}

function updateStandart(water1, coffee1) {
   standart.water = water1;
   standart.coffee = coffee1;
   waterStandart.value = standart.water;
   coffeeStandart.value = standart.coffee; 
   waterStandart.removeAttribute('disabled');
   waterStandart.setAttribute('readonly', '');
   coffeeStandart.removeAttribute('disabled');
   coffeeStandart.setAttribute('readonly', '');
   newCoffeeStandart.setAttribute('disabled', '');
   newWaterStandart.setAttribute('disabled', '');
   newCoffeeStandart.value = '';
   newWaterStandart.value = '';
   oldFormulaCheckbox.checked = true;  
   updateStandartButton.setAttribute('disabled', '');
   water.value = '';
   coffee.value = '';
}

updateStandartButton.addEventListener('click', (event) => {
   let water = newWaterStandart.value;
   let coffee = newCoffeeStandart.value;
   if (water && coffee) {
      updateStandart(water, coffee);
   }
})
















// Sallary calculator
let tableS = document.querySelector('.item2 .tableS');
let headerRow  = tableS.rows[0];

tableS.addEventListener('pointerover', (event) => {
   let elem = event.target;

   if (elem.classList.contains('cell')) {
      spotSectors(elem);
   } else {
      if (elem.closest('.cell')) {
         spotSectors(elem.closest('.cell'));
      }
   }
})

tableS.addEventListener('pointerout', (event) => {
   let elem = event.target;

   if (elem.classList.contains('cell')) {
      offSpotSectors(elem);
   } else {
      if (elem.closest('.cell')) {
         offSpotSectors(elem.closest('.cell'));
      }
   }
})

function spotSectors(elem) {
   
   let index = elem.cellIndex;
   headerRow.cells[index].classList.add('active');

   let row = Array.from(tableS.rows).find((item) => item.contains(elem));
   row.cells[0].classList.add('active');

}

function offSpotSectors(elem) {

   let index = elem.cellIndex;
   headerRow.cells[index].classList.remove('active');

   let row = Array.from(tableS.rows).find((item) => item.contains(elem));
   row.cells[0].classList.remove('active');

}

let tableSPopup = document.getElementById('calc2__popup');
let confirmBtn = document.getElementById('popupConfirm');
let cancelBtn = document.getElementById('popupCancel');
let tableSSelect = tableSPopup.querySelector('select');

let openedRow;
let tableSPopupStandart = {
   kal: 50,
   twoPowar: 800,
}

tableS.addEventListener('click', (event) => {
   let elem = event.target;

   if (elem.classList.contains('tableS__button')) {
      openedRow = elem.closest('.tableS__row');
      openPopup();
   }

})

tableSSelect.addEventListener('change', (event) => {

   if (tableSSelect.value === 'normal') {
      Array.from(tableSPopup.querySelectorAll('.popup__wrap'))[2].classList.add('disabled');
      Array.from(tableSPopup.querySelectorAll('.popup__wrap'))[3].classList.add('disabled');
   }

   if (tableSSelect.value === 'together') {
      Array.from(tableSPopup.querySelectorAll('.popup__wrap'))[2].classList.remove('disabled');
      Array.from(tableSPopup.querySelectorAll('.popup__wrap'))[3].classList.add('disabled');
   }

   if (tableSSelect.value === 'kalSold') {
      Array.from(tableSPopup.querySelectorAll('.popup__wrap'))[2].classList.add('disabled');
      Array.from(tableSPopup.querySelectorAll('.popup__wrap'))[3].classList.remove('disabled');
   }

})

tableSPopup.addEventListener('click', (event) => {
   let elem = event.target;
   let days = document.getElementById('days').value;
   let price = document.getElementById('calc2__price').value;
   let daysTogether = document.getElementById('daysTogether').value;
   let kalSell = document.getElementById('kalSell').value;

   if (elem.id === confirmBtn.id) {
      setInputsValue(days, price, daysTogether, kalSell);
      doMath3(days, price, daysTogether, kalSell);
      closePopup();
      restore();
      openedRow.cells[2].querySelector('.tableS__button').classList.add('active');
      openedRow.cells[2].querySelector('.tableS__button').textContent = 'Изменить';
   }

   if (elem.id === cancelBtn.id) {
      closePopup();
      restore();
   }
})

tableSPopup.addEventListener('input', () => {
   if (checkField()) {
      confirmBtn.removeAttribute('disabled');
   } else {
      confirmBtn.setAttribute('disabled', '');
   }
})

function checkField() {
   let days = document.getElementById('days').value !== 0 ? document.getElementById('days').value : '0';
   let price = document.getElementById('calc2__price').value;
   let daysTogether = document.getElementById('daysTogether').value !== 0 ? document.getElementById('daysTogether').value : '0';
   let kalSell = document.getElementById('kalSell').value !== 0 ? document.getElementById('kalSell').value : '0';

   if (tableSSelect.value === 'normal') {
      if (days && price) return true; 
   }
   if (tableSSelect.value === 'together') {
      if (days && price && daysTogether) return true; 
   }
   if (tableSSelect.value === 'kalSold') {
      if (days && price && kalSell) return true; 
   }
}

function closePopup() {
   let inputs = Array.from(tableSPopup.querySelectorAll('input'));
   tableSSelect.options[0].selected = true;
   inputs.forEach((item) => item.value = '');
   tableSPopup.classList.remove('active');
   document.body.classList.remove('active-popup');
   confirmBtn.setAttribute('disabled', '');
}

function openPopup() {
   tableSPopup.classList.add('active');
   document.body.classList.add('active-popup');
}

function doMath3(days, price, daysTogether, kalSell) {
   let result;
   if (tableSSelect.value === 'normal') {
      result = days * price;
   }
   if (tableSSelect.value === 'together') {
      result = (days * price) + (daysTogether * tableSPopupStandart.twoPowar);
   }
   if (tableSSelect.value === 'kalSold') {
      result = (days * price) + (kalSell * tableSPopupStandart.kal);
   }
   let inputs = Array.from(openedRow.querySelectorAll('input'));
   inputs[4].value = result;
}

function setInputsValue(days, price, daysTogether, kalSell) {
   let inputs = Array.from(openedRow.querySelectorAll('input'));
   inputs[0].value = days;
   inputs[1].value = daysTogether ? daysTogether : '---';
   inputs[2].value = kalSell ? kalSell : '---';
   inputs[3].value = price;
}

function restore() {
   if (tableSSelect.value === 'normal') {
      Array.from(tableSPopup.querySelectorAll('.popup__wrap')).forEach((item, index) => {
         if (index > 1) {
            item.classList.add('disabled');
         }
      })
   }
   confirmBtn.setAttribute('disabled', '');
}

restore();

let changeParams__calc2 = document.getElementById('changeParams__calc2');
let addEmployee__calc2 = document.getElementById('addEmployee__calc2');
let popup2 = document.getElementById('popup2__calc2');
let popup2__confirm = document.getElementById('popup2__change');
let popup2__cancel = document.getElementById('popup2__cancel');
let removeEmployeeBtn = document.getElementById('removeEmployee__calc2');
let removeBtnsCalc2 = Array.from(document.querySelectorAll('.calc3__removeEButton'));

document.getElementById('popup2__powar-old').value = tableSPopupStandart.twoPowar;
document.getElementById('popup2__kal-old').value = tableSPopupStandart.kal;

changeParams__calc2.addEventListener('click', () => {
   openPopup2();
})

popup2.addEventListener('click', (event) => {
   let twoPowarOld = document.getElementById('popup2__powar-old');
   let kalSoldOld = document.getElementById('popup2__kal-old');
   let kalSold = document.getElementById('popup2__kal').value;
   let twoPowar = document.getElementById('popup2__powar').value;
   let elem = event.target;

   if (elem.id === popup2__cancel.id) {
      closePopup2();
   }

   if (elem.id === popup2__confirm.id) {
      updateCalc2Standart(twoPowar, kalSold, twoPowarOld, kalSoldOld);
      closePopup2();
   }
})

function updateCalc2Standart(powar, kal, twoPowar1, kalSold1) {
   powar = powar ? powar : tableSPopupStandart.twoPowar;
   kal = kal ? kal : tableSPopupStandart.kal;
   tableSPopupStandart.kal = kal;
   tableSPopupStandart.twoPowar = powar
   twoPowar1.value = tableSPopupStandart.twoPowar;
   kalSold1.value = tableSPopupStandart.kal = kal;
}

function openPopup2() {
   popup2.classList.add('active');
   document.body.classList.add('active-popup');
}

function closePopup2() {
   popup2.classList.remove('active');
   document.body.classList.remove('active-popup');
   document.getElementById('popup2__kal').value = '';
   document.getElementById('popup2__powar').value = '';
}

let popup3 = document.getElementById('calc2__popup3');
let popup3__confirm = document.getElementById('popup3__ok');
let popup3__cancel = document.getElementById('popup3__cancel');

addEmployee__calc2.addEventListener('click', () => {
   openPopup3();
   removeBtnsCalc2.forEach((item) => item.classList.remove('active'));
   removeEmployeeBtn.classList.remove('active');
   removeEmployeeBtn.textContent = 'Удалить сотрудника';
})

popup3__confirm.addEventListener('click', () => {
   let fio = document.querySelector('.popup3__fio');
   let work = document.querySelector('.popup3__work');

   addEmployee(fio.value, work.value);
   closePopup3();
})

popup3__cancel.addEventListener('click', () => {
   closePopup3();
})

document.querySelector('.popup3__fio').addEventListener('input', () => {
   if (document.querySelector('.popup3__fio').value && document.querySelector('.popup3__work').value) {
      popup3__confirm.removeAttribute('disabled');
   } else {
      popup3__confirm.setAttribute('disabled', '');
   }
})

document.querySelector('.popup3__work').addEventListener('input', () => {
   if (document.querySelector('.popup3__fio').value && document.querySelector('.popup3__work').value) {
      popup3__confirm.removeAttribute('disabled');
   } else {
      popup3__confirm.setAttribute('disabled', '');
   }
})

function addEmployee(name, work) {
   let row = tableS.rows[1].cloneNode(true);
   let btn = row.cells[0].querySelector('.calc3__removeEButton');
   Array.from(row.querySelectorAll('.tableS__input')).forEach((item) => item.value = '');
   row.cells[0].textContent = name;
   row.cells[1].textContent = work;
   row.cells[0].append(btn);
   tableS.append(row);
}

function openPopup3() {
   popup3.classList.add('active');
   document.body.classList.add('active-popup');
}

function closePopup3() {
   popup3.classList.remove('active');
   document.body.classList.remove('active-popup');
   Array.from(popup3.querySelectorAll('.popup3__input')).forEach((item) => item.value = '');
   popup3__confirm.setAttribute('disabled', '');
}

removeEmployeeBtn.addEventListener('click', () => {
   removeBtnsCalc2 = Array.from(document.querySelectorAll('.calc3__removeEButton'));
   removeBtnsCalc2.forEach((item) => {
      item.addEventListener('click', (event) => {
         removeEmployeeBtn.textContent = 'Готово';
         let elem = event.target;
         let row = elem.closest('.tableS__row');
         row.remove();
      })
   })
   removeBtnsCalc2.forEach((item) => {
      item.classList.add('active');
   })
   removeEmployeeBtn.textContent = 'Отмена';
   if (removeEmployeeBtn.classList.contains('active')) {
      removeBtnsCalc2.forEach((item) => item.classList.remove('active'));
      removeEmployeeBtn.classList.remove('active');
      removeEmployeeBtn.textContent = 'Удалить сотрудника'
   } else {
      removeEmployeeBtn.classList.add('active');
   }
})