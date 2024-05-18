import { useNavigate } from "react-router-dom";

export default function ConfirmDelete({ handleConfirmation }) {
    const navigate = useNavigate();

  const handleConfirmClick = () => {
      handleConfirmation(true);
      navigate("/");
      //need the hook that deletes the account

  }


  return(
    <>
      <div className="brown-gradient-y flex flex-col w-full h-60 lg:w-1/2 rounded-md shadow-md justify-center items-center">
          <div className="m-4 text-center">
            Are you sure you want to delete the account?
          </div>
          <div className="justify-center">
            <button
              onClick={handleConfirmClick}
              className="text-white py-2 px-4 rounded bg-red-500 mt-10"
            >
              Confirm
            </button>
          </div>
        </div>
    </>
  );
}
