import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LinkedInModal } from "@/components/linkedIn-model";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is no user, then navigate to "/login"
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  const [open, setOpen] = useState(false);
  console.log(user?.profileImg);
  return (
    <>
      <LinkedInModal
        title="LinkedIn"
        description="Provied us with you likedin profile url to genrate data."
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Navbar />
      <main>
        <div className="m-8 flex gap-5 max-w-full max-sm:flex-col justify-between ">
          <div className="flex gap-5 max-sm:flex-col">
            <img
              className=" w-40 h-40 rounded-full border  border-1 border-black "
              src={`${user?.profileImg}`}
              alt="profile Img"
            />
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">{user?.name || "Unkown"}</h1>
              <h2 className="text-4xl font-bold">
                {user?.jobTitle || "Unkown"}
              </h2>
            </div>
          </div>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            variant={"outline"}
            size={"lg"}
            className={cn("bg-blue-600")}
          >
            LinkedIn
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
