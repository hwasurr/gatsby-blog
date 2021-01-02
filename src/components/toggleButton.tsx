import React from 'react';

export interface ToggleButtonProps {
  toggleValue: boolean;
  handleToggle: () => void;
}
export default function ToggleButton({
  toggleValue,
  handleToggle
}: ToggleButtonProps): JSX.Element {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
      <span>다크모드</span>
      <input
        onClick={handleToggle}
        checked={toggleValue}
        type="checkbox"
        style={{
          outline: 'none',
          width: 25,
          height: 15,
        }}
      />
    </div>
  );
}
