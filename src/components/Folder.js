import React, { useState } from "react";

function Folder({ explorer, handleAddItem, handleEditItem, handleDeleteItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputFieldData, setInputFieldData] = useState({
    isVisible: false,
    isFolder: false,
    isEdit: false,
  });
  const handleFolderClick = (event) => {
    setIsExpanded(!isExpanded);
    event.stopPropagation();
  };
  const handleAddBtnClick = (event, isFolder, isEdit) => {
    event.stopPropagation();
    setInputFieldData({
      isVisible: true,
      isFolder,
      isEdit,
    });
  };
  const handleDelete = () => {
    handleDeleteItem(explorer.id);
  };
  const handleAddNode = (event) => {
    if (event.keyCode === 13 && event.target.value.length > 0) {
      event.stopPropagation();
      setInputFieldData({
        ...inputFieldData,
        isVisible: false,
      });
      if (inputFieldData.isEdit)
        handleEditItem(
          explorer.id,
          event.target.value,
          inputFieldData.isFolder
        );
      else
        handleAddItem(explorer.id, event.target.value, inputFieldData.isFolder);
    }
  };
  if (explorer.isFolder) {
    return (
      <div className="folderParent" onClick={(e) => handleFolderClick(e)}>
        <div className="folder">
          <span> 📂 </span> {explorer.name}
          <button
            className="folderBtn"
            onClick={(event) => handleAddBtnClick(event, true, false)}
          >
            Folder +
          </button>
          <button
            className="folderBtn"
            onClick={(event) => handleAddBtnClick(event, false, false)}
          >
            File +
          </button>
          <button
            className="folderBtn"
            onClick={(event) => handleAddBtnClick(event, true, true)}
          >
            📝
          </button>
          <button
            className="folderBtn"
            onClick={(event) => handleDelete(event, false, false)}
          >
            ␡
          </button>
        </div>
        {inputFieldData.isVisible && (
          <div className="inputParent">
            <span>{inputFieldData.isFolder ? "📂" : "📔"}</span>
            <input
              type="text"
              className="input"
              autoFocus
              onBlur={() =>
                setInputFieldData({
                  ...inputFieldData,
                  isVisible: false,
                })
              }
              onKeyDown={handleAddNode}
            />
          </div>
        )}
        {isExpanded &&
          explorer.items?.map((item) => {
            return (
              <Folder
                explorer={item}
                key={item.id}
                handleAddItem={handleAddItem}
                handleEditItem={handleEditItem}
                handleDeleteItem={handleDeleteItem}
              />
            );
          })}
      </div>
    );
  } else {
    return <div className="file">📔 {explorer.name}</div>;
  }
}

export default Folder;
