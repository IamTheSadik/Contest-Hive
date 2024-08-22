import { sendToAuthor } from "@/app/api/others/send/route";
("use server");
import { updateData as updateStatsData } from "@/lib/dbConnect";
import { getResponse as getContestResponse } from "@/app/api/default";
import { getSecondsDifferencesFromCurrentTime } from "@/lib/helpers/datetime";

import { ContestDataType } from "@/lib/types";

export async function getStatsData(update: "api" | "page") {
  // also increments whenever called
  const data = await updateStatsData(update);
  return [
    {
      title: "Today",
      value: data.past24page,
      description: "visited",
    },
    {
      title: "Total served",
      value: data.api,
      description: "API requests",
    },
    {
      title: "Total",
      value: data.page,
      description: "page visits",
    },
  ];
}

export async function sendMessage(message: string) {
  const response = await fetch(
    "https://contest-hive.vercel.app/api/others/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    },
  );

  return response.json();
}

export async function getAllContestData() {
  // Fetch contests data

  var _contests: ContestDataType = (await getContestResponse("all")).data;

  // Process contests data
  const contestData = Object.values(_contests).flatMap((contests) => contests);
  contestData.sort(
    (a, b) =>
      getSecondsDifferencesFromCurrentTime(a.startTime) -
      getSecondsDifferencesFromCurrentTime(b.startTime),
  );

  // Filter contests that have already started
  const filteredContests = contestData.filter(
    (contest) => getSecondsDifferencesFromCurrentTime(contest.startTime) > 10,
  );

  return filteredContests;
}
