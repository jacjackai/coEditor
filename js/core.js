export class EditorCore {
    constructor() {
        this.container = document.querySelector('.editor-container');
        this.colors = ['#fff', '#ffeb3b', '#a5d6a7', '#90caf9'];
    }
    
    createColumn(content = '<p>随时开始编辑 ✍️</p>', color = '#fff') {
        const col = document.createElement('div');
        col.className = 'column';
        col.draggable = true;
        col.innerHTML = content;
        col.style.setProperty('--col-bg', color);
        this.container.appendChild(col);
        return col;
    }

    setActive(col) {
        this.clearActive();
        col.classList.add('active');
    }

    clearActive() {
        this.container.querySelectorAll('.column').forEach(c => c.classList.remove('active'));
    }
}
