import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import useAuth from "./../../../../hooks/useAuth";
import useAxiosSecure from "./../../../../hooks/useAxiosSecure";
import { Button } from "@/components/ui/button";

const CheckoutForm = () => {
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { state } = useLocation();

  const stripe = useStripe();
  const elements = useElements();
  //   const navigate = useNavigate();

  const price = state.amount;

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("Error: ", error);
      setErrorMessage(error.message);
    } else {
      console.log("Payment Method: ", paymentMethod);
      setErrorMessage("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: `${user?.displayName}` || "Anonymous",
            email: `${user?.email}` || "Anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log("confirm error: ", confirmError);
      setErrorMessage(confirmError.message);
    } else {
      // console.log("payment intent: ", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log(paymentIntent.id);
      }
    }

    const payment = {
      ...state,
      email: user?.email,
      date: new Date(),
      transactionId: paymentIntent.id,
    };

    const res = await axiosSecure.post("/payments", payment);

    // show success message
    if (res.data?.paymentResult?.insertedId) {
      enqueueSnackbar("Thanks for the Payment!", {
        variant: "success",
        autoHideDuration: 2000,
      });
      // navigate("/dashboard/paymentSuccess");
    }
  };

  return (
    <section>
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      />
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full">
        <CardElement
          className="border-2 p-2 rounded-md border-primary-500"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "gray",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          className="mx-auto block max-w-40 w-full my-10"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </Button>
        <p className="text-red-600">{errorMessage}</p>
        {/* {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )} */}
      </form>
    </section>
  );
};

export default CheckoutForm;
