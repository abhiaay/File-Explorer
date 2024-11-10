<!-- src/components/FolderExplorer.vue -->
<template>
    <div class="folder-explorer">
        <ul>
            <li v-for="folder in folders" :key="folder.id" @click="selectFolder(folder)">
                {{ folder.name }}
                <!-- <FolderExplorer v-if="folder.subfolders" :folders="folder.subfolders" /> -->
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'FolderExplorer',
    props: {
        folders: Array
    },
    emits: ['folderSelected'],
    methods: {
        selectFolder(folder) {
            this.$emit('folderSelected', folder);
        }
    }
}
</script>

<style scoped>
.folder-explorer {
    padding: 10px;
    border-right: 2px solid #ccc;
    max-width: 300px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    cursor: pointer;
    padding: 5px 0;
}

li:hover {
    background-color: --blac;
}
</style>
