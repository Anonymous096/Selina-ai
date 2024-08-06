import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractUUIDFromString = (url: string) => {
  return url.match(
    /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i
  );
};

//WIP: uncomment the pusher server
export const pusherServer = {};
// export const pusherServer = new PusherServer({
//   appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
//   key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
//   secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET as string,
//   cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTOR as string,
//   useTLS: true,
// });

//WIP: uncomment the pusher client
export const pusherClient = {};
// export const pusherClient = new PusherClient(
//   process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
//   {
//     cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTOR as string,
//   }
// );

export const postToParent = (message: string) => {
  window.parent.postMessage(message, "*");
};

export const extractURLfromString = (url: string) => {
  return url.match(/https?:\/\/[^\s"<>]+/);
};

export const extractEmailsFromString = (text: string) => {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
};

export const getMonthName = (month: number) => {
  return month == 1
    ? "Jan"
    : month == 2
    ? "Feb"
    : month == 3
    ? "Mar"
    : month == 4
    ? "Apr"
    : month == 5
    ? "May"
    : month == 6
    ? "Jun"
    : month == 7
    ? "Jul"
    : month == 8
    ? "Aug"
    : month == 9
    ? "Sep"
    : month == 10
    ? "Oct"
    : month == 11
    ? "Nov"
    : month == 12 && "Dec";
};
