import { Link, LinksFunction, LoaderFunction, Outlet, useLoaderData } from "remix";
import { User } from "@prisma/client";
import { getUser } from "~/utils/session.server";
import { db } from "../utils/db.server";
import stylesUrl from "../styles/ntfs.css"

export const links: LinksFunction = () => {
    return [
      {
        rel: "stylesheet",
        href: stylesUrl
      }
    ];
  };

type LoaderData = {
  user: User | null;
  nftListItem : Array<{ id : string, name : string}>;
};

export const loader : LoaderFunction = async ({request}) => {
    const data : LoaderData = {
        nftListItem : await db.nft.findMany({
            take: 5,
            select: { id: true, name: true},
            orderBy: { createdAt: "desc"}
        }),
        user : await getUser(request)
    };
    return data;
}

export default function Nfts() {
    const data = useLoaderData<LoaderData>();
  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link
              to="/"
              title="NFTs"
              aria-label="NFTs"
            >
              <span className="logo">🤪</span>
              <span className="logo-medium">Bujusan NFTs 💎</span>
            </Link>
          </h1>
          {data.user ? (
            <div className="user-info">
              <span>{`Hi ${data.user.username}`}</span>
              <form action="/logout" method="post">
                <button type="submit" className="button">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <Link to="/login" className="button">Login</Link>
          )}
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random NFT</Link>
            <p>Here are a few more NFTs to check out:</p>
            <ul>
              {
                  data.nftListItem.map(nft => (
                    <li key={nft.id}>
                        <Link to={nft.id}>{nft.name}</Link>
                    </li>
                  ))
              }
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}