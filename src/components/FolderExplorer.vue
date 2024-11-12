<template>
    <div class="folder-explorer">
        <ul>
            <li @contextmenu.prevent="showMenuContext($event, folder)" v-for="folder in folders" :key="folder.id" @click="folderStore.fetchFolders(folder)">
                {{ folder.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useFolderStore } from '@/stores/folder';
import { useContextMenuStore } from '@/stores/context-menu';

const folderStore = useFolderStore();
const contextMenuStore = useContextMenuStore();

// Define props
const props = defineProps({
    folders: {
        type: Array,
        required: true
    }
});

const showMenuContext = (event, context) => {
    contextMenuStore.showMenu(event.clientX, event.clientY, context , false);
}

</script>
