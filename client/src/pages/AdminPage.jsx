import ModerateurList from "../components/ModerateurList";
import UploadArticle from "../components/UploadArticle"

function AdminScreen() {
 
  return (
    <div className="w-full p-0">
      <UploadArticle />
      <ModerateurList />
    </div>
  );
}

export default AdminScreen;
