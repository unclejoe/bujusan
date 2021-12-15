import { useLoaderData,Link, useCatch } from "remix";
import type { LoaderFunction } from "remix";
import type { Nft } from "@prisma/client";
import { db } from "../../utils/db.server";

type LoaderData = { randomNft: Nft };

export const loader: LoaderFunction = async () => {
  const count = await db.nft.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomNft] = await db.nft.findMany({
    take: 1,
    skip: randomRowNumber
  });

  if (!randomNft) {
    throw new Response("No random nft found", {
      status: 404
    });
  }
  const data: LoaderData = { randomNft };
  return data;
};

 
export default function NftsIndexRoute() {
    const data = useLoaderData<LoaderData>();
    return (
      <div>
        <p>Here's a random NFT :</p>
        <p>
          { data.randomNft.content}
        </p>
        <Link to={data.randomNft.id}>
            {data.randomNft.name} PermaLink
        </Link>
      </div>
    );
  }

  export function ErrorBoundary() {
    return (
      <div className="error-container">
        I did a whoopsies.
      </div>
    );
  }

  export function CatchBoundary() {
    const caught = useCatch();
  
    if (caught.status === 404) {
      return (
        <div className="error-container">
          There are no nfts to display.
        </div>
      );
    }
    throw new Error(
      `Unexpected caught response with status: ${caught.status}`
    );
  }