import Image from "next/image";
import NavBar from "./NabBar/NavBar";
import Listings from "./auctions/ListOfAucctions";

export default function Home() {
  return (
    <main>
      <Listings />
    </main>
  );
}
