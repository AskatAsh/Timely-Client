import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "./../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const UpdateParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {state} = useLocation();
  const [parcel] = useState(state.parcel);
//   console.log(parcel);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const today = format(new Date(), "yyyy-MM-dd");

  const getPrice = (parcelWeight) => {
    let price;
    if (parcelWeight <= 1) {
      price = 50;
    } else if (parcelWeight > 1 && parcelWeight <= 2) {
      price = 100;
    } else {
      price = 150;
    }
    return price;
  };

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      userName: user?.displayName,
      userEmail: user?.email,
      status: "pending",
      bookingDate: today,
      price: getPrice(data.parcelWeight),
    };
    console.log("Form Data:", updatedData);
    // Update API call here
    const response = await axiosSecure.put(`/updateParcel/${parcel._id}`, updatedData);
    // console.log(response.data);

    // show success popup
    if (response.data.acknowledged) {
      reset();
      enqueueSnackbar("Updated Parcel Successfully!", { variant: "success" });
    }
  };

  return (
    <section className="max-w-3xl mx-auto w-full mt-8">
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      />
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Book a Parcel</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                readOnly
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue={parcel?.phone}
                {...register("phone")}
                className="mt-1"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="parcelType">Parcel Type</Label>
              <Input
                id="parcelType"
                type="text"
                defaultValue={parcel?.parcelType}
                {...register("parcelType")}
                className="mt-1"
              />
              {errors.parcelType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parcelType.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="parcelWeight">Parcel Weight (kg)</Label>
              <Input
                id="parcelWeight"
                type="number"
                defaultValue={parcel?.parcelWeight}
                step="0.01"
                {...register("parcelWeight")}
                className="mt-1"
              />
              {errors.parcelWeight && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parcelWeight.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="receiverName">Receiver&apos;s Name</Label>
              <Input
                id="receiverName"
                type="text"
                defaultValue={parcel?.receiverName}
                {...register("receiverName")}
                className="mt-1"
              />
              {errors.receiverName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="receiverPhone">
                Receiver&apos;s Phone Number
              </Label>
              <Input
                id="receiverPhone"
                type="tel"
                defaultValue={parcel?.receiverPhone}
                {...register("receiverPhone")}
                className="mt-1"
              />
              {errors.receiverPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverPhone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="deliveryDate">Requested Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                defaultValue={parcel?.deliveryDate}
                min={today}
                {...register("deliveryDate")}
                className="mt-1"
              />
              {errors.deliveryDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.deliveryDate.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="latitude">Delivery Address Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="0.000001"
                defaultValue={parcel?.latitude}
                {...register("latitude")}
                className="mt-1"
              />
              {errors.latitude && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.latitude.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="longitude">Delivery Address Longitude</Label>
              <Input
                id="longitude"
                type="number"
                defaultValue={parcel?.longitude}
                step="0.000001"
                {...register("longitude")}
                className="mt-1"
              />
              {errors.longitude && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.longitude.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full my-6">
            <Label htmlFor="deliveryAddress">Parcel Delivery Address</Label>
            <Textarea
              id="deliveryAddress"
              defaultValue={parcel?.deliveryAddress}
              {...register("deliveryAddress")}
              className="mt-1"
            />
            {errors.deliveryAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deliveryAddress.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Update
          </Button>
        </form>
      </div>
    </section>
  );
};

export default UpdateParcel;
