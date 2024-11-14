import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useFileStore = defineStore('file', () => {
    const formData = ref({
        name: ''
    });

    const create = async (name, folder = null) => {
        try {
            formData.value.name = name;
            if (folder) {
                formData.value.folder_id = folder.id;
            }
            const response = await axios.post('http://localhost:8000/api/file', formData.value);

        } catch (e) {
            alert('something happen');
            console.log(e);
        }
    }

    return {
        create,
    }
});
