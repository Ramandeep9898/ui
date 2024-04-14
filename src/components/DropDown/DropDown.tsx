//@ts-nocheck
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
  team,
  flag,
}: {
  label: string;
  initialDropdownValue: string;
  onSelect: any;
  name: string;
  dept?: string;
  team?: string;
  flag?: string;
}) => {
  const [selectedValue, setSelectedValue] = useState(initialDropdownValue);
  const [selectedTeamId, setSelectedTeamId] = useState(""); // State to store the selected teamId
  const { employeeData, dispatch } = useEmployeeData();
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const { department } = employeeData;

    if (initialDropdownValue === "Choose a Team") {
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
  const selectedValueData =
    flag !== "addMember" ? team || teamData[0]?.teamName : "Choose a Team";
  return (
    <DropdownMenu>
      <div className="flex flex-col items-start w-full">
        <div className="text-gray-500 text-sm mb-1">{label}</div>
        <DropdownMenuTrigger className="border-[#333] w-full border-2 border-b-4 px-6 py-2 rounded-lg">
          {selectedValue === "Choose a Team"
            ? selectedValueData
            : selectedValue}
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent className="w-[330px] border-[#333] border-2 border-b-4 bg-white">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={
            selectedValue === "Choose a Team"
              ? selectedValueData
              : selectedValue
          }
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
