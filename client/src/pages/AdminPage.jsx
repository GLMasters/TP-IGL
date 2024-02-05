import ModerateurList from "../components/ModerateurList";
import UploadArticle from "../components/UploadArticle"
import Footer from '../components/Footer';
function AdminScreen() {
 
  return (
    <div className="w-full p-0">
      <UploadArticle />
      <ModerateurList />
      <Footer />
    </div>
  );
}

export default AdminScreen;
