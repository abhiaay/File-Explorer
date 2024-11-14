<template>
    <div class="folder-explorer">
        <ul>
            <li @contextmenu.prevent="showMenuContext($event, folder)" v-for="folder in folderStore.folders" :key="folder.id" @click="folderStore.fetchFolders(folder)">
                <font-awesome-icon icon="fa-solid fa-folder" />
                {{ folder.name }}
            </li>
            <li @contextmenu.prevent="showMenuContext($event, folder)" v-for="file in folderStore.files" :key="file.id" @click="folderStore.fetchFolders(folder)">
                <font-awesome-icon icon="fa-solid fa-file" />
                {{ file.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useFolderStore } from '@/stores/folder';
import { useContextMenuStore } from '@/stores/context-menu';

const folderStore = useFolderStore();
const contextMenuStore = useContextMenuStore();

const showMenuContext = (event, context) => {
    contextMenuStore.showMenu(event.clientX, event.clientY, context , false);
}

</script>
