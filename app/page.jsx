import { syncDatabase } from "./(db)";
import { populateDB } from "./(db)/seeders/seedDB";

export default async function Home() {
  // await syncDatabase(); // WARNING: It will Erase all DB Data!
  // await populateDB();
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
