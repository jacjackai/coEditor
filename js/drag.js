export class DragHandler {
    constructor(container) {
        this.container = container;
        this.draggingItem = null;
        this.enable();
    }
    
    enable() {
        this.container.addEventListener('dragstart', e => this.onDragStart(e));
        this.container.addEventListener('dragover', e => this.onDragOver(e));
        this.container.addEventListener('dragend', () => this.onDragEnd());
    }

    onDragStart(e) {
        if (!e.target.classList.contains('column')) return;
        this.draggingItem = e.target;
        this.draggingItem.classList.add('dragging');
    }

    onDragOver(e) {
        e.preventDefault();
        if (!this.draggingItem) return;

        const afterElement = this.findInsertPosition(e.clientX);
        if (!afterElement) return;

        const currentPos = this.draggingItem.compareDocumentPosition(afterElement);

        if (currentPos & Node.DOCUMENT_POSITION_FOLLOWING) {
            this.container.insertBefore(this.draggingItem, afterElement);
        } else {
            this.container.appendChild(this.draggingItem);
        }
    }

    onDragEnd() {
        this.draggingItem?.classList.remove('dragging');
        this.draggingItem = null;
    }

    findInsertPosition(x) {
        return Array.from(this.container.children).reduce((closest, child) => {
            const rect = child.getBoundingClientRect();
            const offset = x - rect.left - rect.width / 2;
            return offset < 0 && offset > closest.offset ? { offset, element: child } : closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}
