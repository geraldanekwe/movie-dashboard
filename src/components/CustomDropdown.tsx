interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

function CustomDropdown({
  value,
  options,
  onChange,
  isOpen,
  onToggle,
}: CustomDropdownProps) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between border-b border-[#191916]/30 bg-transparent px-2 py-3 text-left text-sm text-[#191916] outline-none transition-colors hover:border-[#B83E2E] focus:border-[#B83E2E]"
      >
        <span>{selectedOption?.label}</span>

        <span
          className={`text-[#B83E2E] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-30 mt-2 max-h-56 w-full overflow-y-auto overscroll-contain border border-[#191916]/15 bg-[#F2EFE7] py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                onToggle();
              }}
              className={`block w-full px-3 py-3 text-left text-sm transition-colors hover:bg-[#E5DED0] hover:text-[#B83E2E] ${
                option.value === value
                  ? "bg-[#E5DED0] font-semibold text-[#B83E2E]"
                  : "text-[#191916]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
