import useTheme from "../../hooks/useTheme";

const Navbar = () => {

    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <h2 className="text-3xl text-accent font-bold bg-secondary">Navbar</h2>
            <button onClick={toggleTheme}>
                {
                    theme === 'dark' ? <span>Dark</span> : <span>Light</span>
                }
            </button>
        </div>
    );
};

export default Navbar;