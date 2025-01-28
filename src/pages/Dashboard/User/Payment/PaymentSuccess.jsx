import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWindowSize } from 'react-use';

const PaymentSuccess = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      <Confetti width={width} height={height} />
      <div className="max-w-sm w-full mx-auto px-4 flex flex-col items-center gap-8 my-20 text-center">
        <h2 className="text-5xl text-primary-800 text-center font-bold">
          Payment Successfull!
        </h2>
        <p>
          Thanks for using our services. We hope to serve you well in the future
          too.
        </p>
        <Link to="/dashboard/myParcels">
          <Button>Back to my parcels</Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
