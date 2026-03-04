import { useId, useState, type ReactNode } from "react";
import Select, { components } from "react-select";

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
}



const Menu = ({ children }: { children: ReactNode }) => (
    <div
        style={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: "0 0 0 1px hsla(218, 50%, 10%, 0.1), 0 4px 11px hsla(218, 50%, 10%, 0.1)",
            marginTop: 8,
            position: "absolute",
            zIndex: 10,
            minWidth: "100%",
        }}
    >
        {children}
    </div>
);

const Blanket = ({ onClick }: { onClick: () => void }) => (
    <div
        style={{ bottom: 0, left: 0, top: 0, right: 0, position: "fixed", zIndex: 9 }}
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
    <div style={{ position: "relative" }}>
        {target}
        {isOpen ? <Menu>{children}</Menu> : null}
        {isOpen ? <Blanket onClick={onClose} /> : null}
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
}: CustomSelectProps) => {
    const selectId = id ?? useId();
    const [isOpen, setIsOpen] = useState(false);


    if (!enableCustomSearch) {
        return (
            <div>
                {label && (
                    <label htmlFor={selectId} className="block text-sm pb-1">
                        {label}
                    </label>
                )}
                <Select
                    inputId={selectId}
                    options={options}
                    value={value}
                    onChange={(selected) => onChange(selected as Option)}
                    isSearchable={isSearchable}
                    isMulti={isMulti}
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
                target={
                    <button
                        id={selectId}
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            backgroundColor: "white",
                            textAlign: "left",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            minHeight: "38px"
                        }}
                    >
                        <span>
                            {value
                                ? (isMulti && Array.isArray(value) ? `${value.length} items selected` : (value as Option).label)
                                : "Select..."}
                        </span>
                        <ChevronDown />
                    </button>
                }
            >
                <Select
                    autoFocus
                    backspaceRemovesValue={false}
                    components={{ DropdownIndicator: SearchIcon, IndicatorSeparator: null }}
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
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            margin: 8,
                            minWidth: 240,
                        }),
                        menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
                    }}
                />
            </Dropdown>
        </div>
    );
};

export default CustomSelect;



const SearchIcon = () => (
    <div style={{ color: "gray", height: 24, width: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    </div>
);

const ChevronDown = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" focusable="false" role="presentation" style={{ marginRight: -6 }}>
        <path
            d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);