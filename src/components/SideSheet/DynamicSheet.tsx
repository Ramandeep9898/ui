import { SheetContent, SheetTitle, SheetHeader } from "./SideSheet";
import { FormData, Field } from "../../types/Fields.type";
import { Chip } from "../Chip/Chip";
import { Input } from "../Input/Input";
import { Dropdown } from "../DropDown/DropDown";
import { v4 as uuid } from "uuid";
import { useEmployeeData } from "../../hooks/employeeDataContext";

import { useState } from "react";

type SheetPropsTypes = {
  department: string;
  config: any;
  initialState: any;
  onSubmit: any;
  flag: string;
};

export const DynamicSheet = ({
  department,
  config,
  initialState,
  onSubmit,
  flag,
}: SheetPropsTypes) => {
  const { dispatch } = useEmployeeData();

  const [formData, setFormData] = useState<FormData>(initialState);
  const handleInput = (key: string, value: string, teamId?: string) => {
    if (flag === "createTeam") {
      setFormData({
        ...formData,
        [key]: value,
        teamId: uuid(),
        department: department,
      });
    } else {
      setFormData({ ...formData, [key]: value, teamId: teamId || uuid() });
    }
  };

  // this component dynamically return components acc to config
  const DynamicComponentReturn: React.FC<{ field: Field }> = ({ field }) => {
    const componentOption: { [key: string]: JSX.Element } = {
      chip: <Chip chipInfo={field} onChange={handleInput} />,

      dropdown: (
        <Dropdown
          label={field.label}
          name={formData[field.name]}
          initialDropdownValue={field?.initialDropdownValue}
          onSelect={handleInput}
          dept={department}
        />
      ),
      input: (
        <Input
          label={field.label}
          name={field.name}
          value={formData[field.name]}
          type={field.inputType || "text"}
          required={field.required || false}
          onChange={handleInput}
        />
      ),
    };

    return componentOption[field.element];
  };

  const submitHandler = () => {
    if (flag === "edit") {
      // call dispatch
      dispatch({ ...formData, type: "EDIT_MEMBER" });
    } else {
      onSubmit({ formData });
    }
  };

  return (
    <SheetContent className="bg-white w-[400px] sm:w-[540px]">
      <SheetHeader>
        <SheetTitle>Add new Member to {department}</SheetTitle>
        <div className="flex flex-col gap-8">
          {config.map((field: any) => (
            <div className="" key={field.name}>
              {DynamicComponentReturn({ field })}
            </div>
          ))}
        </div>
      </SheetHeader>
      <button
        className="w-full mt-6 bg-[#333] rounded-lg p-2 text-white"
        onClick={submitHandler}
      >
        Add
      </button>
    </SheetContent>
  );
};
