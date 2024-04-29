interface BrownButtonProps{
    text : string;
}

export default function BrownButton({text}: BrownButtonProps){
    return(
        <>
        <button style={{background: "#a79277", width: "80px", height: "40px"}} className="block text-white rounded md:border-0 md:p-0 dark:text-white">{text}</button>
        </>
    )
}