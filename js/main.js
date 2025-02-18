// main.js

import { EditorCore } from './core.js';
import { DragHandler } from './drag.js';
import { Storage } from './storage.js';
import { UIHandler } from './ui.js';

// 初始化核心模块
const editor = new EditorCore();
const dragHandler = new DragHandler(editor.container);
const uiHandler = new UIHandler(editor);

// 加载已保存数据
const savedData = Storage.load();
if (savedData.length === 0) {
    // 如果没有保存的数据，创建一个默认分栏
    editor.createColumn('<p>默认分栏内容</p>');
    editor.container.classList.add('has-default-column');
} else {
    savedData.forEach(item => editor.createColumn(item.content, item.color));
}

// 悬停事件处理
editor.container.addEventListener('mouseenter', (e) => {
    const rect = editor.container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const containerWidth = rect.width;

    // 检查鼠标是否在分栏之间的间隙
    if (mouseX < 20 && mouseX > 0) {
        editor.container.classList.add('hover-left');
    } else if (mouseX > containerWidth - 20 && mouseX < containerWidth) {
        editor.container.classList.add('hover-right');
    }
});

editor.container.addEventListener('mouseleave', () => {
    editor.container.classList.remove('hover-left', 'hover-right');
});

editor.container.addEventListener('click', (e) => {
    const rect = editor.container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const containerWidth = rect.width;

    // 检查是否点击了分栏之间的间隙
    if ((mouseX < 20 && mouseX > 0) || (mouseX > containerWidth - 20 && mouseX < containerWidth)) {
        editor.createColumn('<p>新分栏内容</p>');
    }
});
