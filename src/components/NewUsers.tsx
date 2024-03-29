import { useState, useEffect, SetStateAction } from "react";
import axios from "axios";
import WelcomeScreen from "@/pages/WelcomeScreen";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import CreateChat from "./CreateChat";
import SkeletonLoader from "./SkeletonLoader";

const NewUsers = () => {
  const [receiver, setReciever] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDataOfOneUser = (userData: SetStateAction<null>) => {
    setReciever(userData);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://rippleback.onrender.com/user/users"
        );
        if (response.status === 200) {
          setUsers(
            response.data.filter(
              (user: { _id: string | null }) =>
                user._id !== localStorage.getItem("userId")
            )
          );
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative flex-col items-start gap-8 md:flex">
          <div className="grid w-full h-auto items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-bold">Users</legend>
              <div className="h-auto">
                <ScrollArea className="md:h-[550px]">
                  <div className="p-4">
                    <h4 className="mb-4 text-2xl font-semibold leading-none">
                      Users
                    </h4>
                    {loading ? (
                      <SkeletonLoader />
                    ) : (
                      users.map((user) => (
                        <>
                          <div
                            key={user._id}
                            onClick={() => getDataOfOneUser(user)}
                            className="flex items-center gap-4 cursor-pointer hover:bg-secondary rounded-md p-2"
                          >
                            <Avatar className="hidden h-12 w-12 sm:flex rounded-lg">
                              <AvatarImage src={user.Image} alt="Avatar" />
                              <AvatarFallback>
                                {user.userName.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                              <p className="text-sm font-bold">
                                {user.userName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {user.Bio ? user.Bio : "Hi there"}
                              </p>
                            </div>
                          </div>
                          <Separator className="my-2" />
                        </>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </fieldset>
          </div>
        </div>

        <div className="relative flex h-full min-h-[50vh] flex-col lg:col-span-3">
          {receiver ? <CreateChat receiver={receiver} /> : <WelcomeScreen />}
        </div>
      </main>
    </>
  );
};

export default NewUsers;
