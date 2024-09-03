import { revalidatePath } from "next/cache";

export async function updateClient(data: FormData) {
  // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  revalidatePath("/clients");
  return {
    status: "success",
    message: `Client was updated`,
  };
}
