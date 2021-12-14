import type { LoaderFunction } from "remix";
import type { Nft } from "@prisma/client";
import { Link,useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = {nft:Nft};
export const loader:LoaderFunction = async ({params}) => {
    const nft = await db.nft.findUnique(
        {where : {id: params.nftId}}
    );
    if(!nft) throw new Error("Nft not found!");
    const data : LoaderData = { nft };
    return data;
}

export default function NftRoute() {
    const data = useLoaderData<LoaderData>();
    return (
      <div>
        <p>Here's your hilarious nft:</p>
        <p>
          {data.nft.content}
        </p>
        <Link to=".">{data.nft.name} PermaLink</Link>
      </div>
    );
  }