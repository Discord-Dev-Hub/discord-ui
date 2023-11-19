import React from 'react';

export const SettingSection: React.FC<{ name: string; onOpen?: () => void }> = ({
  name,
  onOpen,
}) => {
  return (
    <div
      onClick={onOpen}
      className="cursor-pointer w-full px-2 py-2 rounded-sm group hover:bg-buttonPrimary transition-all duration-150"
    >
      <p className="text-gray-400 text-sm font-semibold group-hover:text-white transition-all duration-150">
        {name}
      </p>
    </div>
  );
};
