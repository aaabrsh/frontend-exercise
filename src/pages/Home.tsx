import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { removeUsers, usersFetchStart } from "../store/user/user.slice";
import Card from "../components/Card";
import Header from "../components/Header";

export default function Home() {
  const { data: users, total, isLoading, error, page, limit } = useUsers();

  const [noMoreUsers, setNoMoreUsers] = useState(false); // if there is no more user data left to fetch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeUsers());
    fetchUsers();
  }, []);

  useEffect(() => {
    if (page > 0 && limit * page >= total)
      setNoMoreUsers(true); // if we have retrieved all users
    else setNoMoreUsers(false);
  }, [page, limit, total]);

  const fetchUsers = () => {
    dispatch(usersFetchStart({ page: page + 1, limit }));
  };

  if (isLoading && users.length === 0) {
    return (
      <>
        <Header />

        <div className="h-full gap-x-6 gap-y-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 py-20">
          {new Array(4).fill(1).map((_, i) => (
            <div key={i}>
              <div className="animate-pulse h-56 rounded-t-xl w-full bg-slate-200"></div>
              <div className=" h-48 rounded-b w-full bg-slate-100">
                <div className="px-10 py-4">
                  <div className="w-full h-10 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-5 w-24 bg-slate-200 mt-3 rounded-lg"></div>
                  <div className="h-5 w-48 bg-slate-200 mt-3 rounded-lg"></div>
                  <div className="h-5 w-48 bg-slate-200 mt-3 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="py-20 px-5">
        <div className="gap-x-6 gap-y-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user, index) => (
            <Card user={user} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
