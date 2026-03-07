import { useId, useState, type ReactNode } from "react";
import Select, {
  type GroupBase,
  type SelectComponentsConfig,
} from "react-select";

export type Option = {
  label: string;
  value: string;
};

interface CustomSelectProps {
  id?: string;
  label?: string;
  options: Option[];
  value: Option | null;
  onChange: (option: Option | null) => void;
  isMulti?: boolean;
  isSearchable?: boolean;
  enableCustomSearch?: boolean;
  components?: SelectComponentsConfig<Option, boolean, GroupBase<Option>>;
}

const ZINDEX_MENU = 10;

const Menu = ({ children }: { children: ReactNode }) => (
  <div
    className="min-w-full bg-white rounded-sm border border-gray-200 shadow-sm mt-2 absolute"
    style={{
      zIndex: ZINDEX_MENU,
    }}
  >
    {children}
  </div>
);

const Blanket = ({ onClick }: { onClick: () => void }) => (
  <div
    className="fixed inset-0"
    style={{
      zIndex: ZINDEX_MENU - 1,
    }}
    onClick={onClick}
  />
);

const Dropdown = ({
  children,
  isOpen,
  target,
  onClose,
}: {
  children?: ReactNode;
  isOpen: boolean;
  target: ReactNode;
  onClose: () => void;
}) => (
  <div className="relative">
    {target}
    {isOpen ? (
      <>
        <Menu>{children}</Menu>
        <Blanket onClick={onClose} />
      </>
    ) : null}
  </div>
);

const CustomSelect = ({
  id,
  label,
  options,
  value,
  onChange,
  isMulti = false,
  isSearchable = true,
  enableCustomSearch = false,
  components = {},
}: CustomSelectProps) => {
  const selectId = id ?? useId();
  const [isOpen, setIsOpen] = useState(false);

  const mergedComponents = {
    DropdownIndicator: SearchIcon,
    IndicatorSeparator: null,
    ...components,
  };

  const fakeInput = (
    <button
      id={selectId}
      type="button"
      onClick={() => setIsOpen((prev) => !prev)}
      className="w-full p-2 bg-white rounded-sm border border-gray-200 flex items-center justify-between gap-2 min-h-10 overflow-hidden outline-offset-0 outline-blue-100 focus-visible:outline-2 focus-visible:border-blue-500"
    >
      <span
        className={`flex-1 text-sm text-left truncate ${
          value ? "font-medium text-black" : "text-gray-400"
        }`}
      >
        {value
          ? isMulti && Array.isArray(value)
            ? `${value.length} items selected`
            : (value as Option).label
          : "Select..."}
      </span>
      <div className="shrink-0">
        <ChevronDown />
      </div>
    </button>
  );

  if (!enableCustomSearch) {
    return (
      <div>
        {label && (
          <label htmlFor={selectId} className="block text-sm pb-1">
            {label}
          </label>
        )}
        <Select
          unstyled
          inputId={selectId}
          options={options}
          value={value}
          onChange={(selected) => onChange(selected as Option)}
          isSearchable={isSearchable}
          isMulti={isMulti}
          components={mergedComponents}
          classNames={{
            control: (state) =>
              `px-2 rounded-sm border text-sm ${
                state.isFocused
                  ? "!outline-2 outline-offest-0 !outline-blue-200 border-blue-500"
                  : "border-gray-200"
              }`,
            placeholder: () => "text-gray-400",
            menu: () => "p-1 mt-1.5 border border-gray-200 shadow-sm rounded-sm",
            menuList: () => "space-y-1 !max-h-[250px]",
            option: (state) =>
              `rounded-sm p-1 transition-colors duration-150 ease-in ${
                state.isSelected ? "bg-blue-200" : "hover:bg-gray-100"
              } ${state.isFocused ? "bg-blue-100" : ""}`,
            noOptionsMessage: () => "py-10 text-sm text-gray-400",
          }}
        />
      </div>
    );
  }

  return (
    <div>
      {label && (
        <label htmlFor={selectId} className="block text-sm pb-1">
          {label}
        </label>
      )}
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        target={fakeInput}
      >
        <Select
          unstyled
          autoFocus
          backspaceRemovesValue={false}
          components={mergedComponents}
          controlShouldRenderValue={false}
          hideSelectedOptions={false}
          isClearable={false}
          menuIsOpen={true}
          onChange={(newValue) => {
            onChange(newValue as Option | null);
            if (!isMulti) setIsOpen(false);
          }}
          options={options}
          placeholder="Search..."
          tabSelectsValue={false}
          value={value}
          isMulti={isMulti}
          classNames={{
            control: (state) =>
              `m-1.5 px-2 rounded-sm border text-sm ${
                state.isFocused
                  ? "!outline-2 outline-offest-0 !outline-blue-200 border-blue-500"
                  : "border-gray-200"
              }`,
            placeholder: () => "text-gray-400",
            menu: () => "!static p-1 border-t border-gray-200",
            menuList: () => "space-y-1 !max-h-[250px]",
            option: (state) =>
              `rounded-sm p-1 transition-colors duration-150 ease-in ${
                state.isSelected ? "bg-blue-200" : "hover:bg-gray-100"
              } ${state.isFocused ? "bg-blue-100" : ""}`,
            noOptionsMessage: () => "py-10 text-sm text-gray-400",
          }}
        />
      </Dropdown>
    </div>
  );
};

export default CustomSelect;

const SearchIcon = () => (
  <div
    style={{
      color: "gray",
      height: 24,
      width: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </div>
);

const ChevronDown = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
  >
    <path
      d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
