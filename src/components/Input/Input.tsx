import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  required?: boolean;
  value?: string;
  onChange: any;
  variant: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      name,
      value,
      onChange,
      required,
      variant,
      ...props
    },
    ref
  ) => {
    const handleChange = (e) => {
      const newValue = e.target.value;
      onChange(name, newValue); // Pass the updated value to the parent component
    };
    return (
      <div className="relative  w-full">
        {variant !== "outline" ? (
          <>
            <input
              {...props}
              value={value} // Set value to reflect the current value of the input field
              onChange={(e) => onChange(name, e.target.value)}
              placeholder={name}
              type={type}
              className="peer  w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              {label}
              {required && <span> *</span>}
            </label>
          </>
        ) : (
          <>
            <label className="font-medium text-sm">{label}</label>

            <input
              {...props}
              value={value} // Set value to reflect the current value of the input field
              onChange={handleChange}
              placeholder={label}
              type={type}
              className=" mt-1  w-full ml-1 border-[#333] border-2 border-b-4 rounded-lg px-3 py-2"
            />
          </>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
