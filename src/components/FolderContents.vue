<!-- src/components/FolderContents.vue -->
<template>
    <div class="folder-contents">
        <h2>{{ currentFolder.name }} Contents</h2>
        <div v-if="currentFolder.subfolders && currentFolder.subfolders.length">
            <h3>Subfolders:</h3>
            <ul>
                <li v-for="folder in currentFolder.subfolders" :key="folder.id">
                    {{ folder.name }}
                </li>
            </ul>
        </div>
        <div v-if="currentFolder.files && currentFolder.files.length">
            <h3>Files:</h3>
            <ul>
                <li v-for="file in currentFolder.files" :key="file.id">
                    {{ file.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FolderContents',
    props: {
        currentFolder: Object
    }
}
</script>

<style scoped>
.folder-contents {
    padding: 10px;
}

h2 {
    font-size: 18px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 5px 0;
}

li:hover {
    background-color: #f0f0f0;
}
</style>
