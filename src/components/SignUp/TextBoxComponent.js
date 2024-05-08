function TextBox({ title, textArray }) {
    return (
        <>
            {title && textArray && (
                <div style={{ border: "2px solid #C4B097" }} className="rounded-md mx-2 my-4 p-2 w-full md:w-2/5 xl:w-1/5 text-justify expand-height leading-loose shadow-sm">
                    <h1 className="text-center mb-1 text-xl">{title}</h1>

                    {textArray.map((text, index) => (
                        <p key={index} className="mx-2 mt-3">{text}</p>
                    ))}
                </div>
            )}
        </>
    );
}

export default TextBox;
