function CreateRoom() {
    return (
        <div className="brown-gradient-y flex w-full lg:w-1/2 rounded-md shadow-md flex-col">
            <div className="min-h-24 w-full flex items-center ml-5 text-3xl lg:text-5xl font-bold text-white">CREATE ROOM</div>
            <div className="bg-white bg-opacity-15 h-full text-xs md:text-sm lg:text-base flex flex-col justify-center items-center rounded-md">
                <form className="flex flex-col w-2/3 my-5">
                    <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="text" id="roomName" name="roomName" placeholder="room name" required />
                    <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="hardwareId" name="hardwareId" placeholder="hardware id" required />
                    <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="temperature" name="temperature" placeholder="preffered temperature (°C)" min="5" max="40" required />
                    <input className="w-full h-8 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="humidity" name="humidity" placeholder="preffered humidity (%)" min="0" max="100" required />
                    <p className="mt-2 md:text-sm text-justify">*In order to create a room, a set of bought and installed hardware is required.</p>
                    <button className="bg-light-brown text-base w-64 h-16 mx-auto mt-5 py-5 rounded-md" type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateRoom