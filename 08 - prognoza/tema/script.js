var htmlAscButton = '<button id="sortAscButton" onclick="sortAsc()">Add item</button>';
var htmlDescButton = '<button id="sortDescButton" onclick="sortDesc()">Add item</button>';
var htmlItemButton = '<button id="itemButton" onclick="buttonAction()">Add item</button>';
var htmlItemDesc = '<h3>Item Description</h3>';
var htmlAction = '<h3>Action</h3>';
var items = [];

function addItem() {
  var input = document.getElementById('input');
  if (!input.value) {
    document.getElementById('noInput').innerHTML = 'Submit an Item.';
  } else if (items.length == 0) {
    document.getElementById('noInput').innerHTML = '';
    document.getElementById('items').innerHTML = htmlItemDesc;
    document.getElementById('buttons').innerHTML = htmlAction;
  }
}
