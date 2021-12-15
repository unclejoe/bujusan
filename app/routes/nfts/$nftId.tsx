import { LoaderFunction, useCatch, useParams } from "remix";
import type { Nft } from "@prisma/client";
import { Link,useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = {nft:Nft};
export const loader:LoaderFunction = async ({params}) => {
    const nft = await db.nft.findUnique(
        {where : {id: params.nftId}}
    );
    if(!nft) throw new Response("What a joke! Not found.", {
      status: 404
    });
    return nft;
}

export default function NftRoute() {
    const data = useLoaderData<LoaderData>();
    return (
      <div>
        <p>Here's your precious nft:</p>
        <p>
          {data.nft.content}
        </p>
        <Link to=".">{data.nft.name} PermaLink</Link>
      </div>
    );
  }

  export function ErrorBoundary() {
    const { nftId } = useParams();
    return (
      <div className="error-container">{`There was an error loading nft by the id ${nftId}. Sorry.`}</div>
    );
  }

  export function CatchBoundary() {
    const caught = useCatch();
    const params = useParams();
    if (caught.status === 404) {
      return (
        <div className="error-container">
          Huh? What the heck is "{params.nftId}"?
        </div>
      );
    }
    throw new Error(`Unhandled error: ${caught.status}`);
  }