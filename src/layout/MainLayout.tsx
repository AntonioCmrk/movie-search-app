import { ReactNode, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "../components/LoginModal";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { PlaylistModal } from "../components/PlaylistModal";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const isOpen = useSelector<RootState, boolean>((state) => state.modal.isOpen);
  const isOpenPlaylistModal = useSelector<RootState, boolean>(
    (state) => state.playlistModal.isOpen
  );

  return (
    <>
      {isOpen && <LoginModal />}
      {isOpenPlaylistModal && <PlaylistModal />}
      <button
        className="absolute mt-[6.5rem] ml-5 z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 max-lg: max-lg:left-[44%] max-lg:right-[44%] max-sm:left-[36%] max-sm:right-[36%] max-lg:mx-auto"
        onClick={() => navigate(-1)}
      >
        back
      </button>
      <div className="relative flex flex-col min-h-screen overflow-x-hidden center items-center gap-4">
        <Navbar />

        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <main> {children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
