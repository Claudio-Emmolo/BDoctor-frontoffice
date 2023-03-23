import { reactive } from "vue";
import { DateTime } from "luxon";
import axios from 'axios';

export const store = reactive({
    /**
     * 
     * @param {*} imgPath - must be a string
     * @returns 
     */
    getImgPath(imgPath, type) {
        return new URL(`./assets/images/${imgPath}.${type}`, import.meta.url).href;
    },
    /**
     * 
     * @returns DateTime luxon
     */
    getLuxonDateTime() {
        return DateTime;
    },

    dataraw: [],
    specializationList: [],
    doctorList: [],


    getDataApi(location, params = { params: {} }, apiUri = 'http://127.0.0.1:8000/api/') {
        axios.get(apiUri + location, params)
            .then((response) => {
                store.dataraw = response.data.results;
                // console.log(store.dataraw); //To remove
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(() => {
                switch (location) {

                    case 'specializations':
                        store.specializationList = this.dataraw;
                        break;

                    case 'doctors':
                        store.doctorList = this.dataraw;
                        break;
                }
            });
    }
});