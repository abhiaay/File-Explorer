import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useFolderStore } from './folder';

export const useContextMenuStore = defineStore('contextMenu', () => {
    const isVisible = ref(false);
    const position = ref({ x: 0, y: 0 });
    const data = ref(null);
    const folderStore = useFolderStore();
    const isDataContent = ref(true);

    const showMenu = (x, y, context, isContent = true) => {
        position.value = { x: x, y: y };
        isVisible.value = true;
        data.value = context;
        isDataContent.value = isContent;
    }

    const hideMenu = () => {
        isVisible.value = false;
    }

    const deleteContent = () => {
        folderStore.delete(data.value, isDataContent.value);
    }

    return {
        isVisible,
        position,
        showMenu,
        hideMenu,
        deleteContent
    }
});
