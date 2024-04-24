


// set storage
export function setSessionStorageItem(key, value) {

    sessionStorage.setItem(key, value)
    console.log(typeof(value))

}

// get storage
export function getSessionStorageItem(key) {
  return  sessionStorage.getItem(key)
}


