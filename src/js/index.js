/* global _:true */

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const randomize = _.shuffle;

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('.gem-puzzle');
  let state = { x: 3, y: 3 };

  const generatePlayingField = () => {
    const rValues = randomize(values);
    const tableEl = document.createElement('table');
    tableEl.className = 'table-bordered';
    for (let i = 0; i < 4; i += 1) {
      const row = tableEl.insertRow();
      for (let j = 0; j < 4; j += 1) {
        const cell = row.insertCell();
        cell.className = 'p-3';
        if (i === state.x && j === state.y) {
          cell.classList.add('table-active');
        }
        cell.textContent = rValues[i + (j * 4)];
      }
    }
    return tableEl;
  };

  const table = generatePlayingField();
  root.append(table);

  document.body.addEventListener('keyup', ({ keyCode }) => {
    let newPos;
    const { x, y } = state;
    switch (keyCode) {
      case 37:
        newPos = { ...state, x: x + 1 };
        break;
      case 38:
        newPos = { ...state, y: y + 1 };
        break;
      case 39:
        newPos = { ...state, x: x - 1 };
        break;
      case 40:
        newPos = { ...state, y: y - 1 };
        break;
      default:
        return true;
    }
    if (newPos.x < 4 && newPos.x >= 0 && newPos.y < 4 && newPos.y >= 0) {
      const element = table.rows[newPos.y].cells[newPos.x];
      const active = table.rows[state.y].cells[state.x];
      active.textContent = element.textContent;
      element.textContent = '';
      active.classList.remove('table-active');
      element.classList.add('table-active');
      state = { ...state, ...newPos };
    }
    return true;
  });
});
