import { useState } from "react";

type contactInputProps = {
    label: string;
    type?: string;
    placeholder?: string;
    multiline?: boolean;
}

export default function ContactInput({
    label,
    type = "text",
    placeholder,
    multiline,
} : contactInputProps) {

    const [focused, setFocused] = useState(false);
    const Tag = multiline ? "textarea" : "input";

    return (

        <div className="mb-4">

            <label className="
                block 
                text-[10px] text-white/30 
                tracking-[0.2em] font-mono 
                mb-1.75 uppercase
            ">
                {label}
            </label>

            <Tag className={`
                bg-white/4
                w-full  rounded-xl outline-none 
                px-3.75 py-3.25 
                text-white text-sm 
                transition-all duration-200 box-border
                ${multiline ? "font-mono resize-vertical min-h-31.25" : "resize-none"}
                ${focused
                    ? "border border-white/22 shadow-[0_0_0_3px_rgba(255,255,255,0.03)]"
                    : "border border-white/9 shadow-none"
                }
            `}
                type={type}
                placeholder={placeholder}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                rows={multiline ? 5 : undefined}
            />

        </div>

    );
}