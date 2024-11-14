<!-- src/components/FolderContents.vue -->
<template>
    <div class="folder-contents">
        <!-- <h2>{{ currentFolder.name }} Contents</h2> -->
        <ul class="breadcrumbs" v-if="folderStore.breadCrumbs.length > 0">
            <li class="breadcrumbs__content" @click="folderStore.root()">
                <span>Root</span>
            </li>
            <li v-for="(folder, index) in folderStore.breadCrumbs" @click="folderStore.backBreadcrumb(folder, index)"
                class="breadcrumbs__content" :key="folder.id">
                <span> {{ folder.name }}</span>
            </li>
        </ul>
        <div class="folder-contents__subfolder"
            v-if="subFolders && subFolders.length && folderStore.subFolders.length > 0">
            <table class="table-container">
                <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Type</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    <tr @contextmenu.prevent="showMenuContext($event, folder)" v-for="folder in subFolders" :key="folder.id" @click="folderStore.fetchFolders(folder, true)">
                        <td>
                            <font-awesome-icon icon="fa-solid fa-folder" />
                            {{ folder.name }}
                        </td>
                        <td>Folder</td>
                        <td>-</td>
                    </tr>
                    <tr @contextmenu.prevent="showMenuContext($event, file)" v-for="file in folderStore.files" :key="file.id">
                        <td>
                            <font-awesome-icon icon="fa-solid fa-file" />
                            {{ file.name }}
                        </td>
                        <td>File</td>
                        <td>
                            {{ file.size / 1000000 }}
                            MB
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { useFolderStore } from '@/stores/folder';
import { useContextMenuStore } from '@/stores/context-menu';

const folderStore = useFolderStore();
const contextMenuStore = useContextMenuStore();

const props = defineProps({
    subFolders: {
        type: Array
    }
});

const showMenuContext = (event, folder) => {
    contextMenuStore.showMenu(event.clientX, event.clientY, folder );
}
</script>
