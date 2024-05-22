import { syncDatabase } from "./(db)";
import { populateDB } from "./(db)/seeders/seedDB";

export default async function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
