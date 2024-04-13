export const ADD_MEMBER_FIELDS_CONFIG = [
  {
    name: "name",
    label: "Name",
    inputType: "text",
    element: "input",
    required: true,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    inputType: "number",

    element: "input",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    inputType: "email",

    element: "input",
    required: true,
  },
  {
    name: "designation",
    label: "Designation",
    element: "chip",
    required: true,
    options: [
      {
        name: "TEAM_LEAD",
        value: "Team Lead",
      },
      {
        name: "TEAM_MEMBER",
        value: "Team Member",
      },
    ],
  },
  {
    name: "team",
    label: "Choose Team",
    element: "dropdown",
    initialDropdownValue: "Choose a Team",
    required: true,
    options: [
      {
        name: "teamLead",
        value: "Team Lead",
      },
      {
        name: "teamMember",
        value: "Team Member",
      },
    ],
  },
];
