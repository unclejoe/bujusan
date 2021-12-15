import { Link, LinksFunction } from "remix";
import stylesUrl from "../styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
    return (
        <div className="container">
          <div className="content">
            <h1>
              Bujusan<span>NFTs!</span>
            </h1>
            <nav>
              <ul>
                <li>
                  <Link to="nfts">Browse NFTs</Link>
                </li>
                <li>
                  <Link to="login">Login</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      );
  }