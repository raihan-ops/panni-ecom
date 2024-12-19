const Spinner = ({width = "10px", height = "10px", className}) => {

    return (
        <span
            className={`
                inline-block mx-2 animate-spin rounded-full border-2 border-solid
                border-current border-r-transparent ${className}
                `}
            style={{
                width,
                height
            }}
        />
    );
};

export default Spinner;