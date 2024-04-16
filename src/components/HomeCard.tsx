import { useNavigate } from "react-router-dom";
import { IMG_BASE_URL } from "../api/api";
import { HomeCardProps } from "../types/Types";

export const HomeCard = ({ path, name, imagePath }: HomeCardProps) => {
  const imgUrl = `${IMG_BASE_URL}${imagePath}`;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      className="bg-slate-300 rounded-lg cursor-pointer hover:shadow-2xl hover:shadow-violet-200"
    >
      <img src={imgUrl} className="w-80 rounded-t-lg" alt="alt" />
      <div className=" flex items-center justify-center p-3 max-w-96 flex-wrap text-center">
        {name}
      </div>
    </div>
  );
};
