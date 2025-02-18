export class Storage {
    static save(columns) {
        const data = Array.from(columns).map(col => ({
            content: col.innerHTML,
            color: getComputedStyle(col).getPropertyValue('--col-bg').trim()
        }));
        localStorage.setItem('editorData', JSON.stringify(data));
    }

    static load() {
        return JSON.parse(localStorage.getItem('editorData') || '[]');
    }
}
