import { Helmet } from "react-helmet-async";
import Banner from "./Sections/Banner";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Timely | Home</title>
            </Helmet>

            {/* Banner section */}
            <Banner />
        </>
    );
};

export default Home;