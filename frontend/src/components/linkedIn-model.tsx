import React, { useState } from "react";
import * as z from "zod";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import api from "@/api/api";
import { IUser } from "@/types";

interface LinkedInModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const formSchema = z.object({
  profileUrl: z.string().min(1),
});

export const LinkedInModal: React.FC<LinkedInModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
}) => {
  const user: IUser | null = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IUser | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      api
        .post(
          "/scrape",
          {
            ProfileLink: values.profileUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Somthing went Wrong pls try agian!");
        });
      if (user?.id && data) {
        api
          .put(
            `/user/${user?.id}`,
            {
              profileImg: data.profileImg,
              jobTitle: data.jobTitle,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(() => {
            toast.success("we found data!");
            window.location.reload();
            onClose();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      toast.error("Something went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="profileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Link</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="LinkedIn Profile Link!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  type="reset"
                  disabled={isLoading}
                  variant={"outline"}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    ""
                  )}
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
