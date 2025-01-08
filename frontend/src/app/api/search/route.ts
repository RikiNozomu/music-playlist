import { NextResponse, type NextRequest } from "next/server";
import { Innertube } from "youtubei.js";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get("keyword");
  const innertube = await Innertube.create();
  const searchResult = await innertube.music?.search(keyword || "", {
    type: "song",
  });
  return NextResponse.json(
    {
      data: searchResult.songs?.contents.map((item) => {
        return {
          id: item.id,
          artist: item.artists?.map(item => item.name).join(", "),
          thumbnail: item.thumbnails.at(0)?.url,
          title: item.title,
          duration: item.duration?.seconds,
        };
      }),
    },
    { status: 200 }
  );
}
