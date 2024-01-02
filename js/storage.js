const STORAGE_TOKEN = 'EZL7VNG9X06E5ORKUII9TVQDE5ITMU5G46RYTJ6F';
const STORAGE_URL =  'https://remote-storage.developerakademie.org/item';


async function setItem(key , value){
    const payload = { key , value , token: STORAGE_TOKEN};
    return fetch(STORAGE_URL, {method : 'POST' , body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

/**
 * This function deletes all elements of the array allTasks
 */
function deleteAllTasks() {
    allTasks = [];
    setItem('allTasks', JSON.stringify(allTasks))
        .then(() => {
            console.log('All Tasks data cleared successfully.');
        })
        .catch(error => {
            console.error('Error clearing users data:', error);
        });
}