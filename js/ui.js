export class UIHandler {
    constructor(editorCore) {
        this.editor = editorCore;
        this.activeColumn = null; 
        this.colorPicker = document.querySelector('.color-picker');
        
        this.initColumnFocus();     // 分栏聚焦逻辑
        this.initColorSelection();  // 颜色选择逻辑
        this.bindKeyboardEvents();  // 快捷键支持
    }

    initColumnFocus() {
        document.addEventListener('click', (e) => {
            const targetCol = e.target.closest('.column');
            if (!targetCol) return;
            this.setActiveColumn(targetCol);
        });
    }

    setActiveColumn(col) {
        this.clearAllActiveStates();
        this.activeColumn = col;
        col.classList.add('active');
        setTimeout(() => col.focus(), 50);
    }

    initColorSelection() {
        this.colorPicker.innerHTML = this.editor.colors
            .map(c => `<div class="color-option" data-color="${c}" style="--col:${c}"></div>`)
            .join('');

        this.colorPicker.addEventListener('click', (e) => {
            const colorOpt = e.target.closest('.color-option');
            if (!colorOpt) return;

            const selectedColor = colorOpt.dataset.color;
            this.applyColorToActiveColumn(selectedColor);
        });
    }

    applyColorToActiveColumn(color) {
        if (!this.activeColumn) {
            alert('⚠️ 请先点击选中要标记的分栏！');
            return;
        }

        this.activeColumn.style.setProperty('--col-bg', color);
        this.activeColumn.dataset.color = color;

        this.addColorTagIndicator();
    }

    bindKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Escape':
                    this.clearAllActiveStates();
                    break;
                case 'Delete':
                    if (this.activeColumn) this.activeColumn.remove();
                    break;
            }
        });
    }

    clearAllActiveStates() {
        this.activeColumn = null;    
        document.querySelectorAll('.column.active').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.color-option.active').forEach(opt => opt.classList.remove('active'));
    }

    addColorTagIndicator() {
        const tagId = 'color-tag-indicator';
        let tag = this.activeColumn.querySelector(`#${tagId}`);
        if (!tag) {
            tag = document.createElement('div');
            tag.id = tagId;
            tag.style.cssText = `
                position: absolute; 
                top: 8px; 
                right: 8px; 
                width: 8px; 
                height: 8px; 
                border-radius: 50%; 
                border: 1px solid rgba(0,0,0,0.1);
            `;
            this.activeColumn.append(tag);
        }
        tag.style.background = getComputedStyle(this.activeColumn).getPropertyValue('--col-bg');
    }
}
