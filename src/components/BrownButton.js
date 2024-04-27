export default function BrownButton({text}){
    return(
        <>
        <button style={{background: "#a79277", width: "80px", height: "40px"}} class="block text-white rounded md:border-0 md:p-0 dark:text-white">{text}</button>
        </>
    )
}