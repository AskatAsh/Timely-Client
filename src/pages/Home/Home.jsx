import { Helmet } from "react-helmet-async";
import Banner from "./Sections/Banner";
import OurFeatures from "./Sections/OurFeatures";
import Stats from "./Sections/Stats";
import TopDeliveryMen from "./Sections/TopDeliveryMen";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Timely | Home</title>
            </Helmet>

            {/* Banner section */}
            <Banner />

            {/* Out features section */}
            <OurFeatures />

            {/* Timely stats */}
            <Stats />

            {/* Top delivery men */}
            <TopDeliveryMen />
        </>
    );
};

export default Home;