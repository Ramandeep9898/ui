import { useEmployeeData } from "../../hooks/employeeDataContext";
import { Input } from "../Input/Input";
import { useState } from "react";
import { filterEmployees } from "../../utils/datamodelutils";

export const Filters = () => {
  const [filterInput, setFilterInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleInput = (key: any, value: any) => {
    setFilterInput((prevFilterInput) => ({
      ...prevFilterInput,
      [key]: value,
    }));
  };
  const { employeeData, dispatch } = useEmployeeData();
  const filterResponse = filterEmployees(filterInput, employeeData);
  console.log(employeeData);
  console.log(filterInput);
  console.log("FILTER_RESPONSE", filterResponse);
  return (
    <div className="flex gap-6 border-[#333] my-4 border-2 rounded-md px-5 py-4">
      <Input
        variant="outline"
        label="Email"
        name="email"
        onChange={handleInput}
        value={filterInput.email}
      />

      <Input
        variant="outline"
        label="Name"
        name="name"
        onChange={handleInput}
        value={filterInput.name}
      />

      <Input
        variant="outline"
        label="Phone Number"
        name="phoneNumber"
        onChange={handleInput}
        value={filterInput.phoneNumber}
      />
    </div>
  );
};
