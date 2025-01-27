import useAuth from "./../../../hooks/useAuth";
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useAuth();
  const {state} = useLocation();
  // console.log(user);


  return (
    <section className="bg-background overflow-hidden shadow rounded-lg border">
      <div className="flex items-center gap-4 p-6">
        <img className="w-20 rounded-full bg-background" src={user?.photoURL} alt="user image" />
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-text">
            {user?.displayName || user?.email}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-text-500">
            This is some information about the user.
          </p>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-text-500">Full name</dt>
            <dd className="mt-1 text-sm text-text sm:mt-0 sm:col-span-2">
              {user?.displayName || "User full name"}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-text-500">Email address</dt>
            <dd className="mt-1 text-sm text-text sm:mt-0 sm:col-span-2">
              {user?.email || "User Email"}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-text-500">User role</dt>
            <dd className="mt-1 text-sm text-text sm:mt-0 sm:col-span-2">
              {state?.role || 'User'} {`(${user?.emailVerified ? 'Verified': 'Not verified'})`}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-text-500">Last Logged in</dt>
            <dd className="mt-1 text-sm text-text sm:mt-0 sm:col-span-2">
              {user?.metadata?.lastSignInTime || 'N/A'}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default UserProfile;
