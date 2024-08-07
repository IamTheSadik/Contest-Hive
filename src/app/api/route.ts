import { JsonResponse } from "@/app/api/default";
import { updateData as updateStatsData } from "@/lib/dbConnect";

export async function GET() {
  await updateStatsData("api");
  const data = {
    ok: true,
    message:
      "Contest Hive API gives you upcoming contests information from 7 different platforms. Documentation at: https://contest-hive.github.io/docs/",
  };

  return await JsonResponse(data);
}
