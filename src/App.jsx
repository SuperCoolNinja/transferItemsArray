/* eslint-disable react/prop-types */
import { useState } from "react";

function App() {
  const [sourceItems, setSourceItems] = useState([
    {
      id: 1,
      item: "foo",
    },
    {
      id: 2,
      item: "bar",
    },
    {
      id: 3,
      item: "baz",
    },
  ]);

  const [targetItems, setTargetItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleTransferItems = (direction) => {
    if (direction === "sourceToTarget") {
      const selectedSourceItems = sourceItems.filter((item) =>
        selectedItems.includes(item.id)
      );
      setTargetItems([...targetItems, ...selectedSourceItems]);
      setSourceItems(
        sourceItems.filter((item) => !selectedItems.includes(item.id))
      );
    } else if (direction === "targetToSource") {
      const selectedTargetItems = targetItems.filter((item) =>
        selectedItems.includes(item.id)
      );
      setSourceItems([...sourceItems, ...selectedTargetItems]);
      setTargetItems(
        targetItems.filter((item) => !selectedItems.includes(item.id))
      );
    }

    setSelectedItems([]);
  };

  const handleItemSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  return (
    <div className="flex p-72 mx-auto">
      <Source
        data={sourceItems}
        onTransfer={() => handleTransferItems("sourceToTarget")}
        onItemSelection={handleItemSelection}
        selectedItems={selectedItems}
      />
      <Target
        data={targetItems}
        onTransfer={() => handleTransferItems("targetToSource")}
        onItemSelection={handleItemSelection}
        selectedItems={selectedItems}
      />
    </div>
  );
}

function Source({ data, onTransfer, onItemSelection, selectedItems }) {
  return (
    <div className="w-1/2 mx-4">
      <p className="text-center text-3xl font-semibold">Array Source</p>
      <div className="border-solid border-2 p-4 rounded-md">
        <ListItems
          data={data}
          onItemSelection={onItemSelection}
          selectedItems={selectedItems}
        />
      </div>
      <button
        type="button"
        onClick={() => onTransfer("sourceToTarget")}
        className="block mx-auto text-1xl bg-slate-600 p-4 rounded-lg m-2 text-[#fff] font-bold"
      >
        Transfer to target
      </button>
    </div>
  );
}

function Target({ data, onTransfer, onItemSelection, selectedItems }) {
  return (
    <div className="w-1/2 mx-4">
      <p className="text-center text-3xl font-semibold">Array Target</p>
      <div className="border-solid border-2 p-4 rounded-md">
        <ListItems
          data={data}
          onItemSelection={onItemSelection}
          selectedItems={selectedItems}
        />
      </div>

      <button
        type="button"
        onClick={() => onTransfer("targetToSource")}
        className="block mx-auto text-1xl bg-slate-600 p-4 rounded-lg m-2 text-[#fff] font-bold"
      >
        Transfer to source
      </button>
    </div>
  );
}

function ListItems({ data, onItemSelection, selectedItems }) {
  return (
    <div>
      <ul>
        {data.map((v) => (
          <div className="flex items-center justify-center" key={v.id}>
            <input
              onChange={() => onItemSelection(v.id)}
              className="hover:cursor-pointer"
              type="checkbox"
              checked={selectedItems.includes(v.id)}
            />
            <li className="w-1/2 border border-[#1f1e1e41] m-2 p-2 rounded-lg  text-1xl">
              {v.item}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
