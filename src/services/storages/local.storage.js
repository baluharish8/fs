


// set storage
export function setLocalStorageItem(key, value) {
    console.log(typeof(value))
    console.log(JSON.stringify(value))
    if(typeof(value)=="object"){
        value=JSON.stringify(value)
        console.log(typeof(value))
    }
    localStorage.setItem(key, value)
    console.log(typeof(value))

}

// get storage
export function getLocalStorageItem(key) {
  return  localStorage.getItem(key)
}

// remove storage
export function removeLocalStorageItem(key) {
    localStorage.removeItem(key)
}
export function removeLocalStorage() {
    localStorage.clear();
}