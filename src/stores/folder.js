import { defineStore } from 'pinia';
import axios from 'axios';
import { toRaw } from 'vue';

export const useFolderStore = defineStore('folder', {
    state: () => ({
        formData: {
            name: '',
        },
        folders: [],    // Store the list of folders
        files: [],
        selectedFolder: null,
        subFolders: [],
        breadCrumbs: [],
        loading: false, // Flag to track loading state
        index: 0,
        error: null,    // Store any error
    }),

    actions: {
        fetchSubFolders(folder) {
            this.breadCrumbs.push(folder);
            this.folders = this.subFolders;
            this.index++;
        },
        async root() {
            this.subFolders = [];
            this.breadCrumbs = [];
            this.folders = [];
            this.index = 0;

            this.fetchFolders();
        },
        async fetchFolders(folder, isSubfolder = false) {
            this.loading = true;
            this.error = null;

            try {
                let response;
                if (folder) {
                    if (isSubfolder) {
                        this.fetchSubFolders(folder);
                    }
                    if (this.breadCrumbs.length > 0) {
                        this.breadCrumbs[this.breadCrumbs.length - 1] = folder;
                    } else {
                        this.breadCrumbs.push(folder);
                    }
                    response = await axios.get(`http://localhost:8000/api/folder/${folder.id}`); // Replace with your API URL
                    // this.folders = response.data.data; // Assume the API returns a list of folders
                    if (response.data.data.sub_folders) {
                        this.subFolders = response.data.data.sub_folders;
                    } else {
                        this.subFolders = [];
                    }
                } else {
                    response = await axios.get('http://localhost:8000/api/folder'); // Replace with your API URL
                    this.folders = response.data.data.folders; // Assume the API returns a list of folders
                }

                if (response?.data?.data?.files) {
                    this.files = response.data.data.files;
                }
            } catch (error) {
                console.log(error)
                this.error = 'Failed to fetch folders';
            } finally {
                this.loading = false;
            }
        },
        backBreadcrumb(folder, index) {
            this.breadCrumbs = this.breadCrumbs.slice(0, index + 1);
            if (this.breadCrumbs.length === 1) {
                this.fetchFolders();
            }
            this.subFolders = folder.sub_folders;
            // console.log(folder);
        },
        async create(name) {
            try {
                this.formData.name = name;
                if (this.currentFolder) {
                    this.formData.parent = this.currentFolder.id;
                }
                const response = await axios.post('http://localhost:8000/api/folder', this.formData)
                if (this.currentFolder) {
                    this.subFolders.push(response.data.data);
                } else {
                    this.folders.push(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async delete(folder, isContent = true) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/folder/${folder.id}`);
                if (response.status === 204) {
                    if (isContent) {
                        this.subFolders = this.subFolders.filter(item => item.id !== folder.id);
                    } else {
                        this.folders = this.folders.filter(item => item.id !== folder.id);
                        if (this.currentFolder.id === folder.id) {
                            this.subFolders = [];
                            this.breadCrumbs.pop();
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    },

    getters: {
        currentFolder: (state) => {
            return state.breadCrumbs[state.breadCrumbs.length - 1];
        },
        getFoldersCount: (state) => state.folders.length,
    },
});
