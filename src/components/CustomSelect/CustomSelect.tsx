import { useId, useState, useRef, useEffect } from "react";
import Select, { components, type MenuListProps } from "react-select";

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
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto focus search when menu opens

    useEffect(() => {
        if (menuOpen && enableCustomSearch) {
            inputRef.current?.focus();
        }
    }, [menuOpen, enableCustomSearch]);

    const filteredOptions = enableCustomSearch
        ? options.filter((option) =>
            option.label.toLowerCase().includes(search.toLowerCase())
        )
        : options;

    const CustomMenuList = (props: MenuListProps<Option>) => (
        <components.MenuList {...props}>
            <div style={{ padding: "8px" }}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{ width: "100%", padding: "6px", marginBottom: "8px" }}
                />
            </div>
            {props.children}
        </components.MenuList>
    );

    return (
        <div>
            {label && (
                <label htmlFor={selectId} className="block text-sm pb-1">
                    {label}
                </label>
            )}

            <Select
                inputId={selectId}
                options={filteredOptions}
                value={value}
                onChange={(selected) => onChange(selected as Option)}
                isSearchable={!enableCustomSearch && isSearchable}
                isMulti={isMulti}
                components={
                    enableCustomSearch
                        ? { MenuList: CustomMenuList }
                        : undefined
                }
                menuIsOpen={menuOpen}
                onMenuOpen={() => setMenuOpen(true)}
                onMenuClose={() => {
                    setMenuOpen(false);
                    setSearch("");
                }}
            />
        </div>
    );
};

export default CustomSelect;