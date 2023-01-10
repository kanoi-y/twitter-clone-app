import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const utils = trpc.useContext();

  const { data: user } = trpc.user.getUserById.useQuery({
    id: sessionData?.user?.id || "",
  });

  const updateUser = trpc.user.updateUser.useMutation({
    async onSuccess() {
      await utils.user.getUserById.invalidate();
    },
  });

  const [newName, setNewName] = useState(user?.name || "");

  const changeUserName = async () => {
    await updateUser.mutateAsync({ id: user?.id || "", name: newName });
  };

  return (
    <main>
      {user ? (
        <div className="p-5">
          <div className="mb-3">{user.name}</div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="mb-3 mr-3  border p-2"
          />
          <button
            onClick={changeUserName}
            className=" bg-gray-500 p-2 text-white"
          >
            名前を変更
          </button>
          <button onClick={() => signOut()} className="btn">
            ログアウト
          </button>
        </div>
      ) : (
        <div className="p-5">
          <button onClick={() => signIn("google")} className="btn">
            ログイン
          </button>
        </div>
      )}
    </main>
  );
};

export default Home;
