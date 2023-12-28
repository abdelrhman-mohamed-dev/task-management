import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setUser, setAccessToken } from "../features/auth/AuthSlice";
import api from "../api/api";

interface LoginResponse {
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
  jobTitle: string | null;
  accessToken: string;
}

const formSchema = z.object({
  username: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        username: values.username,
        password: values.password,
      });
      // Assuming your API returns user and accessToken in the response
      const { id, name, email, profileImg, jobTitle, accessToken } =
        response.data;
      // Dispatch actions to store user information in Redux state
      dispatch(setUser({ id, name, email, profileImg, jobTitle }));

      // Dispatch action to store access token in global state
      dispatch(setAccessToken(accessToken));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="email@somthing.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
