import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropDown.components";

import { useEmployeeData } from "../../hooks/employeeDataContext";

import { getTeamByDepartmentName } from "../../utils/datamodelutils";

export const Dropdown = ({
  label,
  initialDropdownValue,
  onSelect,
  name,
  dept,
}: {
  label: string;
  initialDropdownValue: string;
  onSelect: any;
  name: string;
  dept?: string;
}) => {
  const [selectedValue, setSelectedValue] = useState(initialDropdownValue);
  const [selectedTeamId, setSelectedTeamId] = useState(""); // State to store the selected teamId
  const { employeeData, dispatch } = useEmployeeData();
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const { department } = employeeData;

    if (initialDropdownValue === "Choose a Team") {
      // Create an array of all the teams in this department {department}

      setTeamData(getTeamByDepartmentName(dept as string, employeeData));
    }
  }, [employeeData]);

  const handleSelect = (teamName: string) => {
    let teamId;
    teamData.map((ele) => {
      if (ele.teamName === teamName) {
        return (teamId = ele.teamId);
      }
    });
    teamId;
    setSelectedValue(teamName);
    onSelect(name, teamName, teamId);
  };

  return (
    <DropdownMenu>
      <div className="flex flex-col items-start w-full">
        <div className="text-gray-500 text-sm mb-1">{label}</div>
        <DropdownMenuTrigger className="border-[#333] w-full border-2 border-b-4 px-6 py-2 rounded-lg">
          {selectedValue}
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent className="w-[330px] border-[#333] border-2 border-b-4 bg-white">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedValue}
          onValueChange={(value) => {
            handleSelect(value); // Pass teamName and teamId to handleSelect
          }}
        >
          {teamData?.map((field) => (
            <DropdownMenuRadioItem value={field.teamName} key={field.teamId}>
              {field.teamName}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
