import { Input } from "../Input/Input";
import Button from "../Button/Button";

export const Filters = ({
  filterInput,
  handleFilterInput,
  clearFilter,
}: any) => {
  const handleInput = (key: any, value: any) => {
    handleFilterInput(key, value);
  };

  return (
    <div className="flex gap-6 border-[#333] my-4 border-2 rounded-md px-5 py-4 items-center">
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
      <Button onClick={clearFilter} variant="primary">
        Clear all
      </Button>
    </div>
  );
};
