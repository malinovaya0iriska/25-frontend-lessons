document.querySelectorAll('.item').forEach(setUpItem);
document.querySelectorAll('.drop-zone').forEach(setUpDropZone);

function setUpItem(item) {
  item.addEventListener('dragstart', onDragItem);
  item.addEventListener('dblclick', onDoubleClickItem);
}

function setUpDropZone(dropZone) {
  dropZone.addEventListener('drop', onDropOverDropZone);
  dropZone.addEventListener('dragover', onDragOverDropZone);
}

function onDragItem(event) {
  const draggedItemID = event.target.id;
  event.dataTransfer.setData('text/plain', draggedItemID);
}

function onDoubleClickItem() {
  const unrankedDropZone = document.getElementById('unranked-drop-zone');

  if (unrankedDropZone !== this.parentNode) {
    unrankedDropZone.appendChild(this);
  }
}

function onDropOverDropZone(event) {
  event.preventDefault();

  const draggedItemID = event.dataTransfer.getData('text/plain');
  const draggedItem = document.getElementById(draggedItemID);

  if (this !== draggedItem.parrentnode) {
    this.appendChild(draggedItem);
  }
}

function onDragOverDropZone(event) {
  event.preventDefault();
}
