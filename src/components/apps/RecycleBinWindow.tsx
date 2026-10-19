import React, { useState } from 'react';
import { Trash2, RotateCcw, AlertCircle, Info } from 'lucide-react';
import { useWindowStore } from '../../store/windowStore';
import { RecycleItem } from '../../data';
import { AppIconRenderer } from '../common/OSIcons';

export const RecycleBinWindow: React.FC = () => {
  const { recycleBinItems, emptyRecycleBin, restoreRecycleBin } = useWindowStore();
  const [selectedItem, setSelectedItem] = useState<RecycleItem | null>(null);

  return (
    <div className="flex-1 flex flex-col bg-white select-none h-full font-sans text-xs">
      {/* Toolbar */}
      <div className="bg-[#f0f4f9] border-b border-[#d5dee8] px-2 py-1.5 flex items-center justify-between shrink-0 text-[11px]">
        <div className="flex items-center space-x-2">
          <button
            onClick={emptyRecycleBin}
            disabled={recycleBinItems.length === 0}
            className="aero-button px-3 py-1 rounded text-gray-800 disabled:opacity-40 flex items-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <Trash2 size={13} className="text-red-600" />
            <span>Empty the Recycle Bin</span>
          </button>

          <button
            onClick={restoreRecycleBin}
            disabled={recycleBinItems.length > 0}
            className="aero-button px-3 py-1 rounded text-gray-800 disabled:opacity-40 flex items-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <RotateCcw size={13} className="text-blue-600" />
            <span>Restore Default Items</span>
          </button>
        </div>

        <div className="text-gray-500">
          {recycleBinItems.length} {recycleBinItems.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto p-2">
        {recycleBinItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-2">
            <AppIconRenderer type="recycle_bin" size={64} className="opacity-40" />
            <h3 className="font-semibold text-gray-700 text-sm">Recycle Bin is Empty</h3>
            <p className="text-gray-500 text-xs max-w-xs">
              All obsolete legacy spaghetti, bloated node_modules, and 3 AM bugs have been permanently vaporized!
            </p>
            <button
              onClick={restoreRecycleBin}
              className="mt-3 aero-button px-4 py-1 text-xs text-blue-900 rounded cursor-pointer"
            >
              Restore deleted artifacts
            </button>
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-normal">
                <th className="py-1 px-2 font-medium">Name</th>
                <th className="py-1 px-2 font-medium">Original Location</th>
                <th className="py-1 px-2 font-medium">Date deleted</th>
                <th className="py-1 px-2 font-medium">Size</th>
                <th className="py-1 px-2 font-medium">Item Type</th>
              </tr>
            </thead>
            <tbody>
              {recycleBinItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`cursor-pointer border-b border-gray-100 ${
                      isSelected ? 'bg-sky-100 text-sky-900' : 'hover:bg-sky-50'
                    }`}
                  >
                    <td className="py-1.5 px-2 flex items-center space-x-2">
                      <AppIconRenderer type="notepad" size={16} />
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </td>
                    <td className="py-1.5 px-2 text-gray-500">{item.originalLocation}</td>
                    <td className="py-1.5 px-2 text-gray-500">{item.dateDeleted}</td>
                    <td className="py-1.5 px-2 text-gray-500">{item.size}</td>
                    <td className="py-1.5 px-2 text-gray-500">{item.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Selected Item Detail / Easter Egg Joke Box */}
      {selectedItem && (
        <div className="bg-[#fffbeb] border-t border-amber-300 p-2.5 flex items-start space-x-2 shrink-0 text-[11px] text-amber-900">
          <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Deleted Item Note:</strong> {selectedItem.humorNote}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-[#f0f0f0] border-t border-[#dfdfdf] px-3 py-1 flex items-center justify-between shrink-0 text-[11px] text-gray-500">
        <span>Recycle Bin &bull; Windows 7 Aero File Graveyard</span>
        <span>Recycle Bin Storage: 2.41 GB</span>
      </div>
    </div>
  );
};
