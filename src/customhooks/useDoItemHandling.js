function useDoItemHandling() {
  function insertItem(explorer, folderId, item, isFolder) {
    if (explorer.id === folderId && explorer.isFolder) {
      explorer.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });
      return explorer;
    }
    let latestNode = [];
    latestNode = explorer.items.map((obj) => {
      return insertItem(obj, folderId, item, isFolder);
    });
    return { ...explorer, items: latestNode };
  }
  function editItem(explorer, folderId, item) {
    if (explorer.id === folderId) {
      explorer.name = item;
      return explorer;
    }
    let updatedNode = [];
    updatedNode = explorer.items.map((obj) => {
      return editItem(obj, folderId, item);
    });
    return { ...explorer, items: updatedNode };
  }

  function deleteItem(explorer, folderId) {
    if (explorer.id === folderId) {
      return null;
    }
    let filteredTree = [];
    filteredTree = explorer.items
      .filter((item) => item.id !== folderId)
      .map((item) => deleteItem(item, folderId));
    return { ...explorer, items: filteredTree };
  }
  return { insertItem, editItem, deleteItem };
}
export default useDoItemHandling;
