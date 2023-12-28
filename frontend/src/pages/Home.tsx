import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { columns } from "@/components/tasksTable/columns";
import { DataTable } from "@/components/tasksTable/data-table";
import api from "@/api/api";

const Home = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is no user, then navigate to "/login"

    if (!user) {
      navigate("/login");
    } else {
      api
        .get(`/tasks/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Set Authorization header
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching tasks", error);
        });
    }
  }, [user, navigate, data]);
  return (
    <>
      <Navbar />
      <main className="mt-4">
        <h1 className="text-4xl font-bold px-4">Welcome back!</h1>
        <p className="font-medium px-4">
          Here's a list of your tasks for this month!
        </p>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
