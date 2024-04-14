//@ts-nocheck

import {
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
  SheetOverlay,
} from "./SideSheet";
import { Card } from "../Card/Card";
import clsxm from "../../utils/clsxm";

import { useState } from "react";

export const ViewTeamSheet = ({ team }) => {
  return (
    <SheetContent className="bg-white w-[7100px]">
      <SheetHeader className="overflow-y-scroll">
        <SheetTitle>Team Members:</SheetTitle>
        {team?.map((teamMem, index) => (
          <ViewTeamCard key={index} info={teamMem} />
        ))}
      </SheetHeader>
    </SheetContent>
  );
};

const ViewTeamCard = ({ info }) => {
  return (
    <div
      className={clsxm(
        "border-[#333] border-2  border-b-4 rounded-xl px-6 py-3 w-[300px] h-[200px] flex flex-col justify-between",
        info.designation === "HOD" && "bg-[#fec7de]",
        info.designation === "TEAM_LEAD" && "bg-[#ffd464]",
        info.designation === "CEO" && "bg-[#f85a2b]"
      )}
    >
      <div className="">
        <div className="">
          <h1 className="font-bold text-3xl text-[#333]">{info.name}</h1>
          <h2 className="text-gray-600">
            {info.email}· {info.phoneNumber}
          </h2>
        </div>

        <div className="flex gap-2 flex-wrap mt-2">
          <Badge variant={"designation"} title={info.designation} />
        </div>
      </div>
    </div>
  );
};

const Badge = ({
  variant,
  title,
}: {
  variant: "department" | "designation" | "team";
  title: string;
}) => {
  let badgeComponent;
  switch (variant) {
    case "department":
      badgeComponent = <DepartmentBadge title={title} />;
      break;
    case "designation":
      badgeComponent = <DesignationBadge title={title} />;
      break;
    case "team":
      badgeComponent = <TeamBadge title={title} />;
      break;
    default:
      null;
  }

  return badgeComponent;
};

const DepartmentBadge = ({ title }) => {
  return <span className=""> {title}</span>;
};

const DesignationBadge = ({ title }) => {
  return (
    <span className="border-[#333] border-2 px-1 rounded-md bg-white whitespace-nowrap">
      Designation: {title}
    </span>
  );
};

const TeamBadge = ({ title }) => {
  return (
    <span className="border-[#333] border-2 px-1 rounded-md bg-white whitespace-nowrap">
      Team: {title}
    </span>
  );
};

export default Badge;
