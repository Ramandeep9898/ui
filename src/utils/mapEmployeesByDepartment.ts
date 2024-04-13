export const mapEmployeesByDepartment = (employeeData: any) => {
  const departmentOutput: Record<string, any[]> = {};
  const { employees, teams, department } = employeeData;

  employees.forEach((employee: any) => {
    const deptId = employee.deptId;
    const departmentName = department[deptId]?.deptName || "Unknown Department";
    if (!departmentOutput[departmentName]) {
      departmentOutput[departmentName] = [];
    }

    const teamId = employee.teamId;
    const teamName = teamId ? teams[teamId]?.teamName || "Unknown Team" : null;

    const employeeDetails = {
      employeeId: employee.employeeId,
      name: employee.name,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      designation: employee.designation,
      teamId: employee.teamId,
      teamName: teamName,
      deptId: deptId,
      departmentName: departmentName,
      isDeleted: employee.isDeleted,
    };

    departmentOutput[departmentName].push(employeeDetails);
  });
  return departmentOutput;
};
