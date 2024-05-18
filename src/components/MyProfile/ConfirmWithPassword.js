export default function ConfirmWithPassword({ isEditing, handleSave, handlePasswordChange }) {
  return (
    <>
      <div className="brown-gradient-y flex flex-col w-full h-60 lg:w-1/2 rounded-md shadow-md justify-center items-center">
        <div className="m-3">
          {isEditing ? "Confirm changes:" : "Are you sure you want to delete the account?"}
        </div>
        <div className="flex flex-row">
          <div className="ml-3 mr-3">
            {isEditing ? "Old" : ""} password:
          </div>
          <input type="password" data-testid="passwordConfirmInput" onChange={handlePasswordChange} />
        </div>
        <button
          data-testid="confirmPasswordButton"
          className="text-white py-2 px-4 rounded mt-10"
          style={{ backgroundColor: "#FFA7A7" }}
          onClick={handleSave}
        >
          Confirm
        </button>
      </div>
    </>
  );
}
