<!-- src/App.vue -->
<template>
  <div id="app" @click="contextMenuStore.hideMenu">
    <FolderActions />
    <div class="windows-explorer">
      <FolderExplorer :folders="folderStore.folders"  />
      <FolderContents :subFolders="folderStore.subFolders" />
    </div>
    <Modal id="createFolder" title="Create Folder" continue-text="Save" @save="() => createFolder()">
      <div class="form-floating mb-3">
        <input type="text" v-model="createFolderName" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Folder Name</label>
      </div>
    </Modal>
    <Modal id="createFile" title="Create File" continue-text="Save" @save="() => createFile()">
      <div class="form-floating mb-3">
        <input type="text" v-model="createFileName" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">File Name</label>
      </div>
    </Modal>
    <ContextMenu :menuPosition="contextMenuStore.position" :isMenuVisible="contextMenuStore.isVisible">
        <li>
            <button @click.prevent="() => { MicroModal.show('delete') }" class="btn btn-link">Delete</button>
        </li>
    </ContextMenu>
    <Modal id="delete" title="Delete" continue-text="Delete" @save="deleteContent">
        <p>Are you sure you want to delete the contents of this folder?</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FolderActions from './components/FolderActions.vue';
import FolderExplorer from './components/FolderExplorer.vue';
import FolderContents from './components/FolderContents.vue';
import { useFolderStore } from '@/stores/folder';
import { useFileStore } from './stores/file';
import ContextMenu from './components/parts/ContextMenu.vue';
import Modal from '@/components/Modal.vue';
import MicroModal from 'micromodal';
import { useContextMenuStore } from './stores/context-menu';

const folderStore = useFolderStore();
const fileStore = useFileStore();
const contextMenuStore = useContextMenuStore();

const createFolderName = defineModel('folder-name');
const createFileName = defineModel('file-name');

onMounted(() => {
  folderStore.fetchFolders();
});


const createFolder = () => {
  folderStore.create(createFolderName);
  createFolderName.value = null;
  MicroModal.close('createFolder');
}

const createFile = () => {
  fileStore.create(createFileName, folderStore.currentFolder);
  createFileName.value = null;
  MicroModal.close('createFile');
}

const deleteContent = () => {
  contextMenuStore.deleteContent();
  MicroModal.close();
  contextMenuStore.hideMenu();
}
</script>
