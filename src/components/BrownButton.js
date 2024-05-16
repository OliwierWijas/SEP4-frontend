export default function BrownButton({ text, onClick }) {
    return (
        <button onClick={onClick} style={{ background: "#a79277", height: "40px" }} className="block text-white rounded md:border-0 dark:text-white px-10">
            {text}
        </button>
    );
}
