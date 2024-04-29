import "../../../index.css"

function DropdownList({ selectedValue, setSelectedValue }) {
  
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="flex h-10 mx-auto my-2 w-full">
      <select  value={selectedValue} onChange={handleSelectChange} className="bg-light-brown text-white font-sm rounded shadow-md p-1 w-3/4 md:w-1/2 lg:w-4/5 mx-auto" data-testid="dropdown-list">
        <option defaultChecked value="Temperature">Temperature</option>
        <option value="Humidity">Humidity</option>
        <option value="Light Level">Light Level</option>
      </select>
    </div>
  );
}

export default DropdownList;
