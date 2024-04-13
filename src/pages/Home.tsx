import { useEffect, useState } from "react";
import { ADD_MEMBER_FIELDS_CONFIG, CREATE_TEAM_CONFIG } from "../config";
import { Toaster } from "../components/Toast/toaster";
import { Card } from "../components/Card/Card";
import { useEmployeeData } from "../hooks/employeeDataContext";
import { DynamicSheet } from "../components/SideSheet/DynamicSheet";
import { mapEmployeesByDepartment } from "../utils/mapEmployeesByDepartment";
import { Filters } from "../components/Filters/Filters";

import { Sheet, SheetTrigger } from "../components/SideSheet/SideSheet";
import { FormData } from "../types/Fields.type";
import Button from "../components/Button/Button";

// Home component
export const Home = () => {
  const initialState: FormData = {
    name: "",
    email: "",
    phoneNumber: "",
    designation: "",
    deptId: "",
    teamId: "",
  };

  const createTeamInitialState = {
    teamName: "",
  };

  const { employeeData, dispatch } = useEmployeeData();
  const [employeeTransformedData, setEmployeeTransformedData] = useState({});

  // handle add/edit new member
  const onSubmitTeamMember = (formData) => {
    dispatch({ ...formData, type: "ADD_MEMBER" });
  };

  /// create new team
  const onSubmitCreateTeam = (formData) => {
    dispatch({ ...formData, type: "CREATE_TEAM" });
  };

  useEffect(() => {
    setEmployeeTransformedData(mapEmployeesByDepartment(employeeData));
  }, [employeeData]);

  return (
    <main className="flex justify-center items-center flex-wrap gap-3 ">
      <div className="flex flex-col max-w-[1200px]">
        <Filters />
        {Object.keys(employeeTransformedData).map((department) => (
          <div key={department} className="mb-5">
            <div className="flex justify-between mb-3">
              <h2 className="text-2xl font-bold underline ">{department}</h2>
              {department !== "LEADERSHIP" && (
                <div className="flex gap-3">
                  <Sheet>
                    <SheetTrigger>
                      <Button variant="primary">Add New Team Member +</Button>
                    </SheetTrigger>
                    <DynamicSheet
                      department={department}
                      flag="addMember"
                      config={ADD_MEMBER_FIELDS_CONFIG}
                      initialState={initialState}
                      onSubmit={onSubmitTeamMember}
                    />
                  </Sheet>

                  <Sheet>
                    <SheetTrigger>
                      <Button variant="primary">Create New Team +</Button>
                    </SheetTrigger>
                    <DynamicSheet
                      department={department}
                      flag="createTeam"
                      config={CREATE_TEAM_CONFIG}
                      initialState={createTeamInitialState}
                      onSubmit={onSubmitCreateTeam}
                    />
                  </Sheet>
                </div>
              )}
            </div>

            <div className="flex flex-row gap-2 flex-wrap">
              {employeeTransformedData[department].map((employee: any) => (
                <>
                  {!employee.isDeleted && (
                    <div key={employee.employeeId}>
                      <Card info={employee} />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Toaster />
    </main>
  );
};
