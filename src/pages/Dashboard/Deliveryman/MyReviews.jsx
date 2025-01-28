import { FaStar } from "react-icons/fa";
import useGetMyReviews from "./../../../hooks/useGetMyReviews";

const MyReviews = () => {
  const [myReviews] = useGetMyReviews();

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myReviews.map((review) => (
          <div
            key={review._id}
            className="text-text flex flex-col items-center justify-center border rounded-2xl shadow-sm gap-4 overflow-hidden p-6 text-center"
          >
            <img
              className="w-40 h-40 object-cover rounded-full"
              src={review?.userImage}
              alt="image of review giver"
            />
            <h3 className="text-lg font-bold">{review?.userName}</h3>
            <p className="font-semibold flex items-center gap-2">
              <FaStar className="text-yellow-500" /> {review?.rating}/5
            </p>
            <p>
              {review?.review}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyReviews;
