import { department, teams } from "../../EmployeData/employeeData";
import clsxm from "../../utils/clsxm";
import Button from "../Button/Button";
import { Sheet, SheetTrigger } from "../SideSheet/SideSheet";
import { DynamicSheet } from "../SideSheet/DynamicSheet";
import { ADD_MEMBER_FIELDS_CONFIG } from "../../config";
import { useEmployeeData } from "../../hooks/employeeDataContext";

export const Card = ({ info }) => {
  const { employeeData, dispatch } = useEmployeeData();

  // handle remove empolyee
  const removeHandler = () => {
    console.log(info.employeeId);
    // dispatch
    dispatch({ empId: info.employeeId, type: "REMOVE_MEMBER" });
  };

  console.log("p", info);

  return (
    <div
      className={clsxm(
        "border-[#333] border-2  border-b-4 rounded-xl px-6 py-3 w-[370px] h-[300px] flex flex-col justify-between",
        info.designation === "HOD" && "bg-[#fec7de]",
        info.designation === "TEAM_LEAD" && "bg-[#ffd464]",
        info.designation === "CEO" && "bg-[#f85a2b]"
      )}
    >
      <div className="">
        <div className="flex justify-between items-center">
          <div className="">
            <h1 className="font-bold text-3xl text-[#333]">{info.name}</h1>
            <h2 className="text-gray-600">
              {info.email}· {info.phoneNumber}
            </h2>
          </div>

          <Sheet>
            <SheetTrigger>
              <Button
                variant="outline"
                className="border-[#333] border-2 px-2 py-1 rounded"
              >
                edit
              </Button>
            </SheetTrigger>
            <DynamicSheet
              department={info.departmentName}
              flag="edit"
              config={ADD_MEMBER_FIELDS_CONFIG}
              initialState={info}
              onSubmit={() => "fghj"}
            />
          </Sheet>
        </div>

        <div className="flex gap-2 flex-wrap mt-2">
          <Badge variant={"designation"} title={info.designation} />
          {teams[info.teamId]?.teamName && (
            <Badge variant={"team"} title={teams[info.teamId]?.teamName} />
          )}
        </div>
      </div>

      {info.designation !== "HOD" && "CEO" && (
        <div className="flex gap-2">
          {info.designation !== "TEAM_LEAD" && (
            <>
              <Button variant="primary" className="" onClick={removeHandler}>
                Remove
              </Button>
            </>
          )}
          {info.designation === "TEAM_LEAD" && (
            <Button variant="primary" className="">
              View team
            </Button>
          )}
        </div>
      )}
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
