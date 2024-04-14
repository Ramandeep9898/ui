//@ts-nocheck

import { useContext, createContext, useReducer } from "react";
import { employees, teams, department } from "../EmployeData/employeeData";
import {
  addMember,
  createTeam,
  updateMember,
  removeMember,
} from "../utils/datamodelutils";

const employeeReducerFunc = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "ADD_MEMBER":
      const updatedState = {
        ...state,
        employees: [...state.employees],
      };
      addMember(action.formData, updatedState);
      return updatedState;
    case "CREATE_TEAM":
      const updatedStateTeam = {
        ...state,
        teams: state.teams,
      };
      createTeam(action.formData, updatedStateTeam);
      return updatedStateTeam;
    case "EDIT_MEMBER":
      const updatedStateMember = {
        ...state,
        employees: [...state.employees],
      };

      updateMember(action, updatedStateMember);
      return updatedStateMember;

    case "REMOVE_MEMBER":
      const updatedStateMemberRemove = {
        ...state,
        employees: [...state.employees],
      };

      removeMember(action, updatedStateMemberRemove);
      return updatedStateMemberRemove;

    default:
      return state;
  }
};

const EmployeeDataContext = createContext<any>({});

const EmployeeDataProvider = ({ children }) => {
  const [employeeData, dispatch] = useReducer(employeeReducerFunc, {
    employees: employees,
    teams: teams,
    department: department,
  });

  return (
    <EmployeeDataContext.Provider value={{ employeeData, dispatch }}>
      {children}
    </EmployeeDataContext.Provider>
  );
};

const useEmployeeData = () => useContext(EmployeeDataContext);

export { useEmployeeData, EmployeeDataProvider };
