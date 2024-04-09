import { useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import { explorerData } from "./data/folderData";
import useDoItemHandling from "./customhooks/useDoItemHandling";

function App() {
  const [explorer, setExplorer] = useState(explorerData);
  const { insertItem, editItem, deleteItem } = useDoItemHandling();
  const handleAddItem = (folderId, item, isFolder) => {
    const modifiedTree = insertItem(explorer, folderId, item, isFolder);
    setExplorer(modifiedTree);
  };
  const handleEditItem = (folderId, item, isFolder) => {
    const modifiedTree = editItem(explorer, folderId, item);
    setExplorer(modifiedTree);
  };
  const handleDeleteItem = (folderId) => {
    const modifiedTree = deleteItem(explorer, folderId);
    setExplorer(modifiedTree);
  };
  return (
    <div className="App">
      <Folder
        explorer={explorer}
        handleAddItem={handleAddItem}
        handleEditItem={handleEditItem}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default App;
