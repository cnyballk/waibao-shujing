const prefix = "designSphere_";
function getLocalStoreConfig(key: string) {
  return localStorage.getItem(prefix + key);
}

function setLocalStoreConfig(key: string, value: string) {
  localStorage.setItem(prefix + key, value);
}

function removeLocalStoreConfig(key: string) {
  localStorage.removeItem(prefix + key);
}

export { getLocalStoreConfig, setLocalStoreConfig, removeLocalStoreConfig };
