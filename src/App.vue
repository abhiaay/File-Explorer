<!-- src/App.vue -->
<template>
  <div id="app" class="windows-explorer">
    <FolderExplorer :folders="folders" @folderSelected="loadFolderContents" />
    <FolderContents v-if="selectedFolder" :currentFolder="selectedFolder" />
  </div>
</template>

<script>
import { ref } from 'vue';
import FolderExplorer from './components/FolderExplorer.vue';
import FolderContents from './components/FolderContents.vue';

export default {
  name: 'App',
  components: {
    FolderExplorer,
    FolderContents
  },
  setup() {
    const folders = ref([
      {
        id: 1,
        name: 'Documents',
        subfolders: [
          { id: 2, name: 'Work' },
          { id: 3, name: 'Personal' }
        ],
        files: [{ id: 1, name: 'Resume.pdf' }, { id: 2, name: 'Report.docx' }]
      },
      {
        id: 4,
        name: 'Downloads',
        subfolders: [
          { id: 5, name: 'Photos' },
          { id: 6, name: 'Videos' }
        ],
        files: [{ id: 3, name: 'file.zip' }, { id: 4, name: 'image.jpg' }]
      }
    ]);

    const selectedFolder = ref(null);

    const loadFolderContents = (folder) => {
      console.log(folder);
      selectedFolder.value = folder;
    };

    return {
      folders,
      selectedFolder,
      loadFolderContents
    };
  }
};
</script>

<style scoped>
.windows-explorer {
  display: flex;
  height: 100vh;
}
</style>
