import { v4 as uuid } from "uuid";

export const getTeamByDepartmentName = (
  departmentName: string,
  employeeData: any
) => {
  const { department } = employeeData;
  for (let key of Object.keys(department)) {
    let data = department[key];
    if (departmentName === data.deptName) {
      return getTeamByDeptId(key, employeeData);
    }
  }
};

export const getTeamByDeptId = (deptId: string, employeeData: any) => {
  const { teams } = employeeData;
  let teamsData = [];
  for (let key of Object.keys(teams)) {
    let data = teams[key];
    if (deptId === data.deptId) {
      teamsData.push(data);
    }
  }
  return teamsData;
};

export const addMember = (memberData, employeeData) => {
  console.log("ADD_MEMBER" , memberData)
  const { teams, employees } = employeeData;
  const departmentId = teams[memberData?.teamId]?.deptId;

  // Construct the new member object with all required properties
  const newMember = {
    employeeId: uuid(),
    name: memberData.name,
    email: memberData.email,
    phoneNumber: memberData.phoneNumber,
    designation: memberData.designation,
    teamId: memberData.teamId,
    deptId: departmentId,
    isDeleted: false,
  };

  // Push the new member object to the employees array
  employees.push(newMember);
  localStorage.setItem("employees", JSON.stringify(employees));

};

export const createTeam = (teamData, employeeData) => {
  const { teams, department } = employeeData;
  const departmentId = getDepartmentByDeptName(teamData.department, department);

  // Construct the new team object with all required properties
  const newTeam = { ...teamData, deptId: departmentId };

  // Push the new team object to the employees array
  teams[teamData.teamId] = newTeam;
  localStorage.setItem("teams", JSON.stringify(teams));
};

export const getDepartmentByDeptName = (deptName, department) => {
  for (let key of Object.keys(department)) {
    let data = department[key];
    if (deptName === data.deptName) {
      return key;
    }
  }
};

export const updateMember = (memberData, employeeData) => {
    const { employees } = employeeData;
    for(let index in employees){
        if(employees[index].employeeId === memberData.employeeId){
            employees[index] = memberData
        }
        if(employees[index].designation === "TEAM_LEAD" && memberData.designation === "TEAM_LEAD" && employees[index].employeeId !== memberData.employeeId && employees[index].teamId === memberData.teamId){
            employees[index]['designation'] = "TEAM_MEMBER"
        }
        
    }
    localStorage.setItem("employees", JSON.stringify(employees));
    console.log("UPDATE_MEMBER" , memberData)
}

export const removeMember = (memberData, employeeData) => {
    console.log("REMOVE_MEMBER", memberData)
    const { employees } = employeeData;
    for(let index in employees){
        if(employees[index].employeeId === memberData.empId){
            employees[index]['isDeleted'] = true
            break
        }
    }
    localStorage.setItem("employees", JSON.stringify(employees));
    console.log("REMOVE_MEMBER" , memberData)
}